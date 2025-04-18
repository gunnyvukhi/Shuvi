from rest_framework.routers import DefaultRouter
from django.urls import path
from .views import RegisterView, getProfile, updateProfile
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
app_name = 'users'

# Use the router's URLs as the urlpatterns
urlpatterns = [
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
path('register/', RegisterView.as_view(), name='auth_register'),

#Profile
path('profile/', getProfile, name='profile'),
path('profile/update/', updateProfile, name='update-profile'),]