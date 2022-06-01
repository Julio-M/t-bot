from django.urls import path
from . import views
from .views import get_portfolio,get_account

urlpatterns = [
    path('get-portfolio/<str:period>',get_portfolio, name='get-portfolio'),
    path('get-account',get_account, name='get-account')
]