from rest_framework import serializers
from .models import Country, City, Address, UserInfo
from rest_framework.validators import UniqueValidator
from django.contrib.auth.password_validation import validate_password
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.contrib.auth.models import User


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

    class Meta:
        model = User
        fields = '__all__'

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

