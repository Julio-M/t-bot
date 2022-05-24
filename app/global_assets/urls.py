from django.urls import path
from . import views
from .views import get_positions,get_daily_bars
  
urlpatterns = [
    path('positions/', get_positions, name='get_positions'),
    path('bars/<str:ticker>', get_daily_bars, name='get_bars')
]