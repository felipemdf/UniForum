from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from django.db.models import Q

from apps.forum.models import *
from apps.forum.serializers import *

@permission_classes([IsAuthenticated])
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

        serializer = TopicSerializer(topics, many=True)
        
        return Response(serializer.data, status=status.HTTP_200_OK)