from django.urls import path
from . import views

urlpatterns = [
    path('topics/', views.TopicView.as_view()),
]