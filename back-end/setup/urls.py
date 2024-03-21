from django.urls import path, include
from django.contrib import admin

from apps.forum.urls import urlpatterns as forumUrls
from apps.account.urls import urlpatterns as accountUrls

urlpatterns = [
    path("admin/", admin.site.urls),
    path('api/', include(forumUrls)),
    path('api/', include(accountUrls)),
]
