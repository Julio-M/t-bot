# chat/consumers.py
import json
from channels.generic.websocket import JsonWebsocketConsumer
from asgiref.sync import async_to_sync

class ChatConsumer(JsonWebsocketConsumer):
  def connect(self):
    print('inside EventConsumer connect()')
    async_to_sync(self.channel_layer.group_add)(
        'events',
        self.channel_name
    )
    self.accept()

  def disconnect(self, close_code):
    print('inside EventConsumer disconnect()')
    print("Closed websocket with code: ", close_code)
    async_to_sync(self.channel_layer.group_discard)(
        'events',
        self.channel_name
    )
    self.close()

  def receive_json(self, content, **kwargs):
    print('inside EventConsumer receive_json()')
    print("Received event: {}".format(content))
    self.send_json(content)

  def events_alarm(self, event):
    print('inside EventConsumer events_alarm()')
    self.send_json(
        {
            'type': 'events.alarm',
            'content': event['content']
        }
    )

  def tweets(self, event):
    print('inside EventConsumer events_alarm()')
    self.send_json(
        {
            'type': 'tweets',
            'content': event['content']
        }
    )