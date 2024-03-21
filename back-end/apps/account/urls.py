from django.urls import path
from .views import LoginView
from rest_framework_simplejwt.views import TokenRefreshView, TokenBlacklistView

urlpatterns = [
    path('auth/token', LoginView.as_view()),
    # path('auth/token/revoke', TokenBlacklistView.as_view(), name='token_blacklist'),
    # path('auth/token/refresh', TokenRefreshView.as_view()),
]