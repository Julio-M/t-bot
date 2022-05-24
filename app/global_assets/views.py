from email import header
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

def get_daily_bars(request,ticker):
  BASE_URL = 'https://paper-api.alpaca.markets'
  api = tradeapi.REST(key_id=config("ALP_AK"), secret_key=config("ALP_AS"),
                    base_url=BASE_URL, api_version='v2')

  # Set a constant for UTC timezone
  UTC = pytz.timezone('UTC')

  # Get the current time, 15minutes, and 1 hour ago
  time_now = dt.datetime.now(tz=UTC)
  time_15_min_ago = time_now - dt.timedelta(minutes=15)
  time_1_hr_ago = time_now - dt.timedelta(hours=24)

  account = api.get_account()
  print(account)

  aapl = api.get_bars(ticker, TimeFrame.Hour,
                      start=time_1_hr_ago.isoformat(),
                      end=time_15_min_ago.isoformat(),
                      adjustment='raw'
                      ).df
  data = aapl.to_json(orient='table')
  x = json.loads(data)
  return JsonResponse(x,safe=False)