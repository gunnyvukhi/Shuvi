from rest_framework import serializers
from .models import Country, City, Address, UserInfo


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


class UserInfoSerializer(serializers.ModelSerializer):
    age = serializers.ReadOnlyField()

    class Meta:
        model = UserInfo
        fields = [
            'id',
            'uuid',
            'user',
            'address',
            'phone_number',
            'date_of_birth',
            'profile_picture',
            'age',
            'created_at',
            'updated_at',
        ]