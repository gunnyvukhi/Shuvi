
from django.shortcuts import get_object_or_404
from .serializers import ProductSerializer, OrderSerializer
from .models import Product, Order, OrderItem
from rest_framework.response import Response
from rest_framework.decorators import api_view
from apps.core.serializers import create_validated_instance
from apps.core.serializers import get_validated_data

@api_view(['GET'])
def product_list(request):
    products = Product.objects.all()
    serializer = ProductSerializer(products, many=True, fields=('id', 'name', 'price'))
    return Response(serializer.data)

@api_view(['GET'])
def product_detail(request, pk):
    product = get_object_or_404(Product, pk=pk)
    serializer = ProductSerializer(product)
    return Response(serializer.data)

@api_view(['GET'])
def order_list(request):
    orders = Order.objects.prefetch_related('items__product').all()
    serializer = OrderSerializer(orders, many=True)
    return Response(serializer.data)

#When you need to validate request data, save it, and return the created instance and validated data.
@api_view(['POST'])
def create_product(request):
    product, validated_data = create_validated_instance(ProductSerializer, request)
    return Response({"product": ProductSerializer(product).data})

#When you need to validate request data and return the validated data without saving it.
@api_view(['POST'])
def validate_product_data(request):
    validated_data = get_validated_data(ProductSerializer, request, fields=['name', 'price'])
    return Response(validated_data)

# # Create a product
# product = Product.objects.create(name="Laptop", price=1000.00, created_by=user)

# # Soft delete the product
# product.is_deleted = True
# product.deleted_by = user
# product.deleted_at = timezone.now()
# product.save()

# # Query products
# Product.objects.all()  # Excludes the soft-deleted product
# Product.objects_all.all()  # Includes the soft-deleted product