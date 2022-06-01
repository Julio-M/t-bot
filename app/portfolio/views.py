from django.shortcuts import render
from rest_framework.decorators import api_view
from decouple import config
import requests
from django.http import JsonResponse
import pandas as pd
from collections import defaultdict
import json
import alpaca_trade_api as tradeapi

headers = {
      "APCA-API-KEY-ID": config("ALP_AK"),
      "APCA-API-SECRET-KEY": config("ALP_AS"),
    }


# Create your views here.
@api_view(['GET'])
def get_portfolio(request,period):
  url = f'https://paper-api.alpaca.markets/v2/account/portfolio/history?period={period}'

  r = requests.get(url,headers=headers)
  l1 = []
  l2=[]
  i=0
  p=0
  for x in r.json()['timestamp']:
      l1 .append({'id':i,'timestamp':x})
      i+=1
  for y in r.json()['equity']:
      l2.append({'id':p,'equity':y})
      p+=1


  
  df1 = pd.DataFrame(l1).set_index('id')
  df2 = pd.DataFrame(l2).set_index('id')
  df = df1.merge(df2, left_index=True, right_index=True)
  df.T.to_dict()
  data = df.to_json(orient='table')
  x = json.loads(data)
  
  return JsonResponse(x, safe=False)

@api_view(['GET'])
def get_account(request):
  url = f'https://paper-api.alpaca.markets/v2/account'
  r = requests.get(url,headers=headers)

  return JsonResponse(r.json(), safe=False)


@api_view(['POST'])
def buy_sell_order(request):
    data=request.data
    symbol=data['symbol']
    side=data['order_type']
    quantity = data['quantity']
    order_type=data['order_type']
    key_id = config("ALP_AK")
    secret_key = config("ALP_AS")
    base_url = 'https://paper-api.alpaca.markets'
    api = tradeapi.REST(
                key_id,
                secret_key,
                base_url
            )
    api.submit_order(
    symbol=symbol,
    qty=quantity,  # fractional shares
    side=side,
    type='market',
    time_in_force='day',
    )
    order_url ='https://paper-api.alpaca.markets/v2/orders'
    r = requests.get(order_url,headers=headers)
    return JsonResponse(r.json(),safe=False)
