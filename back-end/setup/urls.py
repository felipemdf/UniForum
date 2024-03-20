from django.urls import path, include
from django.contrib import admin
from apps.forum.urls import urlpatterns as forumUrls

urlpatterns = [
    path("admin/", admin.site.urls),
    path('api/', include(forumUrls)),
]
