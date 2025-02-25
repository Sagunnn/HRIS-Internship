from django.db import models
import uuid
# Create your models here.
class Department(models.Model):
    department_name=models.CharField(max_length=120, unique= True, blank= False)
    department_id=models.CharField(max_length=20, unique= True, blank= False,primary_key=True,default=uuid.uuid4)
    
    manager=models.ForeignKey('employees.Employee',on_delete=models.SET_NULL,null=True,blank=True,related_name='managed_department')
    
    def __str__(self):
        return f"{self.department_name}: ({self.department_id})"