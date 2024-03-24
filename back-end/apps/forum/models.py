from django.db import models
from share.choices import *

from apps.account.models import User

class Topic(models.Model):
    id = models.BigAutoField(primary_key=True)
    id_author = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=120)
    content = models.TextField()
    tag = models.IntegerField(choices=TAG_CHOICES)
    course = models.IntegerField(choices=COURSE_CHOICES)
    qt_likes = models.IntegerField()
    qt_comments = models.IntegerField()
    created_at = models.DateTimeField(auto_now_add = True)
    updated_at = models.DateTimeField(auto_now = True)
    

class Comment(models.Model):
    id = models.BigAutoField(primary_key=True)
    id_topic = models.ForeignKey(Topic ,on_delete=models.CASCADE)
    id_user = models.ForeignKey(User, on_delete=models.CASCADE)
    content = models.TextField()
    qt_likes = models.IntegerField()
    created_at = models.DateTimeField(auto_now_add = True)
    updated_at = models.DateTimeField(auto_now = True)

class Like_Topic(models.Model):
    id = models.BigAutoField(primary_key=True)
    id_topic = models.ForeignKey(Topic ,on_delete=models.CASCADE)
    id_user = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add = True)
    updated_at = models.DateTimeField(auto_now = True)

class Like_comment(models.Model):
    id = models.BigAutoField(primary_key=True)
    id_topic = models.ForeignKey(Topic ,on_delete=models.CASCADE)
    id_user = models.ForeignKey(User, on_delete=models.CASCADE)
    id_comment = models.OneToOneField(Comment, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add = True)
    updated_at = models.DateTimeField(auto_now = True)
    
