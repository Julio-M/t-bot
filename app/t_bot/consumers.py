import json
from channels.generic.websocket import WebsocketConsumer
from matplotlib.pyplot import connect
from regex import P



class ChatConsumer(WebsocketConsumer):
  def connect(self):
    self.accept()

    self.send(text_data=json.dumps({
      'type':'connection_established',
      'message':'hello'
    }))

  def receive(self,text_data):
    text_data_json = json.loads(text_data)
    message = text_data_json['message']
    print(message)