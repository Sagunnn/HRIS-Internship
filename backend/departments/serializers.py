from rest_framework import serializers
from .models import Department
from employees.serializers import EmployeeSerializer
from employees.models import Employee

class DepartmentSerializer(serializers.ModelSerializer):
#  # Use PrimaryKeyRelatedField to store and retrieve the manager by their ID
#     manager = serializers.PrimaryKeyRelatedField(queryset=Employee.objects.all())
    
#     # Add a 'manager_name' field that fetches the full name of the manager
#     manager_name = serializers.CharField(source='manager.get_full_name', read_only=True)
    manager_name = serializers.CharField(source='get_manager_name', read_only=True)

    class Meta:
        model = Department
        fields = ['department_id', 'department_name', 'manager','manager_name']
        
