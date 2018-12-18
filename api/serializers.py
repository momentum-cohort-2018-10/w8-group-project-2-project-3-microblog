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

class UserSerializer(serializers.ModelSerializer):
    user_url = serializers.HyperlinkedIdentityField(view_name="api:user-detail")
    # I may have gotten these next two backwards. I will fix this when we have data to compare
    follows_from = FollowingSerializer(many=True, read_only=True)
    follows_to = FollowedSerializer(many=True, read_only=True)

    class Meta:
        model = User
        fields = ('username', 'user_url', 'follows_from', 'follows_to')

class ResponseSerializer(serializers.ModelSerializer):
    user = serializers.SlugRelatedField(slug_field="username", queryset=User.objects.all())
    comment_url = serializers.HyperlinkedIdentityField(view_name='api:comment-detail')

    class Meta:
        model = Response
        fields = ('user', 'comment_url', 'post')

class PostSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    post_url = serializers.HyperlinkedIdentityField(view_name="api:post-detail")

    class Meta:
        model = Post
        fields = ('user', 'post_url', 'text', 'created_at')
