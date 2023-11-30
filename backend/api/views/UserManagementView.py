from random import random

from django.contrib.auth.hashers import make_password
from rest_framework import status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.viewsets import ViewSet
from django.contrib.auth.models import User
from django.core.mail import send_mail
from django.contrib.auth.models import Group
from django.contrib.auth.models import Permission
from django.contrib.auth.models import ContentType

import random

import backend.settings
from api.serializers import UserSerializer, AddUserSerializer, AddRoleSerializer, PermissionSerializer


class UserViewSet(ViewSet):

    def list(self, request):
        data = User.objects.all().order_by('-id').values('id', 'first_name', 'last_name', 'email', 'date_joined',
                                                         'is_active', 'is_staff', 'is_superuser')
        return Response({'flag': 1, 'msg': "Success", 'data': data}, status=status.HTTP_200_OK)

    def create(self, request):
        serializer = AddUserSerializer(data=request.data)
        if serializer.is_valid():
            first_name = serializer.validated_data['first_name']
            email = serializer.validated_data['user_email']
            username = first_name + str(random.randint(100, 999))
            password = str(random.randint(100000, 999999))
            hashed_password = make_password(password)
            record = User.objects.create(first_name=first_name, email=email, username=username,
                                         password=hashed_password, is_active=False)
            if record is not None:
                email_from = backend.settings.EMAIL_HOST_USER
                message = "Hi Hello Your account has been created and username is " + username + " and password is " + password
                send_mail("Account Registration",
                          message, email_from,
                          [email, ])
                return Response({'flag': 1, 'msg': "Successfully Uploaded"}, status=status.HTTP_200_OK)
            else:
                return Response({'msg': 'Something Went Wrong..!'}, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_200_OK)


class RoleViewSet(ViewSet):

    def list(self, request):
        data = Group.objects.all().order_by('id').values()
        return Response({'flag': 1, 'msg': "success", 'data': data}, status=status.HTTP_200_OK)

    def create(self, request):
        serializer = AddRoleSerializer(data=request.data)
        if serializer.is_valid():
            name = serializer.validated_data['name']
            record = Group.objects.create(name=name)
            if record is not None:
                return Response({'flag': 1, 'msg': "Successfully Uploaded"}, status=status.HTTP_200_OK)
            else:
                return Response({'msg': 'Something Went Wrong..!'}, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_200_OK)

    def destroy(self, request, pk=None):
        try:
            # res = Images.objects.filter(id=pk).delete()
            instance = Group.objects.get(pk=pk)
            res = instance.delete()
            if res is not None:
                return Response({'flag': 1, 'msg': "Successfully Deleted"}, status=status.HTTP_200_OK)
            else:
                return Response({'msg': 'Something Went Wrong..!'}, status=status.HTTP_200_OK)
        except Group.DoesNotExist:
            return Response({'msg': 'Object not found or Something Went Wrong..!'}, status=status.HTTP_404_NOT_FOUND)


class PermissionViewSet(ViewSet):
    def list(self, request):
        data = Permission.objects.select_related('content_type').order_by('id').all()
        serializer = PermissionSerializer(data, many=True)
        return Response({'flag': 1, 'msg': "success", 'data': serializer.data}, status=status.HTTP_200_OK)

    @action(detail=False, methods=['GET'])
    def get_all_app_labels(self, request):
        data = ContentType.objects.exclude(id__in=[1, 3, 2, 7, 8, 5, 6]).all().order_by('-id').values()
        return Response({'flag': 1, 'msg': "success", 'data': data}, status=status.HTTP_200_OK)
