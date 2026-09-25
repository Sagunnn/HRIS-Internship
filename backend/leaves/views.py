from django.shortcuts import get_object_or_404
from rest_framework import generics, viewsets
from rest_framework.exceptions import PermissionDenied, ValidationError
from rest_framework.permissions import IsAuthenticated

from api.permissions import IsHRAdmin
from employees.models import Employee
from .models import Leave
from .serializers import AdminLeaveSerializer, UserLeaveApprovalSerializer, UserLeaveSerializer


class LeaveListCreateView(generics.ListCreateAPIView):
    queryset = Leave.objects.all()
    serializer_class = AdminLeaveSerializer
    permission_classes = [IsHRAdmin]


class LeaveRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Leave.objects.all()
    serializer_class = AdminLeaveSerializer
    permission_classes = [IsHRAdmin]


class UserLeaveListCreateView(generics.ListCreateAPIView):
    serializer_class = UserLeaveSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Leave.objects.filter(employee__user=self.request.user).order_by('-start_date')

    def perform_create(self, serializer):
        employee = get_object_or_404(Employee, user=self.request.user)
        serializer.save(employee=employee)


class UserLeaveRetrieveView(generics.RetrieveAPIView):
    serializer_class = UserLeaveSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Leave.objects.filter(employee__user=self.request.user)


class UserLeaveApprovalView(viewsets.ModelViewSet):
    queryset = Leave.objects.select_related('employee__user', 'employee__department').order_by('-start_date')
    permission_classes = [IsHRAdmin]
    serializer_class = UserLeaveApprovalSerializer


class UserLeaveUpdateView(generics.UpdateAPIView):
    queryset = Leave.objects.all()
    serializer_class = UserLeaveSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        """Employees may only edit their own leave requests while they are still pending."""
        leave = super().get_object()
        if leave.employee.user != self.request.user:
            raise PermissionDenied('You do not have permission to update this leave record.')
        if leave.status != 'PENDING':
            raise ValidationError({'status': 'Only pending leave requests can be edited.'})
        return leave
