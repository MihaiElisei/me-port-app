# Generated by Django 5.1.7 on 2025-03-20 17:20

import django.db.models.functions.text
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('portfolio', '0002_technology_alter_customuser_email_and_more'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='technology',
            options={'ordering': ['name']},
        ),
        migrations.AddConstraint(
            model_name='technology',
            constraint=models.UniqueConstraint(django.db.models.functions.text.Lower('name'), name='unique_lower_technology_name'),
        ),
    ]
