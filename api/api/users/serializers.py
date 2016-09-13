from django.contrib.auth.models import User
from rest_framework import serializers
from rest_framework.authtoken.models import Token

class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username',)

class UserAuthTokenSerializer(serializers.Serializer):
    token = serializers.CharField(required=False, allow_null=True)

    def validate(self, attrs):
        key = attrs.get('token')

        try:
            token = Token.objects.get(key=key)
            user = token.user
        except Token.DoesNotExist:
            user = None

        attrs['user'] = user
        return attrs
