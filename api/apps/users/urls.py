from rest_framework.routers import DefaultRouter
from .views import CountryViewSet, CityViewSet, AddressViewSet, UserInfoViewSet

app_name = 'user'

# Create a router and register the viewsets
router = DefaultRouter()
router.register(r'countries', CountryViewSet, basename='country')
router.register(r'cities', CityViewSet, basename='city')
router.register(r'addresses', AddressViewSet, basename='address')
router.register(r'user-info', UserInfoViewSet, basename='user-info')

# Use the router's URLs as the urlpatterns
urlpatterns = router.urls