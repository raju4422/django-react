import os

from rest_framework import status
from rest_framework.authentication import SessionAuthentication, TokenAuthentication
from rest_framework.decorators import action, permission_classes, authentication_classes
from rest_framework.pagination import LimitOffsetPagination
from rest_framework.response import Response
from rest_framework.viewsets import ViewSet
from api.models import Blog, Category, BlogComments
from api.serializers import CreateBlogSerializer, BlogSerializer, DeleteBlogSerializer, BlogCommentsSerializer
from rest_framework.permissions import IsAuthenticated
import socket


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
                                         content=content, slug=slug, user_id=request.user.id)
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

    # @authentication_classes([])
    # @permission_classes([])
    @action(detail=False, methods=['POST'])
    def get_all(self, request):
        limit = request.POST.get('limit')
        if limit is not None:
            limit = int(limit)
        queryset = Blog.objects.select_related('category').select_related('user').order_by('-id').all()[:limit]
        paginator = LimitOffsetPagination()
        paginated_queryset = paginator.paginate_queryset(queryset, request)
        serializer = BlogSerializer(paginated_queryset, many=True)
        response_data = {
            'flag': 1,
            'msg': "success",
            'data': serializer.data,
            'pagination': {
                'next': paginator.get_next_link(),
                'previous': paginator.get_previous_link(),
                'count': paginator.count,
            }
        }
        return Response(response_data, status=status.HTTP_200_OK)

    @action(detail=False, methods=['POST'])
    def publish_blog(self, request):
        blog_object = Blog.objects.filter(pk=request.POST.get('id')).update(is_published=True)
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
            res = Blog.objects.filter(pk=id).delete()
            if res is not None:
                image_path = blog.image.path
                if os.path.exists(image_path):
                    os.remove(image_path)
                return Response({'flag': 1, 'msg': "Successfully Deleted"}, status=status.HTTP_200_OK)
            else:
                return Response({'msg': 'Something Went Wrong..!'}, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_200_OK)

    # @authentication_classes([])
    # @permission_classes([])
    @action(detail=False, methods=['POST'])
    def get_single_blog(self, request):
        blog_slug = request.POST.get('blog_slug')
        blog_object = Blog.objects.select_related('category').get(slug=blog_slug)
        serializer = BlogSerializer(blog_object, many=False)
        if blog_object is not None:
            return Response({'flag': 1, 'msg': "Successfully", 'data': serializer.data}, status=status.HTTP_200_OK)
        else:
            return Response({'msg': 'Something Went Wrong..!'}, status=status.HTTP_200_OK)

    @action(detail=False, methods=['POST'])
    def get_recent_popular_blogs(self, request):
        req_type = request.POST.get('req_type')
        queryset = Blog.objects.select_related('category').select_related('user').order_by('-id').all()[:5]
        serializer = BlogSerializer(queryset, many=True)
        if serializer is not None:
            return Response({'flag': 1, 'msg': "Successfully", 'data': serializer.data}, status=status.HTTP_200_OK)
        else:
            return Response({'msg': 'Something Went Wrong..!'}, status=status.HTTP_200_OK)

    @action(detail=False, methods=['POST'])
    def add_blog_comments(self, request):
        blog_id = request.POST.get('blog_id')
        blog_comment = request.POST.get('blog_comment')
        user_id = request.user.id
        ip_address = self.get_ip_address()
        record = BlogComments.objects.create(blog_id=blog_id, comment=blog_comment, user_id=user_id,
                                             ip_address=ip_address)
        # queryset = BlogComments.objects.select_related('blog').select_related('user').order_by('-id').all()[:5]
        # serializer = BlogSerializer(queryset, many=True)
        # serializer = "";
        if record is not None:
            return Response({'flag': 1, 'msg': "Successfully", 'data': None}, status=status.HTTP_200_OK)
        else:
            return Response({'msg': 'Something Went Wrong..!'}, status=status.HTTP_200_OK)

    @action(detail=False, methods=['POST'])
    def get_blog_comments(self, request):
        blog_id = request.POST.get('blog_id')
        last_id = request.POST.get('last_id')
        first_record = BlogComments.objects.filter(blog_id=blog_id).first()
        first_serializer = BlogCommentsSerializer(first_record, many=False)
        filter_condition = {'blog_id': blog_id}
        if last_id and int(last_id) != 0:
            filter_condition['id__lt'] = last_id
        queryset = BlogComments.objects.select_related('blog').filter(**filter_condition).order_by('-id')[:5]
        serializer = BlogCommentsSerializer(queryset, many=True)
        if serializer:
            return Response({'flag': 1, 'msg': "Successfully", 'data': serializer.data,'first_record':first_serializer.data},
                            status=status.HTTP_200_OK)
        else:
            return Response({'msg': 'Something Went Wrong..!'}, status=status.HTTP_200_OK)

    def get_ip_address(self):
        try:
            # This will get the local machine's IP address
            host_name = socket.gethostname()
            ip_address = socket.gethostbyname(host_name)
            return ip_address
        except socket.error as e:
            print(f"Error getting IP address: {e}")
            return None

    if __name__ == "__main__":
        ip_address = get_ip_address()
        if ip_address:
            print(f"Your IP address is: {ip_address}")
