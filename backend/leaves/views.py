from rest_framework import generics
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from .models import Leave
from .serializers import AdminLeaveSerializer,UserLeaveSerializer,UserLeaveApprovalSerializer
from employees.models import Employee
from django.shortcuts import get_object_or_404
from rest_framework import viewsets

class LeaveListCreateView(generics.ListCreateAPIView):
    queryset = Leave.objects.all()
    serializer_class = AdminLeaveSerializer
    permission_classes = [IsAdminUser]

class LeaveRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Leave.objects.all()
    serializer_class = AdminLeaveSerializer
    permission_classes = [IsAdminUser]

class UserLeaveListCreateView(generics.ListCreateAPIView):
    serializer_class = UserLeaveSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Leave.objects.filter(employee__user=self.request.user)

    def perform_create(self, serializer):
        employee = get_object_or_404(Employee, user=self.request.user)
        serializer.save(employee=employee)
class UserLeaveRetrieveView(generics.RetrieveAPIView):
    serializer_class = UserLeaveSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Leave.objects.filter(employee__user=self.request.user)
    
class UserLeaveApprovalView(viewsets.ModelViewSet):
    queryset=Leave.objects.all()
    permission_classes=[IsAdminUser]
    serializer_class=UserLeaveApprovalSerializer

class UserLeaveUpdateView(generics.UpdateAPIView):
    queryset = Leave.objects.all()
    serializer_class = UserLeaveSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        """
        Ensure the leave record belongs to the authenticated user.
        """
        leave = super().get_object()
        if leave.employee.user != self.request.user:
            raise PermissionDenied('You do not have permission to update this leave record.')
        return leave

    def perform_update(self, serializer):
        """
        Save the updated leave record.
        """
        # You can add additional logic here if needed before saving
        serializer.save()