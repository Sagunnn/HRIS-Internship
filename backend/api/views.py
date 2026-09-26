from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.viewsets import ModelViewSet
from rest_framework_simplejwt.views import TokenObtainPairView

from authentication.models import User
from .permissions import IsHRAdmin, is_hr_admin
from .serializers import CustomTokenObtainPairSerializer, UserCreationSerializer, UserSerializer


class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer


class UserView(ModelViewSet):
    queryset = User.objects.all().order_by('id')
    serializer_class = UserSerializer

    def get_permissions(self):
        # Users may read and edit their own account; everything else is admin-only.
        if self.action in ('retrieve', 'update', 'partial_update'):
            return [IsAuthenticated()]
        return [IsHRAdmin()]

    def get_queryset(self):
        if is_hr_admin(self.request.user):
            return super().get_queryset()
        return super().get_queryset().filter(id=self.request.user.id)

    def update(self, request, *args, **kwargs):
        user = self.get_object()
        data = request.data.copy()

        # Only admins may change roles.
        if not is_hr_admin(request.user):
            data.pop('role', None)

        password = data.pop('password', None)
        confirm_password = data.pop('confirm_password', None)
        if isinstance(password, list):
            password = password[0]
        if isinstance(confirm_password, list):
            confirm_password = confirm_password[0]
        if password and confirm_password is not None and password != confirm_password:
            return Response({'password': ['Passwords do not match.']}, status=status.HTTP_400_BAD_REQUEST)

        serializer = self.get_serializer(user, data=data, partial=True)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()

        if password:
            user.set_password(password)
            user.save()

        return Response(self.get_serializer(user).data, status=status.HTTP_200_OK)


class UserCreateView(APIView):
    permission_classes = [IsHRAdmin]

    def post(self, request, *args, **kwargs):
        serializer = UserCreationSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({'detail': 'User created successfully.'}, status=status.HTTP_201_CREATED)

    def get(self, request):
        serializer = UserSerializer(User.objects.all(), many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class HomeView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        return Response({'Hello': 'Welcome'})
