from django.db import models
from phonenumber_field.modelfields import PhoneNumberField

class Employee(models.Model):
    first_name=models.CharField(max_length=30, blank=False)
    middle_name=models.CharField(max_length=30)
    last_name=models.CharField(max_length=30,blank=False)
    address=models.CharField(max_length=100,default="")
    contact_number=models.CharField(max_length=15, null=True)
    department=models.ForeignKey('departments.Department',to_field='department_id',on_delete=models.SET_NULL, null=True, blank= True, related_name='employee')
    user=models.OneToOneField('authentication.User',on_delete=models.CASCADE)
