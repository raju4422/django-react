# api/views.py
import json
from contextvars import Token

from django.contrib.auth import authenticate, login
from rest_framework import status
from rest_framework.authtoken.admin import User
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.viewsets import ViewSet
from .serializers import LoginSerializer
from rest_framework.authtoken.models import Token
from django.db import connection as conn


class LoginViewSet(ViewSet):
    def create(self, request):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            username = serializer.validated_data['username']
            password = serializer.validated_data['password']
            user = authenticate(request, username=username, password=password)
            if user is not None:
                login(request, user)
                token = Token.objects.get(user=user)
                # print(conn.queries)
                user_data = {'id': request.user.id, 'name': request.user.username, 'email': request.user.email,
                             'auth_token': str(token)};
                return Response({'flag': 1, 'is_logged_in': True, 'data': user_data}, status=status.HTTP_200_OK)
            else:
                return Response({'message': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=False, methods=['POST'])
    def token_auth(self, request):
        token = Token.objects.get(user_id=request.POST.get('id'))
        if token is not None:
            if str(token) == request.POST.get('token'):
                return Response({'flag': 1, 'is_logged_in': True}, status=status.HTTP_200_OK)
            else:
                return Response({'flag': 1, 'message': 'Invalid credentials','is_logged_in': True}, status=status.HTTP_200_OK)
        else:
            return Response({'flag': 1, 'message': 'Invalid credentials', 'is_logged_in': True},
                            status=status.HTTP_200_OK)


class TestViewSet(ViewSet):
    @action(detail=False, methods=['GET'])
    def test(self, request):
        return Response({'message': 'Testing successful'})

    @action(detail=False, methods=['GET'])
    def hello(self, request):
        return Response({'message': 'Hello There'})
