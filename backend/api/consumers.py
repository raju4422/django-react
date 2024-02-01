import json
from asgiref.sync import async_to_sync
from channels.generic.websocket import WebsocketConsumer

from api.models import BlogChat


class TextRoomConsumer(WebsocketConsumer):
    def __init__(self, *args, **kwargs):
        super().__init__(args, kwargs)
        self.room_name = None
        self.room_group_name = None

    def connect(self):
        self.room_name = self.scope['url_route']['kwargs']['room_name']
        self.room_group_name = f'chat_{self.room_name}'
        print('connected by raju')
        # Join room group
        async_to_sync(self.channel_layer.group_add)(
            self.room_group_name,
            self.channel_name
        )
        self.accept()

    def disconnect(self, close_code):
        # Leave room group
        async_to_sync(self.channel_layer.group_discard)(
            self.room_group_name,
            self.channel_name
        )

    def receive(self, text_data):
        # Receive message from WebSocket
        text_data_json = json.loads(text_data)
        text = text_data_json['text']
        blog_id = text_data_json['blog_id']
        sender = text_data_json['sender']
        blog_id = blog_id
        message = text
        user_id = sender
        record = BlogChat.objects.create(blog_id=blog_id, message=message, user_id=user_id)
        if record is not None:
            # Send message to room group
            async_to_sync(self.channel_layer.group_send)(
                self.room_group_name,
                {
                    'type': 'chat_message',
                    'message': text,
                    'sender': sender,
                    'blog_id': blog_id,
                    'message_id': record.id
                }
            )

    def chat_message(self, event):
        # Receive message from room group
        text = event['message']
        sender = event['sender']
        blog_id = event['blog_id']
        message_id = event['message_id']
        # Send message to WebSocket
        self.send(text_data=json.dumps({
            'message': text,
            'user': sender,
            'blog': blog_id,
            'id': message_id
        }))
