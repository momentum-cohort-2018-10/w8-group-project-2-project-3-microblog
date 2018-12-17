from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils import timezone

# Create your models here.
class User(AbstractUser):
    users_followed = models.ManyToManyField(to='User', through='Follow', through_fields=('following_user', 'followed_user'), related_name="followers")

class Post(models.Model):
    user = models.ForeignKey(to="User", on_delete=models.CASCADE, null=True)
    text = models.CharField(max_length=280)
    created_at = models.DateTimeField(auto_now_add=True)

class Follow(models.Model):
    following_user = models.ForeignKey(to="User", on_delete=models.CASCADE, related_name="follows_from")
    followed_user = models.ForeignKey(to="User", on_delete=models.CASCADE, related_name="follows_to")

class Response(models.Model):
    user = models.ForeignKey(to="User", on_delete=models.CASCADE, null=True)
    post = models.ForeignKey(to="Post", on_delete=models.CASCADE, null=True, related_name="post_response")
    text = models.CharField(max_length=280)
    created_at = models.DateTimeField(auto_now_add=True)

