# Generated by Django 4.1.1 on 2024-01-14 12:55

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0025_blogcomments'),
    ]

    operations = [
        migrations.RenameField(
            model_name='blogcomments',
            old_name='ipaddress',
            new_name='ip_address',
        ),
    ]
