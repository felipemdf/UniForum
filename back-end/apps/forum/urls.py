from django.urls import path
from . import views

urlpatterns = [
    path('topic', views.TopicView.as_view()),
]