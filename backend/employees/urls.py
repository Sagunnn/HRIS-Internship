from django.urls import path,include
from .views import EmployeeCreateView,EmployeeListView
from rest_framework.routers import DefaultRouter
router = DefaultRouter()
router.register(r'list', EmployeeListView)
urlpatterns = [
    path('', EmployeeCreateView.as_view(), name='employee-register'),
    path('',include(router.urls))
]
