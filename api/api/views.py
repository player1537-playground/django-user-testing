from django.shortcuts import render
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from django.views.generic import TemplateView
from httpproxy.views import HttpProxy

@method_decorator(csrf_exempt, name='dispatch')
class WebpackSockJSView(HttpProxy):
    base_url = 'http://localhost:3000'

@method_decorator(csrf_exempt, name='dispatch')
class WebpackMainView(HttpProxy):
    base_url = 'http://localhost:3000/webpack'
