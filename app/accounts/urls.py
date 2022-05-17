from django.urls import path
from . import views
  
urlpatterns = [
    path('', views.ApiOverview, name='users'),
    path('create/users/', views.add_users, name='add-users'),
    path('users',views.get_users, name='get-users')
]