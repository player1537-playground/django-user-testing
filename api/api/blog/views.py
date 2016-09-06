from . import models
from . import serializers
from django.shortcuts import render
from drf_custom_viewsets.viewsets import CustomSerializerViewSet
from rest_framework import viewsets
from rest_framework.pagination import PageNumberPagination
from rest_framework_extensions import mixins

# Create your views here.

class PostViewSet(mixins.NestedViewSetMixin, viewsets.ModelViewSet):
    queryset = models.Post.objects.all()
    serializer_class = serializers.PostSerializer
    custom_serializer_classes = {
        'retrieve': serializers.PostDetailSerializer,
    }
    pagination_class = PageNumberPagination

class TagViewSet(mixins.NestedViewSetMixin, CustomSerializerViewSet, viewsets.ModelViewSet):
    queryset = models.Tag.objects.all()
    serializer_class = serializers.TagSerializer
    custom_serializer_classes = {
        'retrieve': serializers.TagDetailSerializer,
    }
