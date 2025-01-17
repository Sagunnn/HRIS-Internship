from django.shortcuts import render
from rest_framework.viewsets import  ModelViewSet
from rest_framework.views import APIView
from .models import Department
from .serializers import DepartmentSerializer
from rest_framework.permissions import IsAuthenticated
# Create your views here.

class DepartmentView(ModelViewSet):
    queryset=Department.objects.all()
    serializer_class= DepartmentSerializer
    permission_classes= [IsAuthenticated]