from django.urls import path
from . import views
app_name = 'store'
urlpatterns = [
    path('products/', views.product_list),
    path('products/<int:pk>/', views.product_detail),
    path('orders/', views.order_list),
    path('carts/', views.order_list),
]