from rest_framework import serializers
from .models import Leave
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
        
class UserLeaveApprovalSerializer(serializers.ModelSerializer):
    class Meta:
        model=Leave
        fields = ['id', 'leave_type', 'start_date', 'end_date', 'reason', 'status', 'created_at', 'updated_at']
        read_only_fields = ['id', 'leave_type', 'start_date', 'end_date', 'reason','created_at', 'updated_at']