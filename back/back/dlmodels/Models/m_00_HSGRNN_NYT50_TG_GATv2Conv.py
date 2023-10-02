import pandas as pd
import argparse
from time import time
import torch
import numpy as np
import random
from sklearn.utils import shuffle
import json
import os
import networkx as nx
from statistics import mean
import matplotlib.pyplot as plt

from tqdm import tqdm

from rouge_score import rouge_scorer

from .utils.create_graph_dataset import create_graph_dataset
from .utils.GloveMgr import GloveMgr
from .utils.DataLoader import DataLoader
from .utils.MultiProcessusDataLoader import MultiProcessusDataLoader
from .utils.accuracy_nb_sent_per_doc import accuracy_nb_sent_per_doc_fn
from .utils.split_all_docs import split_all_docs
from .utils.threshold_probs import threshold_probs_by_nb, threshold_probs_by_prop
from .utils.accuracy_prop_sent_per_doc import accuracy_prop_sent_per_doc_fn
from .utils.preprocess_text import preprocess_text
from .utils.create_graph_dataset import create_graph

import torch.nn as nn
from torch_geometric.nn import GATv2Conv

import os
from django.conf import settings

cuda_num = "0"#None
vocab_size = 50000
word_blacklist_proportion = 0.1

if torch.cuda.is_available() and cuda_num is not None:  
  dev = "cuda:" + str(cuda_num) 
else:  
  dev = "cpu" 

device = torch.device(dev)

glovemgr = GloveMgr(os.path.join(settings.BASE_DIR, "data/glove.6B/glove.6B.300d.txt"), vocab_size=vocab_size)


class SENT_RNN(nn.Module):
  def __init__(self, device, dim_emb=128):
    super(SENT_RNN, self).__init__()
    self.device = device
    self.dim_emb = dim_emb
    self.sent_GRU = nn.GRU(input_size = dim_emb, hidden_size=dim_emb, batch_first = True, bidirectional = True)

    # 10: relative position range size, with segment size = 10
    self.rel_pos_emb = nn.Embedding(11, 100)
    self.abs_pos_emb = nn.Embedding(100, 100)

    self.Wdoc = nn.Linear(2*dim_emb,2*dim_emb,bias=True)

    self.Wcontent = nn.Linear(2*dim_emb,1,bias=False)
    self.Wsalience = nn.Bilinear(2*dim_emb,2*dim_emb,1,bias=False)
    self.Wnovelty = nn.Bilinear(2*dim_emb,2*dim_emb,1,bias=False)
    self.Wabs_pos = nn.Linear(100,1,bias=False)
    self.Wrel_pos = nn.Linear(100,1,bias=False)
    self.bias = nn.Parameter(torch.empty(1).uniform_(-0.1, 0.1))

  def avg_pool1d(self,x,seq_lens):
    out = []
    for index,t in enumerate(x):
      if seq_lens[index] == 0:
        t = t[:1]
      else:
        t = t[:seq_lens[index],:]
      t = torch.t(t).unsqueeze(0)
      out.append(torch.avg_pool1d(t,t.size(2)))

    out = torch.cat(out).squeeze(2)
    return out

  def pad_doc(self, x, doc_lens):
    pad_dim = x.size(1)
    max_doc_len = max(doc_lens)
    result = []
    start = 0
    for doc_len in doc_lens:
      stop = start + doc_len
      doc = x[start:stop]
      start = stop
      if doc_len == max_doc_len:
        result.append(doc.unsqueeze(0))
      else:
        pad = torch.zeros(max_doc_len-doc_len, pad_dim)
        if self.device is not None:
          pad = pad.to(self.device)
        result.append(torch.cat([doc,pad]).unsqueeze(0))
    result = torch.cat(result,dim=0)
    return result

  def forward(self, sents, doc_lens):
    probs = []

    max_doc_lens = max(doc_lens)

    arr_x = self.pad_doc(sents, doc_lens)
    arr_x = self.sent_GRU(arr_x)[0]
    sents_all_docs = arr_x.reshape(len(doc_lens) * max_doc_lens, 2*self.dim_emb) # flat docs

    docs = self.avg_pool1d(arr_x, doc_lens)
    docs = torch.tanh(self.Wdoc(docs))
    docs_for_each_sent = docs.repeat_interleave(max_doc_lens, dim=0) # repeat doc n times
    
    contents = self.Wcontent(sents_all_docs)
    saliences = self.Wsalience(sents_all_docs, docs_for_each_sent)

    # Compute position embedding
    abs_poses = torch.tensor([[position] for position in range(max_doc_lens)], dtype=torch.long)
    abs_poses = abs_poses.to(self.device)
    abs_poses = self.abs_pos_emb(abs_poses).squeeze(1)
    aps = self.Wabs_pos(abs_poses)

    # Compute relative position embedding
    rel_poses = torch.tensor([[int(round(position / 10))] for position in range(max_doc_lens)], dtype=torch.long)
    rel_poses = rel_poses.to(self.device)
    rel_poses = self.rel_pos_emb(rel_poses).squeeze(1)
    rps = self.Wrel_pos(rel_poses)

    # doc_len (number) s
    ses = torch.zeros(len(doc_lens), 2*self.dim_emb)
    ses = ses.to(self.device)

    comps = []

    # for each document, compute probabilities
    for position in range(max_doc_lens):
      contents_for_position = contents[position::max_doc_lens]
      saliences_for_position = saliences[position::max_doc_lens]
      novelties_for_position = -1 * self.Wnovelty(sents_all_docs[position::max_doc_lens], torch.tanh(ses))
      prob = contents_for_position + saliences_for_position + novelties_for_position + aps[position] + rps[position] + self.bias

      prob = torch.sigmoid(prob)
      probs.append(prob)

      comps.append({"content" : contents_for_position[0].item(), "salience" : saliences_for_position[0].item(), "novelty" : novelties_for_position[0].item(), "posAbs" : aps[position][0].item(), "posRel" : rps[position][0].item(), "bias" : self.bias[0].item()})

      ses = ses + torch.mul(sents_all_docs[position::max_doc_lens], prob)
    probs = torch.cat(probs).squeeze()
    if len(probs.shape) == 0:
      probs = probs.unsqueeze(0)
    probs_filtered = []
    for idx, doc_len in enumerate(doc_lens):
      prob = probs[idx::len(doc_lens)]
      prob = prob[:doc_len]
      probs_filtered.append(prob)
    probs_filtered = torch.cat(probs_filtered).squeeze()
    if len(probs_filtered.shape) == 0:
      probs_filtered = probs_filtered.unsqueeze(0)
    #probs = probs.to(self.device)
    return probs_filtered, comps


# Position Feed Forward
class PositionwiseFeedForward(nn.Module):
  def __init__(self, d_in, d_out, d_h, dropout=0.1) -> None:
    super(PositionwiseFeedForward, self).__init__()
    self.fc1 = nn.Linear(in_features=d_in, out_features=d_h)
    self.fc2 = nn.Linear(in_features=d_h, out_features=d_out)
    self.dropout = nn.Dropout(dropout)

  def forward(self, x):
    x = torch.relu(self.fc1(x))
    x = self.dropout(x)
    return self.fc2(x)
  

class HSGRNN(torch.nn.Module):
  def __init__(self, device, vocab_size, word_embed = None, dim_word_embed = 300, num_iter=3):
    super(HSGRNN, self).__init__()
    self.device = device
    self.num_iter = num_iter

    self.word_emb = nn.Embedding(vocab_size+2, dim_word_embed, padding_idx=0)

    # Load word embedding if specified
    if word_embed is not None:
      self.word_embedding = torch.nn.Embedding.from_pretrained(torch.from_numpy(word_embed).float())

    self.word_emb.weight.requires_grad = False

    # edge_attr embed
    self.edge_attr_embed = nn.Embedding(101, 50)

    # sent CNN
    dim_out_cnn = 64
    self.convs = nn.Sequential(
                            nn.Conv1d(in_channels=300,out_channels=100,kernel_size=3,padding='same'),
                            nn.BatchNorm1d(num_features=100),
                            nn.ReLU(inplace=True),
                            nn.Conv1d(in_channels=100,out_channels=100,kernel_size=4,padding='same'),
                            nn.BatchNorm1d(num_features=100),
                            nn.ReLU(inplace=True),
                            nn.Conv1d(in_channels=100,out_channels=dim_out_cnn,kernel_size=5,padding='same'),
                            nn.BatchNorm1d(num_features=dim_out_cnn),
                            nn.ReLU(inplace=True))

    # sent LSTM
    dim_out_lstm = 32
    self.sent_LSTM = nn.LSTM(input_size=300, hidden_size=dim_out_lstm, batch_first=True, bidirectional=True)

    # sent to word GAT
    # TODO out_channels = 64
    self.s2wGAT = GATv2Conv(in_channels=[128, 300], out_channels=300, heads=8, edge_dim=50, fill_value=0, share_weights=False)

    # word to sen GAT
    self.w2sGAT = GATv2Conv(in_channels=[300, 128], out_channels=128, heads=8, edge_dim=50, fill_value=0, share_weights=False)

    # ffn sent to word
    self.ffns2w = PositionwiseFeedForward(d_in=8*300, d_out=300, d_h=512)

    # ffn word to sent
    self.ffnw2s = PositionwiseFeedForward(d_in=8*128, d_out=128, d_h=512)

    #self.wh = nn.Linear(128, 1)
    self.sent_rnn = SENT_RNN(device)

  def max_pool1d(self, x, seq_lens):
    out = []
    for index,t in enumerate(x):
      if seq_lens[index] == 0:
        t = t[:1]
      else:
        t = t[:seq_lens[index],:]
      t = torch.t(t).unsqueeze(0)
      out.append(torch.avg_pool1d(t, t.size(2)))

    out = torch.cat(out).squeeze(2)
    return out

  def forward(self, data, doc_lens):# In the real implémentation remove nb_sent
    # edge attr embeddings
    edge_attr = torch.floor(data.edge_attr * 100).int()
    edge_attr = self.edge_attr_embed(edge_attr)

    # features
    Xw = data.x[0]
    Xs = data.x[1]
    sent_lens = torch.sum(torch.sign(Xs),dim=1).data
    
    # embeddings
    Xw = self.word_emb(Xw)
    Xs = self.word_emb(Xs)

    # CNN
    XsCNN = self.convs(Xs.permute(0,2,1))
    XsCNN = torch.max_pool1d(XsCNN, XsCNN.size(2)).squeeze(2)

    # LSTM
    # TO DO: ask 
    XsLSTM, _ = self.sent_LSTM(Xs)
    XsLSTM = self.max_pool1d(XsLSTM, sent_lens)
    Xs = torch.cat((XsCNN, XsLSTM), dim=1)

    Hw = Xw
    Hs = Xs

    edge_index_w_i = data.edge_index[1][data.edge_index[1] < len(data.x[0])]
    edge_index_s_j = data.edge_index[0][data.edge_index[1] < len(data.x[0])] - Hw.shape[0]
    edge_attr_w = edge_attr[data.edge_index[1] < len(data.x[0])]
    edge_index_w = torch.stack([edge_index_s_j, edge_index_w_i])

    edge_index_s_i = data.edge_index[1][data.edge_index[1] >= len(data.x[0])] - Hw.shape[0]
    edge_index_w_j = data.edge_index[0][data.edge_index[1] >= len(data.x[0])]
    edge_attr_s = edge_attr[data.edge_index[1] >= len(data.x[0])]
    edge_index_s = torch.stack([edge_index_w_j, edge_index_s_i])

    Hw = torch.layer_norm(Hw, Hw.size()[1:])
    Hs = torch.layer_norm(Hs, Hs.size()[1:])

    for i in range(self.num_iter):
      if i != 0: # H^1w = H^0w = Xw
        Hw = self.s2wGAT(x=[Hs, Hw], edge_index=edge_index_w, edge_attr=edge_attr_w) + torch.cat([Hw] * 8, dim=1)
        Hw = self.ffns2w(Hw)
        Hw = torch.layer_norm(Hw, Hw.size()[1:])

      Hs = self.w2sGAT(x=[Hw, Hs], edge_index=edge_index_s, edge_attr=edge_attr_s) + torch.cat([Hs] * 8, dim=1)
      Hs = self.ffnw2s(Hs)
      Hs = torch.layer_norm(Hs, Hs.size()[1:])

    res = self.sent_rnn(Hs, doc_lens)

    return res

  def save(self, fname):
    torch.save(self.state_dict(), fname)

  def load(self, fname):
    self.load_state_dict(torch.load(fname, map_location=torch.device('cpu')))


model = HSGRNN(device=device, vocab_size=vocab_size, word_embed=glovemgr.getEmbeddings(), dim_word_embed=300)
model.load(os.path.join(settings.BASE_DIR, "data/weights/00-HSGRNN_NYT50.pt"))

model = model.to(device=device)
model.eval()


from sklearn.feature_extraction.text import TfidfVectorizer
import pandas as pd
import argparse
import re
from nltk.tokenize import LineTokenizer, sent_tokenize


def compute_tfidf_ws(s, vectorizer = TfidfVectorizer()):
  tfidf_values = vectorizer.fit_transform([s]).toarray()[0]
  words = vectorizer.get_feature_names_out()
  tfidf_dict = {word: tfidf_values[i] for i, word in enumerate(words)}
  return tfidf_dict


def summary_model_text_delimiter(model, text, is_sep_n, trunc_doc=50):
    # tfidfs
  if is_sep_n:
    nltk_line_tokenizer = LineTokenizer()
    doc = nltk_line_tokenizer.tokenize(text)
  else:
    doc = sent_tokenize(text)

  tfidf_doc = []
  for s in doc:
    try:
      tfidf_doc.append(compute_tfidf_ws(s=s))
    except:
      tfidf_doc.append(0)

  text_splitted = doc

  # preprocess and trunc
  doc = preprocess_text(text, glovemgr, is_sep_n, remove_stop_word=True, stemming=True, trunc_sent=-1, padding_sent=-1)

  if trunc_doc != -1:
    truncated_doc = doc[:trunc_doc]

  # create graph
  pad_sent=max([len(s) for s in doc])
  graph = create_graph(truncated_doc, tfidf_doc, glovemgr, pad_sent=pad_sent, word_blacklist=[], remove_unkn_words=False, self_loop=False)

  graph = graph.to(device)

  y_pred, comps = model(graph, [len(truncated_doc)])

  res = comps

  for i in range(len(comps)):
    res[i]["sentence"] = text_splitted[i]

  ignored_sents = text_splitted[len(res):]

  return res, ignored_sents


def summary_with_HSGRNN_NYT(text, is_sep_n):
  return summary_model_text_delimiter(model, text, is_sep_n)

