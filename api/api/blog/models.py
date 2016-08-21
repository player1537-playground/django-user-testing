from django.db import models

# Create your models here.

class Post(models.Model):
    title = models.CharField(
        max_length=225,
    )

    content = models.TextField(
        max_length=10000,
    )

    published = models.BooleanField(
        default=False,
    )

    created_date = models.DateTimeField(
        auto_now_add=True,
    )

    modified_date = models.DateTimeField(
        auto_now=True,
    )

    tag = models.ForeignKey(
        'blog.Tag',
        related_name='posts',
        on_delete=models.CASCADE,
    )

    def __str__(self):
        return self.title

class Tag(models.Model):
    title = models.CharField(
        max_length=256,
        blank=True,
    )

    created_date = models.DateTimeField(
        auto_now_add=True,
    )

    modified_date = models.DateTimeField(
        auto_now=True,
    )

    def __str__(self):
        return self.title
