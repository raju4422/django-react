# api/urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .views import LoginViewSet
from .views import TestViewSet

router = DefaultRouter()
router.register(r'login', LoginViewSet, basename='login')


urlpatterns = [
    path('', include(router.urls)),
]
