from django.shortcuts import render
from .serializers import UserSerializer,UserCreationSerializer
from rest_framework.viewsets import ModelViewSet
from authentication.models import User
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status

# Create your views here.

class UserView(ModelViewSet):
    queryset=User.objects.all()
    serializer_class=UserSerializer
    permission_classes=[IsAuthenticated]
    
    def check_permissions(self, request,user_id=None):
        user=request.user
        if user.is_staff  or (user_id and user.id == user_id):
            return True
        else:
            return False
    
    def update(self, request, *args, **kwargs):
        # Get the user instance to update
        user = self.get_object()

        # Permission check
        if not self.check_permissions(request, user.id):
            return Response({"error": "You do not have permission to perform this action."}, status=HTTP_403_FORBIDDEN)

        # Allow partial updates
        kwargs["partial"] = True
        serializer = self.get_serializer(user, data=request.data, partial=True)

        if serializer.is_valid():
            # Handle password separately to ensure it's hashed
            password = serializer.validated_data.pop("password", None)
            if password:
                user.set_password(password)  # Hash and set the password
                user.save()

            # Save the rest of the fields
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

            
class UserCreateView(APIView):
    permission_classes=[IsAuthenticated]
    queryset=User.objects.all()
    
    def check_permissions(self, request):
        user=request.user
        return user.is_staff
    
    def post(self,request,*args,**kwargs):
        serializer=UserCreationSerializer(data=request.data)
        if self.check_permissions(request):
            if serializer.is_valid():
                serializer.save()
                return Response({'User Created Successfully'})
            else:
                return Response(serializer.errors,status=status.HTTP_501_NOT_IMPLEMENTED)
        else:
            return Response({'Not Authorized'})
        
    def get(self,request):
        queryset=User.objects.all()
        if self.check_permissions(request):
            serializer=UserSerializer(queryset,many=True)
            return Response(serializer.data,status=status.HTTP_200_OK)
        else:
            return Response({'not authorized'},status=status.HTTP_403_FORBIDDEN)
        
    
class HomeView(APIView):
    permission_classes=[IsAuthenticated]
    
    def get(self,request):
        content={'Hello':'Welcome'}
        return Response(content)
    
