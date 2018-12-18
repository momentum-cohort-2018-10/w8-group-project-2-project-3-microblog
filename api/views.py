from django.shortcuts import render
from rest_framework import viewsets, mixins
from rest_framework.decorators import detail_route
from rest_framework.response import Response
from api.serializers import UserSerializer, PostSerializer, ResponseSerializer
from core.models import User, Post, Follow, Response

# same as UserViewSet(viewsets.ModelViewSet): but without update functionality
class UserViewSet(mixins.CreateModelMixin,
                  mixins.RetrieveModelMixin,
                  mixins.DestroyModelMixin,
                  mixins.ListModelMixin,
                  viewsets.GenericViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class PostViewSet(mixins.CreateModelMixin,
                  mixins.RetrieveModelMixin,
                  mixins.DestroyModelMixin,
                  mixins.ListModelMixin,
                  viewsets.GenericViewSet):
    queryset = Post.objects.all()
    serializer_class = PostSerializer

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class ResponseViewSet(mixins.CreateModelMixin,
                  mixins.RetrieveModelMixin,
                  mixins.DestroyModelMixin,
                  mixins.ListModelMixin,
                  viewsets.GenericViewSet):
    queryset = Response.objects.all()
    serializer_class = ResponseSerializer

    # @detail_route(methods=['GET'])
    # def responses(self, request, pk=None):
    #     post = self.get_object()
    #     serializer = ResponseSerializer(post.post_response.all(), many=True)
    #     return Response(serializer.data)
