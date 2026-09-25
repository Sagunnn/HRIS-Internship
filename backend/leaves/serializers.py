from rest_framework import serializers

from employees.serializers import EmployeeSerializer
from .models import Leave


def validate_date_range(serializer, attrs):
    instance = serializer.instance
    start_date = attrs.get('start_date', getattr(instance, 'start_date', None))
    end_date = attrs.get('end_date', getattr(instance, 'end_date', None))
    if start_date and end_date and end_date < start_date:
        raise serializers.ValidationError({'end_date': 'End date cannot be before the start date.'})
    return attrs


class AdminLeaveSerializer(serializers.ModelSerializer):
    employee = serializers.StringRelatedField()

    class Meta:
        model = Leave
        fields = '__all__'


class UserLeaveSerializer(serializers.ModelSerializer):
    class Meta:
        model = Leave
        fields = ['id', 'leave_type', 'start_date', 'end_date', 'reason', 'status', 'created_at', 'updated_at']
        read_only_fields = ['status', 'created_at', 'updated_at']

    def validate(self, attrs):
        return validate_date_range(self, attrs)


class UserLeaveApprovalSerializer(serializers.ModelSerializer):
    employee = EmployeeSerializer(read_only=True)

    class Meta:
        model = Leave
        fields = ['id', 'employee', 'leave_type', 'start_date', 'end_date', 'reason', 'status', 'created_at', 'updated_at']
        read_only_fields = ['id', 'leave_type', 'start_date', 'end_date', 'reason', 'created_at', 'updated_at']
