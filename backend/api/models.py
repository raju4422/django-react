import datetime

from django.db import models
from django.contrib.auth.models import User
from django.contrib.auth.models import AbstractUser

from backend import settings


# Create your models here.
class Userdata(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    manager = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True,
                                related_name='manager_id')

    class Meta:
        db_table = "user_data"

    def __str__(self):
        return self.user


class Category(models.Model):
    category_name = models.CharField(max_length=250)

    class Meta:
        db_table = "category"

    def __str__(self):
        return self.category_name


class Blog(models.Model):
    title = models.CharField(max_length=500)
    description = models.CharField(max_length=1000)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    image = models.ImageField(blank=True, default="", upload_to="blog_images/")
    content = models.TextField(blank=True)
    is_published = models.BooleanField(default=False)
    slug = models.TextField(blank=True)
    status = models.PositiveSmallIntegerField(default=0)
    created_at = models.DateTimeField(auto_now=True, blank=True)
    published_at = models.DateTimeField(default=None, blank=True, null=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, default=1)

    class Meta:
        db_table = "blog"

    def __str__(self):
        return self.title


class BlogComments(models.Model):
    blog = models.ForeignKey(Blog, on_delete=models.CASCADE, default=None)
    comment = models.CharField(max_length=1000)
    ip_address = models.TextField(max_length=300)
    user = models.ForeignKey(User, on_delete=models.CASCADE, default=None)

    class Meta:
        db_table = "blog_comments"

    def __str__(self):
        return self.comment


class Images(models.Model):
    image = models.ImageField(blank=True, default="", upload_to="trident_images/")
    alt_text = models.CharField(max_length=250)
    user = models.ForeignKey(User, on_delete=models.CASCADE, default=1)

    class Meta:
        db_table = "images"

    def __str__(self):
        return self.alt_text


class Payments(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    amount = models.DecimalField(decimal_places=2, max_digits=10)
    transaction_id = models.CharField(max_length=250)
    payment_status = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now=True, blank=True)

    class Meta:
        db_table = "user_payments"

    def __str__(self):
        return self.amount


class BlogChat(models.Model):
    blog = models.ForeignKey(Blog, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    message = models.TextField(max_length=1000)
    created_at = models.DateTimeField(auto_now=True, blank=True)

    class Meta:
        db_table = "blog_chat"

    def __str__(self):
        return self.message
