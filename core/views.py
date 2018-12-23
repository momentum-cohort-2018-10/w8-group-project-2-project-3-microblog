from django.shortcuts import render, redirect
from django.contrib.auth.models import User
from django.contrib.auth.decorators import login_required
from core.models import Post, User, Follow, Response
from django_gravatar.helpers import get_gravatar_url, has_gravatar, get_gravatar_profile_url, calculate_gravatar_hash


def index(request):
    return render(request, 'index.html')

def profile(request):
    return render(request, 'profilepage.html')
