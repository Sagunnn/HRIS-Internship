from django.urls import path,include
from .views import DepartmentView
from rest_framework.routers import DefaultRouter

router= DefaultRouter()
router.register(r'',DepartmentView,basename='Departments')
urlpatterns = [
    path('', include(router.urls)),
]
