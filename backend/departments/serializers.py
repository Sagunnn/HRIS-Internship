from rest_framework import serializers

from .models import Department


class DepartmentSerializer(serializers.ModelSerializer):
    manager_name = serializers.CharField(source='get_manager_name', read_only=True)

    class Meta:
        model = Department
        fields = ['department_id', 'department_name', 'manager', 'manager_name']
