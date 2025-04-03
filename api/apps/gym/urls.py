from django.urls import path 
from . import views
app_name = 'gym'
urlpatterns = [
    path('', views.measurement_list, name='measurement_list'),
    path('<int:pk>/', views.measurement_detail),
    path('create/', views.measurement_create),
]