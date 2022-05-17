from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.contrib.auth.models import User
from .serializers import UserSerializer
from rest_framework import serializers
from rest_framework import status
from django.http import JsonResponse

# Create your views here.
@api_view(['GET'])
def ApiOverview(request):
    api_urls = {
        'all_users': '/',
        'Add': '/create',
        'Update': '/update/pk',
        'Delete': '/user/pk/delete'
    }
  
    return Response(api_urls)

@api_view(['POST'])
def add_users(request):
    user = UserSerializer(data=request.data)
  
    # validating for already existing data
    if User.objects.filter(**request.data).exists():
        raise serializers.ValidationError('This data already exists')
  
    if user.is_valid():
        user.save()
        return Response(user.data)
    else:
        status_code = 400
        message = "The request is not valid."
        # You should log this error because this usually means your front end has a bug.
        # do you whant to explain anything?
        explanation = "The server could not accept your request because it was not valid. Please try again and if the error keeps happening get in contact with us."

        return JsonResponse({'message':message,'explanation':explanation}, status=status_code)

@api_view(['GET'])
def get_users(request):
    if request.method == 'GET':
        user = User.objects.all()
        serializer = UserSerializer(user, many=True)
        return JsonResponse(serializer.data, safe=False)
    