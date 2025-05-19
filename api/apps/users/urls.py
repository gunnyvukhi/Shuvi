from rest_framework.routers import DefaultRouter
from django.urls import path
from .views import RegisterView, getProfile, updateProfile, CreateOtpView, CheckOtpView, change_password
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
    path('reset-password/', change_password, name='reset_password'),

    path('otp/', CreateOtpView.as_view(), name='otp'),
    path('otp/check/', CheckOtpView.as_view(), name='check-otp'),

    path('profile/', getProfile, name='profile'),
    path('profile/update/', updateProfile, name='update-profile'),]