from rest_framework.decorators import api_view
from rest_framework import status
from rest_framework.response import Response
from rest_framework import serializers

from .Models.m_00_HSGRNN_NYT50_TG_GATv2 import summary_with_HSGRNN_NYT
from .Models.m_01_HSGRNN_CNN_DailyMail_TG_GATv2 import summary_with_HSGRNN_CNN_DailyMail
from .Models.m_02_HSGRNN_WikiGeo_TG_GATv2 import summary_with_HSGRNN_WikiGeo

@api_view(['POST'])
def sum_api_view(request):
    model = request.data.get('model')
    text = request.data.get('text')
    delimiter = request.data.get('delimiter') != "default"

    res, ign = (None, None)

    if model == "en/nyt":
        res, ign = summary_with_HSGRNN_NYT(text, delimiter)
    elif model == "en/cnn-dailymail":
        res, ign = summary_with_HSGRNN_CNN_DailyMail(text, delimiter)
    elif model == "fr/wiki-geography":
        res, ign = summary_with_HSGRNN_WikiGeo(text, delimiter)
    else:
        raise serializers.ValidationError("Unknown selected model.")


    return Response({"result" : res, "ignored" : ign}, status=status.HTTP_200_OK)
