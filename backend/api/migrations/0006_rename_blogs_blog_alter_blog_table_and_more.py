# Generated by Django 4.1.1 on 2023-10-16 18:07

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0005_alter_blogs_category'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='Blogs',
            new_name='Blog',
        ),
        migrations.AlterModelTable(
            name='blog',
            table=None,
        ),
        migrations.AlterModelTable(
            name='category',
            table=None,
        ),
    ]
