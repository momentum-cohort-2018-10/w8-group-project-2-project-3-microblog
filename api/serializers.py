from rest_framework import serializers
from core.models import User, Post, Follow, Response

class FollowedSerializer(serializers.ModelSerializer):
    following_user = serializers.SlugRelatedField(slug_field="username", queryset=User.objects.all())

    class Meta:
        model = Follow
        fields = ('following_user',)

class FollowingSerializer(serializers.ModelSerializer):
    followed_user = serializers.SlugRelatedField(slug_field="username", queryset=User.objects.all())

    class Meta:
        model = Follow
        fields = ('followed_user',)

class UserSerializer(serializers.HyperlinkedModelSerializer):
    url = serializers.HyperlinkedIdentityField(read_only=True, view_name="core:user-detail")
    follows_from = FollowingSerializer(many=True, read_only=True)
    follows_to = FollowedSerializer(many=True, read_only=True)

    class Meta:
        model = User
        fields = ('username', 'url', 'follows_from', 'follows_to')

class ResponseSerializer(serializers.ModelSerializer):
    user = serializers.SlugRelatedField(slug_field="username", queryset=User.objects.all())
    url = serializers.HyperlinkedIdentityField(view_name='core:response-detail')

    class Meta:
        model = Response
        fields = ('user', 'post', 'text', 'url')

class PostSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    post_url = serializers.HyperlinkedIdentityField(view_name="core:post-detail")
    post_response = ResponseSerializer(read_only=True, many=True,)

    class Meta:
        model = Post
        fields = ('user', 'post_url', 'text', 'created_at', 'post_response')
