# Generated by Django 4.1.1 on 2023-10-21 18:07

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0016_alter_blog_created_at'),
    ]

    operations = [
        migrations.AlterField(
            model_name='blog',
            name='published_at',
            field=models.DateTimeField(blank=True, default=None, null=True),
        ),
    ]
