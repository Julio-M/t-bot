from django.urls import path
from . import views
from .views import get_portfolio

urlpatterns = [
    path('get-portfolio/<str:period>',get_portfolio, name='get-portfolio')
]