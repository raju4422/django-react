# api/views.py
import json
from contextvars import Token

from django.contrib.auth import authenticate, login
from rest_framework import status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.viewsets import ViewSet
from .serializers import LoginSerializer, CategorySerializer, DeleteCategorySerializer, CreateBlogSerializer, \
    BlogSerializer, UpdateCategorySerializer, DeleteBlogSerializer
from rest_framework.authtoken.models import Token
from .serializers import TokenAuthSerializer
from .models import Category, Blog
import os


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
                # serialized = json.dumps(dictionary)
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
        data = Category.objects.all().order_by('-id').values()
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

    @action(detail=True, methods=['PUT'])
    def update_category(self, request, pk=None):
        try:
            # Retrieve the category instance based on the provided primary key
            category = Category.objects.get(pk=pk)
        except Category.DoesNotExist:
            return Response({'msg': 'Category not found'}, status=status.HTTP_404_NOT_FOUND)
        serializer = CategorySerializer(category, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({'flag': 1, 'msg': 'Successfully Updated'}, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=False, methods=['POST'])
    def getCategoryById(self, request):
        id = request.POST.get('id');
        try:
            # Retrieve the category instance based on the provided primary key
            category = Category.objects.get(pk=id)
            category_data = {'id': category.id, 'category_name': category.category_name}
        except Category.DoesNotExist:
            return Response({'msg': 'Category not found'}, status=status.HTTP_404_NOT_FOUND)
        serializer = CategorySerializer(data=category_data)
        if serializer.is_valid():
            return Response({'flag': 1, 'msg': "", 'data': serializer.data}, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class BlogViewSet(ViewSet):
    def create(self, request):
        serializer = CreateBlogSerializer(data=request.data)
        if serializer.is_valid():
            title = serializer.validated_data['title']
            description = serializer.validated_data['description']
            category_id = serializer.validated_data['category']
            image = serializer.validated_data['image']
            content = serializer.validated_data['content']
            slug = serializer.validated_data['slug']
            record = Blog.objects.create(title=title, description=description, category=category_id,
                                         content=content, slug=slug)
            if record is not None:
                blog_object = Blog.objects.get(pk=record.id)
                image.name = "Blog" + str(record.id) + "_" + image.name
                blog_object.image = image
                res = blog_object.save()
                return Response({'flag': 1, 'msg': "Successfully Created"}, status=status.HTTP_200_OK)
            else:
                return Response({'msg': 'Something Went Wrong..!'}, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_200_OK)

    @action(detail=False, methods=['GET'])
    def get_all(self, request):
        data = Blog.objects.select_related('category').order_by('-id').all()
        serializer = BlogSerializer(data, many=True)
        return Response({'flag': 1, 'msg': "", 'data': serializer.data}, status=status.HTTP_200_OK)

    @action(detail=False, methods=['POST'])
    def publish_blog(self, request):
        blog_object = Blog.objects.filter(pk=request.POST.get('id')).update(is_published = True);
        if blog_object is not None:
            return Response({'flag': 1, 'msg': "Published Blog Successfully"}, status=status.HTTP_200_OK)
        else:
            return Response({'flag': 2, 'msg': "Something Went Wrong..", 'data': None}, status=status.HTTP_200_OK)

    @action(detail=False, methods=['POST'])
    def delete(self, request):
        serializer = DeleteBlogSerializer(data=request.data)
        if serializer.is_valid():
            id = serializer.validated_data['id']
            try:
                blog = Blog.objects.get(pk=id)
            except Category.DoesNotExist:
                return Response({'msg': 'Blog not found'}, status=status.HTTP_404_NOT_FOUND)
            res = Blog.objects.filter(pk=id).delete();
            if res is not None:
                image_path = blog.image.path;
                if os.path.exists(image_path):
                    os.remove(image_path)
                return Response({'flag': 1, 'msg': "Successfully Deleted"}, status=status.HTTP_200_OK)
            else:
                return Response({'msg': 'Something Went Wrong..!'}, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_200_OK)


class TestViewSet(ViewSet):
    @action(detail=False, methods=['GET'])
    def test(self, request):
        print('test')
        return Response({'message': 'Testing successful'})

    @action(detail=False, methods=['GET'])
    def hello(self, request):
        return Response({'message': 'Hello There'})
