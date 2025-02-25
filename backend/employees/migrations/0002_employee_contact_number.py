# Generated by Django 5.1.4 on 2025-02-18 06:41

import phonenumber_field.modelfields
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('employees', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='employee',
            name='contact_number',
            field=phonenumber_field.modelfields.PhoneNumberField(max_length=128, null=True, region='NP'),
        ),
    ]
