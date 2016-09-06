from rest_framework import serializers
from rest_framework_extensions import fields
from rest_framework_extensions.utils import compose_parent_pk_kwarg_name
from . import models

class TagSerializer(serializers.ModelSerializer):
    resource_uri = fields.ResourceUriField(
        view_name='blog:tag-detail',
        read_only=True,
    )

    posts = serializers.HyperlinkedIdentityField(
        read_only=True,
        view_name='blog:tag-post-list',
        lookup_url_kwarg=compose_parent_pk_kwarg_name('tag__title'),
        lookup_field='title',
    )

    class Meta:
        model = models.Tag
        exclude = ()

    def create(self, validated_data):
        print('Tag.create', validated_data)
        return models.Tag.objects.create(**validated_data)

class PostSerializer(serializers.ModelSerializer):
    resource_uri = fields.ResourceUriField(
        view_name='blog:post-detail',
        read_only=True,
    )

    owner = serializers.CharField(
        read_only=True,
        source='owner.username',
    )

    title = serializers.CharField(
        label='Post Title',
        help_text='The title that you want your post to be displayed with',
        max_length=225,
    )

    content = serializers.CharField(
        label='Post Content',
        help_text='The content of your post',
        max_length=10000,
    )

    published = serializers.BooleanField(
        initial=False,
    )

    created_date = serializers.DateTimeField(
        read_only=True,
    )

    modified_date = serializers.DateTimeField(
        read_only=True,
    )

    tag = serializers.CharField(
        source='tag.title',
    )

    class Meta:
        model = models.Post
        exclude = ()

    def create(self, validated_data):
        print('Post.create', validated_data)
        tag_data = validated_data.pop('tag')
        tag_title = tag_data.pop('title')
        tag, _ = models.Tag.objects.get_or_create(
            title=tag_title,
            defaults=tag_data,
        )
        post = models.Post.objects.create(**validated_data, tag=tag)
        return post

    def update(self, instance, validated_data):
        print('Post.update', instance, validated_data)
        tag_data = validated_data.pop('tag')
        tag_title = tag_data.pop('title')
        tag, _ = models.Tag.objects.get_or_create(
            title=tag_title,
            defaults=tag_data,
        )
        instance.tag = tag
        return super().update(instance, validated_data)
