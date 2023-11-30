# api/urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter

from api.views import ImageViewSet
from api.views.UserManagementView import UserViewSet
from api.views.UserManagementView import RoleViewSet
from api.views.UserManagementView import PermissionViewSet
from api.views.categoryView import CategoryViewSet
from api.views.blogView import BlogViewSet
from api.views.loginView import LoginViewSet

router = DefaultRouter()
router.register(r'login', LoginViewSet, basename='login')
router.register(r'category', CategoryViewSet, basename='category')
router.register(r'blog', BlogViewSet, basename='blog')
router.register(r'images', ImageViewSet, basename='images')
router.register(r'users', UserViewSet, basename='users')
router.register(r'roles', RoleViewSet, basename='roles')
router.register(r'permissions', PermissionViewSet, basename='permissions')



urlpatterns = [
    path('', include(router.urls)),
]
