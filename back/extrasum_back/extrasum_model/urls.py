from django.urls import path, include
from .views import sum_api_view

urlpatterns = [
    path('models/', sum_api_view, name='summodels')
]
