from django.db.models import fields
from rest_framework import serializers
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
from t_bot.serializers import TbotSerializer

class UserSerializer(serializers.ModelSerializer):
    tbot = TbotSerializer(many=True)

    class Meta:
        model = User
        fields = ('id','username', 'password','email','tbot')
        extra_kwargs = {'password':{'write_only':True, 'required':True}}

    def create(self,validated_data):
        user = User.objects.create_user(**validated_data)
        Token.objects.create(user=user)
        return user