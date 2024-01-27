# api/serializers.py
from rest_framework import serializers
from .models import Category, Blog, Images, BlogComments
from django.contrib.auth.models import User, Permission
from django.contrib.contenttypes.models import ContentType
from django.utils import timezone

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


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'first_name', 'last_name', 'email', 'is_active']


class BlogSerializer(serializers.ModelSerializer):
    category = CategorySerializer()
    user = UserSerializer()
    created_at = serializers.DateTimeField(format="%Y-%m-%d %H:%M:%S", read_only=True)

    class Meta:
        model = Blog
        fields = "__all__"

    def to_representation(self, instance):
        data = super().to_representation(instance)
        # Convert UTC time to local time for the published_at field
        data['created_at'] = timezone.localtime(instance.created_at).strftime("%b %d, %Y")
        return data


class BlogCommentsSerializer(serializers.ModelSerializer):
    blog = BlogSerializer()

    class Meta:
        model = BlogComments
        fields = "__all__"


class DeleteBlogSerializer(serializers.Serializer):
    id = serializers.IntegerField()


class ImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Images
        fields = "__all__"


class AddUserSerializer(serializers.Serializer):
    first_name = serializers.CharField(max_length=250)
    user_email = serializers.EmailField()
    role_id = serializers.IntegerField()


class AddRoleSerializer(serializers.Serializer):
    name = serializers.CharField(max_length=250)


class AddPermissionSerializer(serializers.Serializer):
    name = serializers.CharField(max_length=250)
    content_type_id = serializers.IntegerField()


class TokenAuthSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    token = serializers.CharField(max_length=200)
