from authentication.models import User
from rest_framework import serializers
from django.conf import settings
from django.conf.urls.static import static
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model=User
        fields=['id','username','email','first_name','role','profile_picture']
        extra_kwargs={
            'password':{'write_only':True}
        }
    
    def to_representation(self, instance):
        representation = super().to_representation(instance)
        if instance.profile_picture:
            # Ensure the profile picture URL is returned with the correct MEDIA_URL
            representation['profile_picture'] = settings.MEDIA_URL + str(instance.profile_picture)
        return representation

class UserCreationSerializer(serializers.ModelSerializer):
    password=serializers.CharField(write_only=True)
    confirm_password=serializers.CharField(write_only=True)
    profile_picture = serializers.ImageField(required=False)
    class Meta:
        model=User
        fields=['username','email','profile_picture','role','is_staff','password','confirm_password']
        extra_kwargs={'password':{'write_only':True}}
    def validate(self,attr):
        if attr['password']!=attr['confirm_password']:
            raise serializers.ValidationError('Password do not match')
        return attr
    
    def create(self, validated_data):
        password = validated_data.pop('password')
        validated_data.pop('confirm_password')

        profile_picture = validated_data.pop('profile_picture', None)  # Extract profile picture

        user = User.objects.create_user(password=password, **validated_data)

        if profile_picture:
            user.profile_picture = profile_picture  # Explicitly assign profile picture
            user.save()  # Save user again to store image
        return user

    
class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['role'] = user.role  # Add user role to the token

        return token