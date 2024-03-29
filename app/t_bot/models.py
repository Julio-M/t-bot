from django.db import models
from django.contrib.auth.models import User 

# Create your models here.
class Tbot(models.Model):
    user = models.ForeignKey(User,related_name="tbot",on_delete=models.CASCADE)  # new
    initial_buing_bower = models.CharField(max_length=100)
    created = models.DateTimeField(auto_now_add=True)

class Bot_Data(models.Model):
  bot =  models.ForeignKey(Tbot, related_name="bot",on_delete=models.CASCADE)
  t_bot_message = models.CharField(max_length=200)
  created = models.DateTimeField(auto_now_add=True)