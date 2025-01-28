from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    
    ROLE_CHOICES=[('Admin','admin'),
                  ('Manager','manager'),
                  ('Employee','employee')]
    
    email=models.EmailField(unique=True,blank=False)
    role=models.CharField(max_length=100,choices=ROLE_CHOICES,default='Employee')
    profile_picture=models.ImageField(upload_to='profile_pictures/',null=True, blank=True)
    
    def __str__(self):
        return f"{self.username}({self.role})"
    
    def is_manager(self):
        return self.role=='manager'
    
    def is_admin(self):
        return self.role=='admin'
    
    def is_employee(self):
        return self.role=='employee'
    
