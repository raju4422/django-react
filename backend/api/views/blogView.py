import os

from rest_framework import status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.viewsets import ViewSet

from api.models import Blog, Category
from api.serializers import CreateBlogSerializer, BlogSerializer, DeleteBlogSerializer


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