from django.urls import path,include
from rest_framework.routers import DefaultRouter
from .views import UserView,HomeView,UserCreateView
from django.conf import settings
from django.conf.urls.static import static

router=DefaultRouter()

router.register(r'users',UserView,basename="users")
urlpatterns = [
    path('',include(router.urls)),
    path('home/',HomeView.as_view(),name='home'),
    path('create_user/',UserCreateView.as_view(),name='create_user'),
    path('departments/',include('departments.urls')),
    path('leaves/',include('leaves.urls')),
    path('register-employee/',include('employees.urls')),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)