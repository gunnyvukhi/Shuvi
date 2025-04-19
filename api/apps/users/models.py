from django.db import models
from django.db.models.deletion import CASCADE
from django.contrib.auth.models import User
from apps.core.models import BaseModel
class UserInfo(BaseModel):
    user = models.OneToOneField(User, on_delete=CASCADE, related_name='user_info')
    address = models.CharField(max_length=255, blank=True, null=True)
    phone_number = models.CharField(max_length=15, blank=True, null=True)
    date_of_birth = models.DateField(blank=True, null=True)
    profile_picture = models.ImageField(upload_to='profile_pics/', blank=True, null=True)
    rank = models.CharField(max_length=50, blank=True, null=True)
    is_verified = models.BooleanField(default=False)
    

class Country(BaseModel):
    name = models.CharField(max_length=100)
    code = models.CharField(max_length=3, unique=True)
    continent = models.CharField(max_length=50, blank=True, null=True)
    population = models.PositiveIntegerField(blank=True, null=True)
    area = models.FloatField(blank=True, null=True)  # in square kilometers
    capital = models.CharField(max_length=100, blank=True, null=True)
    currency = models.CharField(max_length=50, blank=True, null=True)
    language = models.CharField(max_length=50, blank=True, null=True)
    
class City(BaseModel):
    name = models.CharField(max_length=100)
    country = models.ForeignKey(Country, on_delete=CASCADE, related_name='cities')
    population = models.PositiveIntegerField(blank=True, null=True)
    area = models.FloatField(blank=True, null=True)  # in square kilometers
    timezone = models.CharField(max_length=50, blank=True, null=True)
    latitude = models.FloatField(blank=True, null=True)
    longitude = models.FloatField(blank=True, null=True)
    postal_code = models.CharField(max_length=20, blank=True, null=True)

class Address(BaseModel):
    user = models.ForeignKey(User, on_delete=CASCADE, related_name='addresses')
    street = models.CharField(max_length=255)
    city = models.ForeignKey(City, on_delete=CASCADE, related_name='addresses')
    is_primary = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
