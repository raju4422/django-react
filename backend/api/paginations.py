from rest_framework import pagination, serializers
from rest_framework.pagination import LimitOffsetPagination

from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response


class CustomPagination(pagination.PageNumberPagination):
    page_size = 8

    def get_paginated_response(self, data):
        return Response({
            'flag': 1,
            'links': {
                'next': self.get_next_link(),
                'previous': self.get_previous_link()
            },
            'total_pages': self.page.paginator.num_pages,
            'count': self.page.paginator.count,
            'data': data,
            'page_size': self.page_size
        })
