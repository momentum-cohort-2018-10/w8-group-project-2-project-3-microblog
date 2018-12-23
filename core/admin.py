from django.contrib import admin
from core.models import User, Post, Follow, Response


class UserAdmin(admin.ModelAdmin):
    model = User
    list_display = ("username", )


class PostAdmin(admin.ModelAdmin):
    model = Post
    list_display = (
        "user",
        "text",
    )


class ResponseAdmin(admin.ModelAdmin):
    model = Response
    list_display = (
        "user",
        "text",
        "post",
    )


class FollowAdmin(admin.ModelAdmin):
    model = Follow
    list_display = (
        "following_user",
        "followed_user",
    )


admin.site.register(User, UserAdmin)
admin.site.register(Post, PostAdmin)
admin.site.register(Response, ResponseAdmin)
admin.site.register(Follow, FollowAdmin)
