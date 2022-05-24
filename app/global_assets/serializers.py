from django.db.models import fields
from rest_framework import serializers
from .models import Asset

class AssetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Asset
        fields = ('id','name', 'ticker')

    # def create(self,validated_data):
    #     user = User.objects.create_user(**validated_data)
    #     Token.objects.create(user=user)
    #     return user