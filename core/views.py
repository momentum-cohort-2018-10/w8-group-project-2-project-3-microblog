from django.shortcuts import render, redirect
from django.contrib.auth.models import User
from core.models import Post, User, Follow, Response
from django.contrib.auth.views import login_required
from django.http import Http404
from django.contrib.auth import authenticate, login



def index(request):
    posts = Post.objects.all()
    return render(request, 'index.html', {
        'posts': posts,
    })

# @login_required
def profile(request):
    posts = Post.objects.all()
    user_posts = []
    if request.user.is_authenticated:
        user_posts = request.user.user_posts.all()
    return render(request, 'profilepage.html', {
        'posts': posts,
        'user_posts': user_posts,

    })


def test_vue(request):
    return render(request, 'test_vue.html')