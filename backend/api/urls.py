# api/urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter

# from .views import LoginViewSet, CategoryViewSet, BlogViewSet
from api.views.categoryView import CategoryViewSet
from api.views.blogView import BlogViewSet



router = DefaultRouter()
# router.register(r'login', LoginViewSet, basename='login')
router.register(r'category', CategoryViewSet, basename='category')
router.register(r'blog', BlogViewSet, basename='blog')


urlpatterns = [
    path('', include(router.urls)),
]

