from django.urls import path
from . import views
from .views import initiate_bot,get_bot_data,get_bot_messages

urlpatterns = [
    path('initiate-bot',initiate_bot, name='intiate-bot'),
    path('get-bot-data/<int:user_id>',get_bot_data, name='get-bot-data'),
    path('get-bot-messages',get_bot_messages, name='get-bot-data'),
]