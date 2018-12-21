"""tweeter URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib.auth.views import (
    PasswordResetView,
    PasswordResetDoneView,
    PasswordResetConfirmView,
    PasswordResetCompleteView,
)
from django.contrib import admin
from django.conf import settings
from django.views.generic import TemplateView
from django.urls import path, include
from core import views
from rest_framework import routers
from api import views as api_views
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

# Router for api url's
router = routers.DefaultRouter()
router.register('users', api_views.UserViewSet)
router.register('posts', api_views.PostViewSet)
router.register('responses', api_views.ResponseViewSet)
router.register('follows', api_views.FollowViewSet)

urlpatterns = [
    path('api/', include((router.urls, 'core'), namespace='api')),
    path('profile/', views.profile, name='profile'),
    path('admin/', admin.site.urls),
    path('accounts/', include('allauth.urls')),
    path('', views.index, name='home'),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path(
        'register/',
        TemplateView.as_view(template_name='register.html'),
        name='register'),
    path(
        'accounts/password/reset/',
        PasswordResetView.as_view(
            template_name='registration/password_reset_form.html'),
        name="password_reset"),
    path(
        'accounts/password/reset/done/',
        PasswordResetDoneView.as_view(
            template_name='registration/password_reset_done.html'),
        name="password_reset_done"),
    path(
        'accounts/password/reset/<uidb64>/<token>/',
        PasswordResetConfirmView.as_view(
            template_name='registration/password_reset_confirm.html'),
        name="password_reset_confirm"),
    path(
        'accounts/password/done/',
        PasswordResetCompleteView.as_view(
            template_name='registration/password_reset_complete.html'),
        name="password_reset_complete"),
    path(
        'about/',
        TemplateView.as_view(template_name='about.html'),
        name='about'),
    path('accounts/', include('registration.backends.simple.urls')),
]

if settings.DEBUG:
    import debug_toolbar
    urlpatterns = [
        path('__debug__/', include(debug_toolbar.urls)),
    ] + urlpatterns