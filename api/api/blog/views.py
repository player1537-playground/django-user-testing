from . import models
from . import serializers
from django.shortcuts import render
from rest_framework import viewsets
from rest_framework_extensions import mixins

# Create your views here.

class PostViewSet(viewsets.ModelViewSet):
    queryset = models.Post.objects.all()
    serializer_class = serializers.PostSerializer

class TagViewSet(mixins.DetailSerializerMixin, viewsets.ModelViewSet):
    queryset = models.Tag.objects.all()
    serializer_class = serializers.TagSerializer
    serializer_detail_class = serializers.TagDetailSerializer
