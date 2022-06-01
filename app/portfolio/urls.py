from django.urls import path
from . import views
from .views import get_portfolio,get_account, buy_sell_order,get_all_orders


urlpatterns = [
    path('get-portfolio/<str:period>',get_portfolio, name='get-portfolio'),
    path('get-account',get_account, name='get-account'),
    path('place-order',buy_sell_order,name='buy-sell'),
    path('get-orders',get_all_orders,name='get-orders')
]