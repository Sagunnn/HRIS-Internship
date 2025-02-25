from rest_framework import generics
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from .models import Leave
from .serializers import AdminLeaveSerializer,UserLeaveSerializer
from employees.models import Employee
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
        employee = Employee.objects.get(user=self.request.user)
        serializer.save(employee=employee)

class UserLeaveRetrieveView(generics.RetrieveAPIView):
    serializer_class = UserLeaveSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Leave.objects.filter(employee__user=self.request.user)
