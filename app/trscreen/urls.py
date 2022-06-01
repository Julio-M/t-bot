from django.urls import path
from . import views
from .views import initiate_sentiment_analysis

urlpatterns = [
    path('initiate-sentiment',initiate_sentiment_analysis, name='intiate-s-a'),
]