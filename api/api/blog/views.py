from . import models
from . import serializers
from django.shortcuts import render
from rest_framework import viewsets
from drf_custom_viewsets.viewsets import CustomSerializerViewSet

# Create your views here.

class PostViewSet(viewsets.ModelViewSet):
    queryset = models.Post.objects.all()
    serializer_class = serializers.PostSerializer
    custom_serializer_classes = {
        'retrieve': serializers.PostDetailSerializer,
    }

class TagViewSet(CustomSerializerViewSet, viewsets.ModelViewSet):
    queryset = models.Tag.objects.all()
    serializer_class = serializers.TagSerializer
    custom_serializer_classes = {
        'retrieve': serializers.TagDetailSerializer,
    }
