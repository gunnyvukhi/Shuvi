from django.urls import (
    include,
    path,
)
from django.contrib import admin
urlpatterns = [
    path("gym/", include("apps.gym.urls")),
    path("store/", include("apps.store.urls")),
    path("admin/", admin.site.urls),
    path('silk/', include('silk.urls', namespace='silk')),
    path("users/", include("apps.users.urls")),
]
