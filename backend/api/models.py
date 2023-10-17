from django.db import models


# Create your models here.

class Category(models.Model):
    category_name = models.CharField(max_length=250);

    class Meta:
        db_table = "category"
    def __str__(self):
        return self.category_name


class Blog(models.Model):
    title = models.CharField(max_length=250);
    description = models.CharField(max_length=500);
    category = models.ForeignKey(Category, on_delete=models.CASCADE);
    image = models.ImageField(blank=True, default="", upload_to="blog_images/")
    content = models.TextField(blank=True)

    class Meta:
        db_table = "blog"

    def __str__(self):
        return self.title
