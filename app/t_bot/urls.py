from django.urls import path
from . import views
from .views import initiate_bot

urlpatterns = [
    path('initiate-bot',initiate_bot, name='intiate-bot'),
]