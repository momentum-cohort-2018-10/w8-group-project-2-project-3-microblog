from django.shortcuts import render, redirect
from django.contrib.auth.models import User
from django.contrib.auth.decorators import login_required
from core.models import Post, User, Follow, Response
from django_gravatar.helpers import get_gravatar_url, has_gravatar, get_gravatar_profile_url, calculate_gravatar_hash


def index(request):
    posts = Post.objects.all()
    return render(request, 'index.html', {
        'posts': posts,
    })


@login_required
def test_vue(request):
    return render(request, 'test_vue.html')


# def gravatar(request):
#     url = get_gravatar_url('alice@example.com', size=150)
#     gravatar_exists = has_gravatar('bob@example.com')
#     profile_url = get_gravatar_profile_url('alice@example.com')
#     email_hash = calculate_gravatar_hash('alice@example.com')