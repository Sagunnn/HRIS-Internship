# Generated by Django 5.1.4 on 2025-01-30 04:24

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('authentication', '0003_employee_department_employee_user'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='employee',
            name='department',
        ),
        migrations.RemoveField(
            model_name='employee',
            name='user',
        ),
    ]
