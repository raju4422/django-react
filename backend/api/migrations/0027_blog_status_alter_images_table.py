# Generated by Django 4.1.1 on 2024-01-27 15:15

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0026_rename_ipaddress_blogcomments_ip_address'),
    ]

    operations = [
        migrations.AddField(
            model_name='blog',
            name='status',
            field=models.PositiveSmallIntegerField(default=0),
        ),
        migrations.AlterModelTable(
            name='images',
            table='images',
        ),
    ]