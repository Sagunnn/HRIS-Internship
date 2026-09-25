from rest_framework.viewsets import ModelViewSet

from api.permissions import IsHRAdminOrReadOnly
from .models import Department
from .serializers import DepartmentSerializer


class DepartmentView(ModelViewSet):
    queryset = Department.objects.select_related('manager').order_by('department_name')
    serializer_class = DepartmentSerializer
    permission_classes = [IsHRAdminOrReadOnly]
