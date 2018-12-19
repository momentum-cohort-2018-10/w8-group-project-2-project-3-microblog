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



def post_list(request,
    template='post_list.html',
    page_template='index.html'):
    context = {
        'post_list': Post.objects.all(),
        'page_template': page_template,
    }
    if request.is_ajax():
        template = page_template
    return render(request, template, context)

def test_vue(request):
    return render(request, 'test_vue.html')