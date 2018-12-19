from django.shortcuts import render, redirect
from django.contrib.auth.models import User
from core.models import Post, User, Follow, Response



def index(request):
    posts = Post.objects.all()
    return render(request, 'index.html', {
        'posts': posts,
    })