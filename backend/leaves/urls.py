from django.urls import path,include
from .views import (
    LeaveListCreateView,
    LeaveRetrieveUpdateDestroyView,
    UserLeaveListCreateView,
    UserLeaveRetrieveView
)
from rest_framework.routers import DefaultRouter


urlpatterns = [
    path('leaves/', LeaveListCreateView.as_view(), name='leave-list-create'),
    path('leaves/<int:pk>/', LeaveRetrieveUpdateDestroyView.as_view(), name='leave-retrieve-update-destroy'),
    
    # User Leave Management URLs
    path('user-leaves/', UserLeaveListCreateView.as_view(), name='user-leave-list-create'),
    path('user-leaves/<int:pk>/', UserLeaveRetrieveView.as_view(), name='user-leave-retrieve'),
]
