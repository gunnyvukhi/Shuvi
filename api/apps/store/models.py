import uuid
from django.db import models
from django.db.models.deletion import CASCADE
from django.contrib.auth.models import User
from apps.core.models import BaseModel

class Category(BaseModel):
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True, null=True, default='')
    def __str__(self):
        return self.name

class Product(BaseModel):
    name = models.CharField(max_length=200)
    category = models.ForeignKey(Category, on_delete=CASCADE, related_name='products')
    description = models.TextField()
    image = models.ImageField(upload_to='products/', blank=True, null=True)

    @property
    def in_stock(self):
        return any(size.in_stock for size in self.sizes.all())
    
    @property
    def price(self):
        return self.sizes.first().price if self.sizes.exists() else 0.00
    
    @property
    def stock(self):
        return sum(size.stock for size in self.sizes.all())
    
    @property
    def available_sizes(self):
        return [size.size for size in self.sizes.all() if size.in_stock]
    
    def __str__(self):
        return self.name
    
class ProductSize(BaseModel):
    product = models.ForeignKey(Product, on_delete=CASCADE, related_name='sizes')
    size = models.CharField(max_length=50)
    stock = models.PositiveIntegerField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    @property
    def in_stock(self):
        return self.stock > 0

class Order(BaseModel):
    class StatusChoices(models.TextChoices):
        PENDING = 'Pending'
        CONFIRMED = 'Confirmed'
        CANCELLED = 'Cancelled'

    order_id = models.UUIDField(primary_key=True, default=uuid.uuid4, unique=True, editable=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    status = models.CharField(
        max_length=10,
        choices=StatusChoices.choices,
        default=StatusChoices.PENDING
    )

    products = models.ManyToManyField(Product, through="OrderItem", related_name='orders')

    def __str__(self):
        return f"Order {self.order_id } by {self.user.username}"


class OrderItem(BaseModel):
    order = models.ForeignKey(
        Order,
        on_delete=models.CASCADE,
        related_name='items'
    )
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField()

    @property
    def item_subtotal(self):
        return self.product.price * self.quantity
    
    def __str__(self):
        return f"{self.quantity} x {self.product.name} in Order {self.order.order_id}"
    
class CartItem(BaseModel):
    cart = models.ForeignKey(
        'Cart',
        on_delete=models.CASCADE,
        related_name='cart_items'
    )
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField()

    @property
    def item_subtotal(self):
        return self.product.price * self.quantity

    def __str__(self):
        return f"{self.quantity} x {self.product.name} in Cart {self.cart.id}"


class Cart(BaseModel):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='cart')
    products = models.ManyToManyField(Product, through="CartItem", related_name='carts')

    @property
    def total_price(self):
        return sum(item.item_subtotal for item in self.cart_items.all())