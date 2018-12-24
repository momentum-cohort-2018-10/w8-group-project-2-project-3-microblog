from django.shortcuts import render
from rest_framework import viewsets, mixins, generics, filters
from rest_framework.decorators import detail_route
from rest_framework.response import Response
from rest_framework.exceptions import PermissionDenied
from api.serializers import UserSerializer, PostSerializer, ResponseSerializer, FollowSerializer
from core.models import User, Post, Follow, Response
from django.shortcuts import get_object_or_404
from django_filters.rest_framework import DjangoFilterBackend
from django.views.decorators.csrf import csrf_exempt
from django.db.models import Count

# same as UserViewSet(viewsets.ModelViewSet): but without update functionality
class UserViewSet(mixins.CreateModelMixin,
                  mixins.RetrieveModelMixin,
                  mixins.DestroyModelMixin,
                  mixins.ListModelMixin,
                  viewsets.GenericViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    filter_backends = (filters.SearchFilter, )
    search_fields = ('username', )

    # def get_follower_count(self):
    #     # queryset= User.objects.all()
    #     queryset= self.request.user
    #     queryset= queryset.annotate(num_of_followers=Count('followers'))

    # def get_following_count(self):
    #     queryset= self.request.user
    #     queryset= queryset.annotate(num_of_followers=Count('following'))

    # def get_queryset(self):
    #     queryset = self.request.user
    #     queryset= queryset.annotate(num_of_followers=Count('following'))
        

class PostViewSet(mixins.CreateModelMixin,
                  mixins.RetrieveModelMixin,
                  mixins.DestroyModelMixin,
                  mixins.ListModelMixin,
                  viewsets.GenericViewSet):
    queryset = Post.objects.all().order_by('-created_at')
    serializer_class = PostSerializer
    filter_backends = (filters.SearchFilter, )
    search_fields = ('text', )

    # def get_queryset(self):
    #     if self.kwargs.get('username'):
    #         username = self.kwargs['username']
    #         user = get_object_or_404(User, username=username)
    #         return user.post.all()

    #     return self.request.user.posts.all()

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def check_object_permissions(self, request, post):
        if request.method != "GET" and post.user != request.user:
            raise PermissionDenied("You are not the owner!!")
        return super().check_object_permissions(request, post)
    

class ResponseViewSet(mixins.CreateModelMixin,
                  mixins.RetrieveModelMixin,
                  mixins.DestroyModelMixin,
                  mixins.ListModelMixin,
                  viewsets.GenericViewSet):
    queryset = Response.objects.all()
    serializer_class = ResponseSerializer

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    # def check_object_permissions(self, request, response):
    #     if request.method != "GET" and response.user != request.user:
    #         raise PermissionDenied("You are not the owner!!")
    #     return super().check_object_permissions(request, response)

class FollowViewSet(mixins.CreateModelMixin,
                  mixins.RetrieveModelMixin,
                  mixins.DestroyModelMixin,
                  mixins.ListModelMixin,
                  viewsets.GenericViewSet):
    queryset = Follow.objects.all()
    serializer_class = FollowSerializer
    filter_backends = (DjangoFilterBackend, )
    filter_fields = ('followed_user', 'following_user', )

    def perform_create(self, serializer):
        serializer.save(following_user=self.request.user)