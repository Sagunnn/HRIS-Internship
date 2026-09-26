from django.conf import settings
from django.contrib import admin
from django.urls import include, path, re_path
from django.views.static import serve
from rest_framework_simplejwt.views import TokenRefreshView

from api.views import CustomTokenObtainPairView

urlpatterns = [
    path('django-admin/', admin.site.urls),
    path('api/v1/token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/v1/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/v1/', include('api.urls')),
]

# In development Django serves uploads itself; in Docker, nginx serves them from the shared media volume.
if settings.DEBUG:
    urlpatterns += [
        re_path(r'^api/v1/media/(?P<path>.*)$', serve, {'document_root': settings.MEDIA_ROOT}),
    ]
