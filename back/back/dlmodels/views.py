from rest_framework.decorators import api_view
from rest_framework import status
from rest_framework.response import Response

from .Models.m_00_HSGRNN_NYT50_TG_GATv2Conv import summary_with_HSGRNN_NYT


@api_view(['POST'])
def sum_api_view(request):
    model = request.data.get('model')
    text = request.data.get('text')
    delimiter = request.data.get('delimiter') != "default"

    res, ign = summary_with_HSGRNN_NYT(text, delimiter)

    return Response({"result" : res, "ignored" : ign}, status=status.HTTP_200_OK)