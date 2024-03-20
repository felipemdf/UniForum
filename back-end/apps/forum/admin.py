from django.contrib import admin
from .models import *

@admin.register(Topic)
class TopicAdmin(admin.ModelAdmin):
    list_display = [field.name for field in Topic._meta.fields]
    list_filter = [field.name for field in Topic._meta.fields if field.get_internal_type() == 'CharField']
    search_fields = [field.name for field in Topic._meta.fields if field.get_internal_type() == 'CharField']
