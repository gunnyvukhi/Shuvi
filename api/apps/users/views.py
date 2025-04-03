from rest_framework.viewsets import ModelViewSet
from .models import Country, City, Address, UserInfo
from .serializers import CountrySerializer, CitySerializer, AddressSerializer, UserInfoSerializer


class CountryViewSet(ModelViewSet):
    """
    ViewSet for managing Country objects.
    """
    queryset = Country.objects.all()
    serializer_class = CountrySerializer


class CityViewSet(ModelViewSet):
    """
    ViewSet for managing City objects.
    """
    queryset = City.objects.all()
    serializer_class = CitySerializer


class AddressViewSet(ModelViewSet):
    """
    ViewSet for managing Address objects.
    """
    queryset = Address.objects.all()
    serializer_class = AddressSerializer


class UserInfoViewSet(ModelViewSet):
    """
    ViewSet for managing UserInfo objects.
    """
    queryset = UserInfo.objects.all()
    serializer_class = UserInfoSerializer