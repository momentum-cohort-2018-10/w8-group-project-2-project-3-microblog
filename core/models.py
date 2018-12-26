from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils import timezone


class User(AbstractUser):
    users_followed = models.ManyToManyField(
        to='User',
        through='Follow',
        through_fields=('following_user', 'followed_user'),
        related_name="followers")
    bio = models.CharField(max_length=280, null=True)


class Post(models.Model):
    user = models.ForeignKey(to="User", on_delete=models.CASCADE, null=True, related_name="user_posts")
    text = models.CharField(max_length=280)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.text

    # def save(self, *args, **kwargs):
    #     super().save(*args, **kwargs)

class Follow(models.Model):
    following_user = models.ForeignKey(
        to="User", on_delete=models.CASCADE, related_name="follows_from")
    followed_user = models.ForeignKey(
        to="User", on_delete=models.CASCADE, related_name="follows_to")
    
    class Meta:
        unique_together = ("following_user", "followed_user")

    # def save(self, *args, **kwargs):
    #     if self.followed_user == self.following_user:
    #         raise 
    #     super().save(*args, **kwargs)

class Response(models.Model):
    user = models.ForeignKey(to="User", on_delete=models.CASCADE, null=True)
    post = models.ForeignKey(
        to="Post",
        on_delete=models.CASCADE,
        null=True,
        related_name="post_response")
    text = models.CharField(max_length=280)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.text