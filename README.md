# extrasum
A web application for extractive summarization based on SummaRuNNer.

## Run on local
### Clone project
```bash
git clone https://github.com/Baragouine/extrasum.git
```

### Create env (conda)
```bash
conda create --name EXTRASUM python=3.9
```

### Activate env
```bash
conda activate EXTRASUM
```

### Enter into back-end directory
```bash
cd extrasum/extrasum/back/
```

### Install dependencies
```bash
pip install -r requirements.txt
conda install pytorch-geometric -c rusty1s -c conda-forge
```

### Install Django REST framework
```bash
cd extrasum_back/ # location: extrasum/extrasum/back/extrasum_back
pip install django
pip install djangorestframework
```

