from django.urls import path,include
from rest_framework.routers import DefaultRouter
from .views import UserView,HomeView,UserCreateView
router=DefaultRouter()

router.register(r'users',UserView,basename="users")
urlpatterns = [
    path('',include(router.urls)),
    path('home/',HomeView.as_view(),name='home'),
    path('create_user/',UserCreateView.as_view(),name='create_user')
]
