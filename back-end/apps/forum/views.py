from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.db.models import Q, F

from apps.forum.models import *
from apps.forum.serializers import *

from django.http import JsonResponse

class TopicView(APIView):

    def get(self, request, *args, **kwargs):
        search_query = request.GET.get('search')
        course = request.GET.get('course')
        tag = request.GET.get('tag')
        
        # filters = Q()
        # filters &= Q(course=course) if course else Q()
        # filters &= Q(tag=tag) if tag else Q()
        # filters &= Q(title__icontains=search_query) if search_query else Q()

        topics = (
            Topic.objects
            # .filter(filters)
            .select_related('id_author')
            .values(
                'id',
                'title',
                'tag',
                'course',
                preview=F('content'),
                qtLikes=F('qt_likes'),
                qtComments=F('qt_comments'),
                createdAt=F('created_at'),
                username=F('id_author__username'),
                photo=F('id_author__photo'),
            )
        )
            
        return JsonResponse(list(topics), safe=False)