from django.shortcuts import render
from rest_framework import viewsets, mixins, generics, filters
from rest_framework.decorators import detail_route
from rest_framework.response import Response
from rest_framework.exceptions import PermissionDenied
from api.serializers import UserSerializer, PostSerializer, ResponseSerializer, FollowSerializer
from core.models import User, Post, Follow, Response
from django.shortcuts import get_object_or_404
from django.views.decorators.csrf import csrf_exempt

# same as UserViewSet(viewsets.ModelViewSet): but without update functionality
class UserViewSet(mixins.CreateModelMixin,
                  mixins.RetrieveModelMixin,
                  mixins.DestroyModelMixin,
                  mixins.ListModelMixin,
                  viewsets.GenericViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    



    # def get_queryset(self):
    #     queryset = self.request.user.posts
        

class PostViewSet(mixins.CreateModelMixin,
                  mixins.RetrieveModelMixin,
                  mixins.DestroyModelMixin,
                  mixins.ListModelMixin,
                  viewsets.GenericViewSet):
    queryset = Post.objects.all().order_by('-created_at')
    serializer_class = PostSerializer
    filter_backends = (filters.SearchFilter,)
    search_fields = ('text',)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def check_object_permissions(self, request, post):
        if request.method != "GET" and post.user != request.user:
            raise PermissionDenied("You are not the book's owner.")
        return super().check_object_permissions(request, post)
    
    # @csrf_exempt
    # def dispatch(self, *args, **kwargs):
    #     return super(PostViewSet, self).dispatch(*args, **kwargs)
        
    # def get_queryset(self):
    #     queryset = self.request.user.user_posts

class ResponseViewSet(mixins.CreateModelMixin,
                  mixins.RetrieveModelMixin,
                  mixins.DestroyModelMixin,
                  mixins.ListModelMixin,
                  viewsets.GenericViewSet):
    queryset = Response.objects.all()
    serializer_class = ResponseSerializer


class FollowViewSet(mixins.CreateModelMixin,
                  mixins.RetrieveModelMixin,
                  mixins.DestroyModelMixin,
                  mixins.ListModelMixin,
                  viewsets.GenericViewSet):
    queryset = Follow.objects.all()
    serializer_class = FollowSerializer


# class ProfileViewSet(viewsets.ModelViewSet):
#     serializer_class = PostSerializer
    
#     def get_queryset(self):
#         queryset = self.request.user.user_posts
