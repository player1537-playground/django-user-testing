from . import models
from . import permissions
from . import serializers
from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.pagination import PageNumberPagination
from rest_framework_extensions import mixins

# Create your views here.

class PostViewSet(mixins.NestedViewSetMixin,
                  viewsets.ModelViewSet):
    queryset = models.Post.objects.all()
    serializer_class = serializers.PostSerializer
    pagination_class = PageNumberPagination
    permission_classes = (permissions.BlogPermission,)

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

class TagViewSet(mixins.NestedViewSetMixin,
                 viewsets.ReadOnlyModelViewSet):
    queryset = models.Tag.objects.all()
    serializer_class = serializers.TagSerializer
