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
    
