from apps.core.serializers import DynamicFieldsModelSerializer
from rest_framework import serializers
from .models import Product, Order, OrderItem, Cart


class ProductSerializer(DynamicFieldsModelSerializer):
    class Meta:
        model = Product
        fields = (
            'id',
            'name',
            'price',
            'stock',
        )

    def validate_price(self, value):
        if value <= 0:
            raise serializers.ValidationError(
                "Price must be greater than 0."
            )
        return value
    

class OrderItemSerializer(DynamicFieldsModelSerializer):
    product_name = serializers.CharField(source='product.name')
    product_price = serializers.DecimalField(
        max_digits=10,
        decimal_places=2,
        source='product.price')

    class Meta:
        model = OrderItem
        fields = (
            'product_name',
            'product_price',
            'quantity',
            'item_subtotal'
        )


class OrderSerializer(DynamicFieldsModelSerializer):
    items = OrderItemSerializer(many=True, read_only=True)
    total_price = serializers.SerializerMethodField(method_name='total')

    def total(self, obj):
        order_items = obj.items.all()
        return sum(order_item.item_subtotal for order_item in order_items)

    class Meta:
        model = Order
        fields = (
            'order_id',
            'created_at',
            'user',
            'status',
            'items',
            'total_price',
        )

class CartSerializer(DynamicFieldsModelSerializer):
    products = ProductSerializer(many=True, read_only=True)
    total_price = serializers.SerializerMethodField(method_name='total')

    def total(self, obj):
        cart_items = obj.cart_items.all()
        return sum(cart_item.item_subtotal for cart_item in cart_items)

    class Meta:
        model = Cart
        fields = (
            'user',
            'products',
            'total_price',
        )

class ProductInfoSerializer(serializers.Serializer):
    products = ProductSerializer(many=True)
    count = serializers.IntegerField()
    max_price = serializers.FloatField()