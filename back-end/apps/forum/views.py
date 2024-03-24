from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.db.models import Q, F

from apps.forum.models import *
from apps.forum.serializers import *

from django.http import JsonResponse

class TopicView(APIView):

    def get(self, request, *args, **kwargs):
        courses_str = request.GET.get('courses')
        courses = [int(course_id) for course_id in courses_str.split(',')] if courses_str else []

        tags_str = request.GET.get('tags')
        tags = [int(tag_id) for tag_id in tags_str.split(',')] if tags_str else []

        search = request.GET.get('search')
        # orderBy = request.GET.get('orderBy')
        orderBy = '-qt_likes' if request.GET.get('orderBy') == 'melhores' else '-created_at'

        filters = Q()
        filters &= Q(course__in=courses) if courses else Q()
        filters &= Q(tag__in=tags) if tags else Q()
        filters &= Q(title__icontains=search) if search else Q()



        topics = (
            Topic.objects
            .filter(filters)
            .order_by(orderBy)
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
        print(topics.query)            

        for topic in topics:
            topic['course'] = dict(COURSE_CHOICES).get(topic['course'])
            topic['tag'] = dict(TAG_CHOICES).get(topic['tag'])

        return JsonResponse(list(topics), safe=False)