from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.db.models import Q

from apps.forum.models import *
from apps.forum.serializers import *

from django.http import JsonResponse

class TopicView(APIView):

    def get(self, request, *args, **kwargs):
        search_query = request.GET.get('search')
        course = request.GET.get('course')
        tag = request.GET.get('tag')
        
        filters = Q()
        filters &= Q(course=course) if course else Q()
        filters &= Q(tag=tag) if tag else Q()
        filters &= Q(title__icontains=search_query) if search_query else Q()

        topics = Topic.objects.filter(filters)

        topics_dto = []
        for topic in topics:
            # Criar o DTO
            topic_dto = {
                'id': topic.id,
                'id_author': topic.id_author.id,  
                'title': topic.title,
                'content': topic.content[:20],  
                'tag': topic.tag,
                'course': topic.course,
                'qt_likes': topic.qt_likes,
                'qt_comments': topic.qt_comments,
                'created_at': topic.created_at.strftime('%Y-%m-%d %H:%M:%S'),  
            }
            
            topics_dto.append(topic_dto)
            
        return JsonResponse(topics_dto, safe=False)