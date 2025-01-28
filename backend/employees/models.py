from django.db import models
from phonenumber_field.formfields import PhoneNumberField

class Employee(models.Model):
    first_name=models.CharField(max_length=30, blank=False)
    middle_name=models.CharField(max_length=30)
    last_name=models.CharField(max_length=30,blank=False)
    contact_number=PhoneNumberField(region='NP')
    department=models.ForeignKey('departments.Department',on_delete=models.SET_NULL, null=True, blank= True, related_name='employee')
    user=models.OneToOneField('authentication.User',on_delete=models.CASCADE)
