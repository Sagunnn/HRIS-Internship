from rest_framework import generics
from .models import Employee
from .serializers import EmployeeSerializer
from rest_framework.viewsets import ModelViewSet
from departments.models import Department
from rest_framework.parsers import MultiPartParser, FormParser
class EmployeeCreateView(generics.CreateAPIView):
    queryset = Employee.objects.all()
    serializer_class = EmployeeSerializer
    parser_classes = [MultiPartParser, FormParser] 
    
class EmployeeListView(ModelViewSet):
    queryset = Employee.objects.all()
    serializer_class = EmployeeSerializer
    
    