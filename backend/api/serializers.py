# api/serializers.py
from rest_framework import serializers
from .models import Category, Blog, Images
from django.contrib.auth.models import User, Permission
from django.contrib.contenttypes.models import ContentType


from rest_framework.authtoken.models import Token


class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField(write_only=True)


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = "__all__"


class PermissionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Permission
        fields = "__all__"

    content_type = ContentType()


class UpdateCategorySerializer(serializers.Serializer):
    id = serializers.IntegerField()
    category_name = serializers.StringRelatedField()


class DeleteCategorySerializer(serializers.Serializer):
    id = serializers.IntegerField()


class CreateBlogSerializer(serializers.ModelSerializer):
    class Meta:
        model = Blog
        fields = "__all__"

    image = serializers.FileField()


class BlogSerializer(serializers.ModelSerializer):
    class Meta:
        model = Blog
        fields = "__all__"

    category = CategorySerializer()


class DeleteBlogSerializer(serializers.Serializer):
    id = serializers.IntegerField()


class ImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Images
        fields = "__all__"


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = "__all__"


class AddUserSerializer(serializers.Serializer):
    first_name = serializers.CharField(max_length=250)
    user_email = serializers.EmailField()


class AddRoleSerializer(serializers.Serializer):
    name = serializers.CharField(max_length=250)


class TokenAuthSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    token = serializers.CharField(max_length=200)
