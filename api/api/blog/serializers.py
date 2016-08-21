from rest_framework import serializers
from rest_framework_extensions import fields
from . import models

class TagSerializer(serializers.ModelSerializer):
    resource_uri = fields.ResourceUriField(
        view_name='tag-detail',
        read_only=True,
    )

    class Meta:
        model = models.Tag
        exclude = ('created_date', 'modified_date',)

class PostSerializer(serializers.ModelSerializer):
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

    tag = TagSerializer(
    )

    resource_uri = fields.ResourceUriField(
        view_name='post-detail',
        read_only=True,
    )

    class Meta:
        model = models.Post
        fields = ('id', 'resource_uri', 'title', 'content', 'published',
                  'created_date', 'modified_date', 'tag',)

    def create(self, validated_data):
        print('>>>>>>>>>>>>>')
        tag_data = validated_data.pop('tag')
        tag_title = tag_data.pop('title')
        print('>>>>>>>', tag_data)
        tag, _ = models.Tag.objects.get_or_create(
            defaults=tag_data,
            title__exact=tag_title,
        )
        post = models.Post.objects.create(**validated_data, tag=tag)
        return post

class TagDetailSerializer(TagSerializer):
    posts = PostSerializer(
        many=True,
        read_only=True,
    )

    class Meta(TagSerializer.Meta):
        exclude = ()

class PostDetailSerializer(PostSerializer):
    class Meta(PostSerializer.Meta):
        fields = ('id', 'resource_uri', 'title', 'content', 'published',
                  'created_date', 'modified_date', 'tag',)
