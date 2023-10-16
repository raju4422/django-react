# api/serializers.py
from rest_framework import serializers
from .models import Category, Blog

from rest_framework.authtoken.models import Token


class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField(write_only=True)


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = "__all__"


class DeleteCategorySerializer(serializers.Serializer):
    id = serializers.IntegerField()


class CreateBlogSerializer(serializers.ModelSerializer):
    class Meta:
        model = Blog
        fields = "__all__"


class BlogSerializer(serializers.ModelSerializer):
    class Meta:
        model = Blog
        fields = "__all__"

    category = CategorySerializer()


class TokenAuthSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    token = serializers.CharField(max_length=200)
