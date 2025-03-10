from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    LeaveListCreateView,
    LeaveRetrieveUpdateDestroyView,
    UserLeaveListCreateView,
    UserLeaveRetrieveView,
    UserLeaveApprovalView,
    UserLeaveUpdateView# This is a ViewSet
)

# ✅ Define a router for the ViewSet
router = DefaultRouter()
router.register(r'leave-approval', UserLeaveApprovalView, basename='user-leave-approval')

urlpatterns = [
    # Class-Based Views
    path('leaves/', LeaveListCreateView.as_view(), name='leave-list-create'),
    path('leaves/<int:pk>/', LeaveRetrieveUpdateDestroyView.as_view(), name='leave-retrieve-update-destroy'),
    
    # User Leave Management
    path('user-leaves/', UserLeaveListCreateView.as_view(), name='user-leave-list-create'),
    path('user-leaves/<int:pk>/', UserLeaveRetrieveView.as_view(), name='user-leave-retrieve'),
    path('user-leaves/update/<int:pk>/', UserLeaveUpdateView.as_view(), name='leave-update'),

    # ✅ Include router URLs for ViewSets
    path('', include(router.urls)),
]
