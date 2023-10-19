# api/urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .views import LoginViewSet, CategoryViewSet, BlogViewSet
from .views import TestViewSet
from rest_framework.urlpatterns import format_suffix_patterns


router = DefaultRouter()
router.register(r'login', LoginViewSet, basename='login')
router.register(r'category', CategoryViewSet, basename='category')
router.register(r'category/update_category/<int:pk>', CategoryViewSet.as_view({'post': 'update_category'}), basename='update_category')

router.register(r'blog', BlogViewSet, basename='blog')



urlpatterns = [
    path('', include(router.urls)),
]
urlpatterns = format_suffix_patterns(urlpatterns)

