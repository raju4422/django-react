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
from django.contrib.auth.models import GroupManager
from django.contrib.auth.models import Group, Permission
import string


import random

import backend.settings
from api.serializers import UserSerializer, AddUserSerializer, AddRoleSerializer, PermissionSerializer, \
    AddPermissionSerializer


class UserViewSet(ViewSet):

    def list(self, request):
        data = User.objects.all().order_by('-id').values('id', 'first_name', 'last_name', 'email', 'date_joined',
                                                         'is_active', 'is_staff', 'is_superuser')
        return Response({'flag': 1, 'msg': "Success", 'data': data}, status=status.HTTP_200_OK)

    def create(self, request):
        serializer = AddUserSerializer(data=request.data)
        if serializer.is_valid():
            first_name = serializer.validated_data['first_name']
            role = serializer.validated_data['role_id']
            email = serializer.validated_data['user_email']
            username = first_name + str(random.randint(100, 999))
            password = str(random.randint(100000, 999999))
            hashed_password = make_password(password)
            last_name = random.choice(string.ascii_uppercase)
            record = User.objects.create(first_name=first_name, email=email, username=username,
                                         password=hashed_password, last_name=last_name, is_active=False)
            if record is not None:
                record.groups.add(role)
                email_from = backend.settings.EMAIL_HOST_USER
                message = "Hi Hello Your account has been created and username is " + username + " and password is " + password
                # send_mail("Account Registration",
                #           message, email_from,
                #           [email, ])
                return Response({'flag': 1, 'msg': "Successfully Uploaded"}, status=status.HTTP_200_OK)
            else:
                return Response({'msg': 'Something Went Wrong..!'}, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_200_OK)

    def destroy(self, request, pk=None):
        try:
            # res = Images.objects.filter(id=pk).delete()
            instance = User.objects.get(pk=pk)
            res = instance.delete()
            if res is not None:
                return Response({'flag': 1, 'msg': "Successfully Deleted"}, status=status.HTTP_200_OK)
            else:
                return Response({'msg': 'Something Went Wrong..!'}, status=status.HTTP_200_OK)
        except User.DoesNotExist:
            return Response({'msg': 'Object not found or Something Went Wrong..!'}, status=status.HTTP_404_NOT_FOUND)



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

    @action(detail=False, methods=['POST'])
    def get_all_role_permissions(self, request):

        permissions = Permission.objects.exclude(content_type_id__in=[1, 3, 2, 7, 8, 5, 6]).all().values()
        role_id = request.POST.get('role_id')
        group = Group.objects.get(id=role_id)
        group_permissions = group.permissions.all()
        permDict = []
        for permission in group_permissions:
            permDict.append(permission.codename)
        return Response({'flag': 1, 'msg': "success", 'role_permissions': permDict, 'all_permissions': permissions},
                        status=status.HTTP_200_OK)

    @action(detail=False, methods=['POST'])
    def assign_role_permissions(self, request):
        role_id = request.POST.get('role_id')
        permissionIds = request.POST.getlist('permissions[]')

        for permissionId in permissionIds:
            res = self.is_permission_assigned_to_group(role_id, permissionId)
            if not res:
                group = Group.objects.get(id=role_id)
                permission = Permission.objects.get(id=permissionId)
                result = group.permissions.add(permission)
                print(result)

        return Response({'flag': 1, 'msg': "success"}, status=status.HTTP_200_OK)

    def is_permission_assigned_to_group(self, group_id, permission_id):
        try:
            # Get the group instance
            group = Group.objects.get(id=group_id)

            # Check if the permission is assigned to the group
            return group.permissions.filter(id=permission_id).exists()

        except Group.DoesNotExist:
            # Handle the case where the group does not exist
            return False


class PermissionViewSet(ViewSet):
    def list(self, request):
        data = Permission.objects.select_related('content_type').order_by('id').all()
        serializer = PermissionSerializer(data, many=True)
        return Response({'flag': 1, 'msg': "success", 'data': serializer.data}, status=status.HTTP_200_OK)

    def create(self, request):
        serializer = AddPermissionSerializer(data=request.data)
        if serializer.is_valid():
            name = serializer.validated_data['name']
            content_type_id = serializer.validated_data['content_type_id']
            code_name = name.lower().replace(" ", "_")
            record = Permission.objects.create(name=name, content_type_id=content_type_id, codename=code_name)
            if record is not None:
                return Response({'flag': 1, 'msg': "Successfully Created"}, status=status.HTTP_200_OK)
            else:
                return Response({'msg': 'Something Went Wrong..!'}, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_200_OK)

    def destroy(self, request, pk=None):
        try:
            # res = Images.objects.filter(id=pk).delete()
            instance = Permission.objects.get(pk=pk)
            res = instance.delete()
            if res is not None:
                return Response({'flag': 1, 'msg': "Successfully Deleted"}, status=status.HTTP_200_OK)
            else:
                return Response({'msg': 'Something Went Wrong..!'}, status=status.HTTP_200_OK)
        except Permission.DoesNotExist:
            return Response({'msg': 'Object not found or Something Went Wrong..!'}, status=status.HTTP_404_NOT_FOUND)

    @action(detail=False, methods=['GET'])
    def get_all_app_labels(self, request):
        data = ContentType.objects.exclude(id__in=[1, 3, 2, 7, 8, 5, 6]).all().order_by('-id').values()
        return Response({'flag': 1, 'msg': "success", 'data': data}, status=status.HTTP_200_OK)
