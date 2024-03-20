from rest_framework import serializers
from .models import *

class LikeCommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Like_comment
        fields = '__all__'

class LikeTopicSerializer(serializers.ModelSerializer):
    class Meta:
        model = Like_Topic
        fields = '__all__'

class CommentSerializer(serializers.ModelSerializer):
    likes = LikeCommentSerializer(many=True, read_only=True)

    class Meta:
        model = Comment
        fields = '__all__'

class TopicSerializer(serializers.ModelSerializer):
    comments = CommentSerializer(many=True, read_only=True)
    likes = LikeTopicSerializer(many=True, read_only=True)

    class Meta:
        model = Topic
        fields = '__all__'
