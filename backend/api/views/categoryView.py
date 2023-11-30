from rest_framework import status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.viewsets import ViewSet
from api.models import Category
from api.serializers import CategorySerializer, DeleteCategorySerializer


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
