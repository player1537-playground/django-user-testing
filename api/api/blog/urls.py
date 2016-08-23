from rest_framework import routers
from rest_framework_extensions.routers import ExtendedDefaultRouter
from . import views

router = ExtendedDefaultRouter()

router.register(r'posts', views.PostViewSet, base_name='post')
router.register(r'tags', views.TagViewSet, base_name='tag') \
      .register(r'posts', views.PostViewSet, base_name='tag-post',
                parents_query_lookups=['tag__title'])

for url in router.urls:
    print(url)

urlpatterns = router.urls
