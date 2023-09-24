from django.db import models


# Create your models here.

class Category(models.Model):
    category_name = models.CharField(max_length=250);

    class Meta:
        db_table = "categories"

    def __str__(self):
        return self.category_name
