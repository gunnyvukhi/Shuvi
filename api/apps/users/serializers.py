from rest_framework import serializers
from .models import Country, City, Address, UserInfo, Otp
from rest_framework.validators import UniqueValidator
from django.contrib.auth.password_validation import validate_password
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.contrib.auth.models import User
from apps.core.serializers import DynamicFieldsModelSerializer
import random
from django.utils import timezone


class RegisterSerializer(serializers.ModelSerializer):

    username = serializers.EmailField(
        required=True,
        validators=[UniqueValidator(queryset=User.objects.all())]
    )
    password = serializers.CharField(
        write_only=True, required=True, validators=[validate_password])

    class Meta:
        model = User
        fields = ('username', 'password', 'first_name', 'last_name')

    def create(self, validated_data):
        user = User.objects.create(
            username=validated_data['username'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name'],
        )

        user.set_password(validated_data['password'])
        user.save()

        return user

class ProfileSerializer(serializers.ModelSerializer):
    user_info = serializers.SerializerMethodField()
    addresses = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ['username', 'first_name', 'last_name', 'user_info', 'addresses']

    def get_user_info(self, obj):
        try:
            user_info = UserInfo.objects.get(user=obj)
            return {
                'phone': user_info.phone_number,
                'date_of_birth': user_info.date_of_birth,
                'gender': user_info.gender,
                'profile_picture': user_info.profile_picture.url if user_info.profile_picture else None,
            }
        except UserInfo.DoesNotExist:
            return None

    def get_addresses(self, obj):
        addresses = Address.objects.filter(user=obj)
        return [
            {
                'street': address.street,
                'city': address.city.name,
                'country': address.city.country.name,
                'is_primary': address.is_primary,
            }
            for address in addresses
        ]

class CountrySerializer(serializers.ModelSerializer):
    class Meta:
        model = Country
        fields = [
            'id',
            'uuid',
            'name',
            'code',
            'continent',
            'population',
            'area',
            'capital',
            'currency',
            'language',
            'created_at',
            'updated_at',
        ]


class CitySerializer(serializers.ModelSerializer):
    country_name = serializers.CharField(source='country.name', read_only=True)

    class Meta:
        model = City
        fields = [
            'id',
            'uuid',
            'name',
            'country',
            'country_name',
            'population',
            'area',
            'timezone',
            'latitude',
            'longitude',
            'postal_code',
            'created_at',
            'updated_at',
        ]


class AddressSerializer(serializers.ModelSerializer):
    city_name = serializers.CharField(source='city.name', read_only=True)
    country_name = serializers.CharField(source='city.country.name', read_only=True)

    class Meta:
        model = Address
        fields = [
            'id',
            'uuid',
            'user',
            'street',
            'city',
            'city_name',
            'country_name',
            'is_primary',
            'created_at',
            'updated_at',
        ]

class OtpSerializer(DynamicFieldsModelSerializer):
    otp_code = serializers.CharField(max_length=6, required=False)
    email = serializers.EmailField(required=True)
    class Meta:
        model = Otp
        fields = ['email', 'otp_code', 'created_at', 'expires_at']

    def create(self, validated_data):
        # Check if there is any OTP with the same email and delete it
        existing_otp = self.Meta.model.objects.filter(email=validated_data['email'])
        if existing_otp.exists():
            existing_otp.delete()
        return super().create(validated_data)