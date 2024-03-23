from django.contrib.auth.models import AbstractUser
from django.db import models
from share.choices import *

class User(AbstractUser):
    matriculation = models.CharField(max_length=30, blank=False)
    course = models.CharField(max_length=100, choices=COURSE_CHOISES, blank=False)
    photo = models.TextField(blank=True, null=True)
    sex = models.CharField(max_length=30, choices=SEX_CHOICES)
    created_at = models.DateTimeField(auto_now_add = True)
    updated_at = models.DateTimeField(auto_now = True)
