from django.urls import path
from . import views
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from .views import MyTokenObtainPairView
  
urlpatterns = [
    path('', views.ApiOverview, name='users'),
    path('create/users/', views.add_users, name='add-users'),
    path('users',views.get_users, name='get-users'),
    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh')
]