from asyncore import read
from django.db.models import fields
from rest_framework import serializers
from .models import Tbot, Bot_Data

class BotDataSerializer(serializers.ModelSerializer):
    class Meta:
      model = Bot_Data
      fields = ('bot','t_bot_message', 'created')

class TbotSerializer(serializers.ModelSerializer):
  bot= BotDataSerializer(many=True)
  class Meta:
      model = Tbot
      fields = ('user','initial_buing_bower', 'created','bot')

    # def create(self,validated_data):
    #     user = User.objects.create_user(**validated_data)
    #     Token.objects.create(user=user)
    #     return user