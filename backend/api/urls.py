# api/urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter

from api.views import ImageViewSet
from api.views.categoryView import CategoryViewSet
from api.views.blogView import BlogViewSet
from api.views.loginView import LoginViewSet

router = DefaultRouter()
router.register(r'login', LoginViewSet, basename='login')
router.register(r'category', CategoryViewSet, basename='category')
router.register(r'blog', BlogViewSet, basename='blog')
router.register(r'images', ImageViewSet, basename='images')


urlpatterns = [
    path('', include(router.urls)),
]
