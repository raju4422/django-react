# Generated by Django 4.1.1 on 2024-01-27 16:38

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0031_rename_customuser_user_alter_user_options_and_more'),
    ]

    operations = [
        migrations.DeleteModel(
            name='User',
        ),
    ]
