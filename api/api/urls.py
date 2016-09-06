"""api URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.10/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from . import views
from django.conf import settings
from django.conf.urls import url, include
from django.contrib import admin

urlpatterns = [
    # url(r'^' + settings.BASE_URL + 'blog/', include(router.urls)),
    url(r'^' + settings.BASE_URL + 'blog/', include('blog.urls', namespace='blog')),
    url(r'^' + settings.BASE_URL + 'users/', include('users.urls', namespace='users')),
    url(r'^' + settings.BASE_URL + 'admin/', admin.site.urls),
    url(r'^' + settings.BASE_URL, views.api_root),
]
