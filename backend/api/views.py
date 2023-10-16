# api/views.py
import json
from contextvars import Token

from django.contrib.auth import authenticate, login
from rest_framework import status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.viewsets import ViewSet
from .serializers import LoginSerializer, CategorySerializer, DeleteCategorySerializer, CreateBlogSerializer, \
    BlogSerializer
from rest_framework.authtoken.models import Token
from .serializers import TokenAuthSerializer
from .models import Category, Blog


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
                return Response({'message': 'Invalid credentials', 'is_logged_in': False}, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_200_OK)

    @action(detail=False, methods=['POST'])
    def token_auth(self, request):
        serializer = TokenAuthSerializer(data=request.data)
        if serializer.is_valid():
            token = serializer.validated_data['token']
            id = serializer.validated_data['id']
            token_e = Token.objects.get(user_id=id)
            if token_e is not None:
                if str(token_e) == token:
                    return Response({'flag': 1, 'is_logged_in': True}, status=status.HTTP_200_OK)
                else:
                    return Response({'flag': 1, 'message': 'Invalid credentials', 'is_logged_in': False},
                                    status=status.HTTP_200_OK)
            else:
                return Response({'flag': 1, 'message': 'Invalid credentials', 'is_logged_in': False},
                                status=status.HTTP_200_OK)
        else:
            return Response({'flag': 1, 'message': 'Invalid credentials', 'is_logged_in': False},
                            status=status.HTTP_200_OK)


class CategoryViewSet(ViewSet):
    def create(self, request):
        serializer = CategorySerializer(data=request.data)
        if serializer.is_valid():
            category_name = serializer.validated_data['category_name']
            record = Category.objects.create(category_name=category_name)
            if record is not None:
                return Response({'flag': 1, 'msg': "Successfully Created"}, status=status.HTTP_200_OK)
            else:
                return Response({'msg': 'Something Went Wrong..!'}, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_200_OK)

    @action(detail=False, methods=['GET'])
    def get_all(self, request):
        data = Category.objects.all().order_by('-id').values()[:10]
        return Response({'flag': 1, 'msg': "", 'data': data}, status=status.HTTP_200_OK)

    @action(detail=False, methods=['POST'])
    def delete(self, request):
        serializer = DeleteCategorySerializer(data=request.data)
        if serializer.is_valid():
            id = serializer.validated_data['id']
            res = Category.objects.filter(pk=id).delete();
            if res is not None:
                return Response({'flag': 1, 'msg': "Successfully Deleted"}, status=status.HTTP_200_OK)
            else:
                return Response({'msg': 'Something Went Wrong..!'}, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_200_OK)




class BlogViewSet(ViewSet):
    def create(self, request):
        serializer = CreateBlogSerializer(data=request.data)
        if serializer.is_valid():
            title = serializer.validated_data['title']
            description = serializer.validated_data['description']
            category_id = serializer.validated_data['category']
            record = Blog.objects.create(title=title, description=description, category=category_id)
            if record is not None:
                return Response({'flag': 1, 'msg': "Successfully Created"}, status=status.HTTP_200_OK)
            else:
                return Response({'msg': 'Something Went Wrong..!'}, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_200_OK)

    @action(detail=False, methods=['GET'])
    def get_all(self, request):
        data = Blog.objects.select_related('category').all()
        serializer = BlogSerializer(data, many=True)
        return Response({'flag': 1, 'msg': "", 'data': serializer.data}, status=status.HTTP_200_OK)


class TestViewSet(ViewSet):
    @action(detail=False, methods=['GET'])
    def test(self, request):
        print('test')
        return Response({'message': 'Testing successful'})

    @action(detail=False, methods=['GET'])
    def hello(self, request):
        return Response({'message': 'Hello There'})
