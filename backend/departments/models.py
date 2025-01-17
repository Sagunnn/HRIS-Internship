from django.db import models

# Create your models here.
class Department(models.Model):
    department_name=models.CharField(max_length=120, unique= True, blank= False)
    department_id=models.CharField(max_length=20, unique= True, blank= False)
    manager=models.ForeignKey('authentication.Employee',on_delete=models.SET_NULL,null=True,blank=True,related_name='managed_department')
    
    def __str__(self):
        return f"{self.department_name}: ({self.department_id})"