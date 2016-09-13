from . import views
from django.conf.urls import url
from rest_framework import routers

router = routers.DefaultRouter()
router.register(r'profile', views.UserProfileViewSet)
router.register(r'login', views.UserLoginViewSet, base_name='login')
router.register(r'authCheck', views.UserAuthCheckViewSet, base_name='authcheck')

urlpatterns = router.urls
