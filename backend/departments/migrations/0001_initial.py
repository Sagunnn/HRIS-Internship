# Generated by Django 5.1.4 on 2025-02-18 05:27

import uuid
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Department',
            fields=[
                ('department_name', models.CharField(max_length=120, unique=True)),
                ('department_id', models.CharField(default=uuid.uuid4, max_length=20, primary_key=True, serialize=False, unique=True)),
            ],
        ),
    ]
