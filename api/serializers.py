from rest_framework import serializers
from core.models import User, Post, Follow, Response


class FollowSerializer(serializers.ModelSerializer):
    class Meta:
        model = Follow
        fields = ('followed_user', 'following_user', 'pk')
        # fields = ('__all__')


class UserSerializer(serializers.ModelSerializer):
    url = serializers.HyperlinkedIdentityField(read_only=True, view_name="core:user-detail")
    users_followed = serializers.SlugRelatedField(slug_field="username", many=True, read_only=True)
    followers = serializers.SlugRelatedField(slug_field="username", many=True, read_only=True)

    class Meta:
        model = User
        fields = ('username', 'url', 'email', 'users_followed', 'followers', 'bio', 'pk',)


class ResponseSerializer(serializers.ModelSerializer):
    user = serializers.SlugRelatedField(slug_field="username", queryset=User.objects.all())
    url = serializers.HyperlinkedIdentityField(view_name='core:response-detail')

    class Meta:
        model = Response
        fields = ('user', 'text', 'url', 'post', 'created_at', 'pk')


class PostSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    post_url = serializers.HyperlinkedIdentityField(view_name="core:post-detail")
    post_response = ResponseSerializer(read_only=True, many=True,)

    class Meta:
        model = Post
        fields = ('text', 'post_url', 'user',  'created_at', 'post_response', 'pk')
