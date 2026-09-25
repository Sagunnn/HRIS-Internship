from django.shortcuts import get_object_or_404
from rest_framework import generics
from rest_framework.decorators import action
from rest_framework.parsers import FormParser, JSONParser, MultiPartParser
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet

from api.permissions import IsHRAdmin, IsHRAdminOrReadOnly
from .models import Employee
from .serializers import EmployeeSerializer


class EmployeeCreateView(generics.CreateAPIView):
    queryset = Employee.objects.all()
    serializer_class = EmployeeSerializer
    parser_classes = [MultiPartParser, FormParser]
    permission_classes = [IsHRAdmin]


class EmployeeListView(ModelViewSet):
    queryset = Employee.objects.select_related('user', 'department').order_by('id')
    serializer_class = EmployeeSerializer
    parser_classes = [JSONParser, MultiPartParser, FormParser]
    permission_classes = [IsHRAdminOrReadOnly]

    @action(detail=False, methods=['get'], permission_classes=[IsAuthenticated])
    def me(self, request):
        """The employee profile of the logged-in user."""
        employee = get_object_or_404(self.get_queryset(), user=request.user)
        return Response(self.get_serializer(employee).data)
