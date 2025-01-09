from authentication.models import User
from rest_framework import serializers

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model=User
        fields='__all__'
        extra_kwargs={
            'password':{'write_only':True}
        }

class UserCreationSerializer(serializers.ModelSerializer):
    password=serializers.CharField(write_only=True)
    confirm_password=serializers.CharField(write_only=True)
    
    class Meta:
        model=User
        fields=['username','email','password','confirm_password']
        extra_kwargs={'password':{'write_only':True}}
    def validate(self,attr):
        if attr['password']!=attr['confirm_password']:
            raise serializers.ValidationError('Password do not match')
        return attr
    
    def create(self,validated_data):
        password=validated_data.pop('password')
        validated_data.pop('confirm_password')
        return User.objects.create_user(password=password,**validated_data)