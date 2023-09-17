from django.db import models
from django.utils.timezone import now

class Listing(models.Model):
    slug = models.CharField(max_length=225,unique=True)
    title = models.CharField(max_length=225)
    text = models.TextField(blank=False)
    is_published = models.BooleanField(default=now)
    list_date = models.DateTimeField(default=now,blank=True)
    
    def __str__(self):
        return self.title
    