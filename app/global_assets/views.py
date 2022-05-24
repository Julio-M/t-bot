from email import header
from time import time
from django.shortcuts import render
import requests
from decouple import config
from rest_framework.decorators import api_view
from django.http import JsonResponse
import datetime as dt
import pytz
import alpaca_trade_api as tradeapi
from alpaca_trade_api.rest import TimeFrame
import json
from .serializers import AssetSerializer
from rest_framework import serializers
from .models import Asset


@api_view(['GET'])
def get_positions(request):
  url = 'https://paper-api.alpaca.markets/v2/positions'
  headers = {
    "APCA-API-KEY-ID": config("ALP_AK"),
    "APCA-API-SECRET-KEY": config("ALP_AS"),
  }

  # Create your views here.
  r = requests.get(url,headers=headers)

  return JsonResponse(r.json(), safe=False)

@api_view(['GET'])
def get_daily_bars(request,ticker,time_before,time_after):
  print(time_before)
  print(time_after)
  BASE_URL = 'https://paper-api.alpaca.markets'
  api = tradeapi.REST(key_id=config("ALP_AK"), secret_key=config("ALP_AS"),
                    base_url=BASE_URL, api_version='v2')

  # Set a constant for UTC timezone
  UTC = pytz.timezone('UTC')

  # Get the current time, 15minutes, and 1 hour ago
  time_now = dt.datetime.now(tz=UTC)
  time_15_min_ago = time_now - dt.timedelta(minutes=time_before)
  time_1_hr_ago = time_now - dt.timedelta(minutes=time_after)

  account = api.get_account()
  print(account)
  

  if time_after<=75:
    data_points= TimeFrame.Minute
  elif time_after>75 and time_after<=1455:
    data_points = TimeFrame.Hour
  elif time_after>1455 and time_after<=10095:
    data_points = TimeFrame.Day
  elif time_after>10095 and time_after<=43815:
    data_points = TimeFrame.Week
  else:
    data_points = TimeFrame.Month
  
  print('time after',data_points)
  aapl = api.get_bars(ticker, data_points,
                      start=time_1_hr_ago.isoformat(),
                      end=time_15_min_ago.isoformat(),
                      adjustment='raw'
                      ).df
  data = aapl.to_json(orient='table')
  x = json.loads(data)
  return JsonResponse(x,safe=False)


@api_view(['GET'])
def get_assets(request):
  if request.method == 'GET':
        asset = Asset.objects.all()
        serializer = AssetSerializer(asset, many=True)
        return JsonResponse(serializer.data, safe=False)
  