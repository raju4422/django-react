# api/serializers.py
from rest_framework import serializers
from rest_framework.authtoken.models import Token


class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField(write_only=True)


class TokenAuthSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    token = serializers.CharField(max_length=200)
