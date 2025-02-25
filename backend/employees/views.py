from rest_framework import generics
from .models import Employee
from .serializers import EmployeeSerializer
from rest_framework.viewsets import ModelViewSet
class EmployeeCreateView(generics.CreateAPIView):
    queryset = Employee.objects.all()
    serializer_class = EmployeeSerializer
    
class EmployeeListView(ModelViewSet):
    queryset = Employee.objects.all()
    serializer_class = EmployeeSerializer