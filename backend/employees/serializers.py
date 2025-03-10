from rest_framework import serializers
# from phonenumber_field.serializerfields import PhoneNumberField
from django.db import transaction
from api.serializers import UserCreationSerializer
from departments.models import Department
from authentication.models import User
from .models import Employee
from rest_framework import generics
from rest_framework import status
from rest_framework.response import Response


class EmployeeSerializer(serializers.ModelSerializer):
    user = UserCreationSerializer()
    department = serializers.CharField()  # Accepting department name as a string
    # contact_number = PhoneNumberField()  # Correctly handle the contact number field
    middle_name=serializers.CharField(required=False)

    class Meta:
        model = Employee
        fields = ['id','user', 'department', 'contact_number', 'address', 'first_name', 'middle_name', 'last_name']

    def create(self, validated_data):
        user_data = validated_data.pop('user')
        department_name = validated_data.pop('department')

        with transaction.atomic():
            # Validate and retrieve the department
            try:
                department = Department.objects.get(department_name=department_name)
            except Department.DoesNotExist:
                raise serializers.ValidationError({"department": "Invalid department selected."})

            # Check for existing username/email
            if User.objects.filter(username=user_data['username']).exists():
                raise serializers.ValidationError({"user": "Username already exists."})
            if User.objects.filter(email=user_data['email']).exists():
                raise serializers.ValidationError({"user": "Email already exists."})
            role=user_data.get('role')
            if not role:
                raise serializers.ValidationError({"user":"Role is required"})
            # Create the user
            user = User.objects.create(
                username=user_data.get('username'),
                email=user_data.get('email'),
                profile_picture=user_data.get('profile_picture'),
                role=role,
                is_staff=user_data.get('is_staff', False)
            )
            user.set_password(user_data.get('password'))
            user.save()

            # Create the employee
            employee = Employee.objects.create(
                user=user,
                department=department,
                first_name=validated_data.get('first_name'),
                middle_name=validated_data.get('middle_name', ''),
                last_name=validated_data.get('last_name'),
                contact_number=validated_data.get('contact_number'),
                address=validated_data.get('address'),
            )

            return employee
    def update(self, instance, validated_data):
        # Get department name from the validated data
        department_name = validated_data.get('department', None)

        if department_name:
            try:
                # Fetch the Department instance based on department_name
                department = Department.objects.get(department_name=department_name)
                instance.department = department  # Assign the Department instance
            except Department.DoesNotExist:
                raise serializers.ValidationError({"department": "Invalid department selected."})

        # Update other fields of the employee instance
        for attr, value in validated_data.items():
            if attr != 'department':
                setattr(instance, attr, value)

        instance.save()
        return instance

class EmployeeDetailView(generics.RetrieveAPIView):  # New view
    queryset = Employee.objects.all()
    serializer_class = EmployeeSerializer
    
    