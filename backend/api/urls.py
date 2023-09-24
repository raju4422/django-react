# api/urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .views import LoginViewSet,CategoryViewSet
from .views import TestViewSet

router = DefaultRouter()
router.register(r'login', LoginViewSet, basename='login')
router.register(r'category', CategoryViewSet, basename='category')





urlpatterns = [
    path('', include(router.urls)),
]
