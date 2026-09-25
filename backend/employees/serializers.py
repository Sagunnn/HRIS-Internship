from django.db import transaction
from rest_framework import serializers

from api.serializers import UserCreationSerializer
from authentication.models import User
from departments.models import Department
from .models import Employee


class EmployeeSerializer(serializers.ModelSerializer):
    user = UserCreationSerializer()
    # Departments are read and written by name, e.g. "Engineering"
    department = serializers.SlugRelatedField(
        slug_field='department_name',
        queryset=Department.objects.all(),
        allow_null=True,
        required=False,
        error_messages={'does_not_exist': 'Invalid department selected.'},
    )
    middle_name = serializers.CharField(required=False, allow_blank=True, default='')

    class Meta:
        model = Employee
        fields = ['id', 'user', 'department', 'contact_number', 'address', 'first_name', 'middle_name', 'last_name']

    def create(self, validated_data):
        user_data = validated_data.pop('user')

        if User.objects.filter(username=user_data['username']).exists():
            raise serializers.ValidationError({"user": "Username already exists."})
        if User.objects.filter(email=user_data['email']).exists():
            raise serializers.ValidationError({"user": "Email already exists."})
        if not user_data.get('role'):
            raise serializers.ValidationError({"user": "Role is required"})

        with transaction.atomic():
            user = UserCreationSerializer().create(user_data)
            return Employee.objects.create(user=user, **validated_data)

    def update(self, instance, validated_data):
        # Account fields (username, password, ...) are edited through the users endpoint.
        validated_data.pop('user', None)
        return super().update(instance, validated_data)
