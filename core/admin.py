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


# Register your models here.

admin.site.register(User, UserAdmin)
admin.site.register(Post, PostAdmin)
