
from rest_framework import status
from rest_framework.decorators import action
from rest_framework.pagination import LimitOffsetPagination
from rest_framework.response import Response
from rest_framework.viewsets import ViewSet

from api.models import Blog
from api.serializers import BlogSerializer


class PublicViewSet(ViewSet):

    @action(detail=False, methods=['POST'])
    def get_all_blogs(self, request):
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

