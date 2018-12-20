from django.shortcuts import render, redirect
from django.contrib.auth.models import User
from django.contrib.auth.decorators import login_required
from core.models import Post, User, Follow, Response
from django_gravatar.helpers import get_gravatar_url, has_gravatar, get_gravatar_profile_url, calculate_gravatar_hash




def index(request):
    return render(request, 'index.html')


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


@login_required
def test_vue(request):
    return render(request, 'test_vue.html')


# def gravatar(request):
#     url = get_gravatar_url('alice@example.com', size=150)
#     gravatar_exists = has_gravatar('bob@example.com')
#     profile_url = get_gravatar_profile_url('alice@example.com')
#     email_hash = calculate_gravatar_hash('alice@example.com')