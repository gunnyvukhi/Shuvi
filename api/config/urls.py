from django.urls import (
    include,
    path,
)
from django.contrib import admin

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
urlpatterns = [
    path("gym/", include("apps.gym.urls")),
    path("store/", include("apps.store.urls")),
    path("admin/", admin.site.urls),
    path('silk/', include('silk.urls', namespace='silk')),

    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
