from django.contrib.auth.models import User
from rest_framework import viewsets
from django.shortcuts import render
from . import serializers

# Create your views here.
class UserViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = User.objects.all()
    serializer_class = serializers.UserSerializer
