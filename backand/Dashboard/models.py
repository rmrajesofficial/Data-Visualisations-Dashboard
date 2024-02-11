from django.db import models

# Create your models here.
class DashboardData(models.Model):
    end_year = models.CharField(max_length=10, blank=True,null=True)
    intensity = models.CharField(max_length=1024,blank=True,null=True)
    sector = models.CharField(max_length=1024,blank=True,null=True)
    topic = models.CharField(max_length=1024,blank=True,null=True)
    insight = models.CharField(max_length=1024,blank=True,null=True)
    url = models.URLField(max_length=1024,blank=True,null=True)
    region = models.CharField(max_length=1024,blank=True,null=True)
    start_year = models.CharField(max_length=4,blank=True,null=True)
    impact = models.CharField(max_length=1024, blank=True,null=True)
    added = models.CharField(max_length=1024, blank=True,null=True)
    published = models.CharField(max_length=1024, blank=True,null=True)
    country = models.CharField(max_length=1024,blank=True,null=True)
    relevance = models.CharField(max_length=1024,blank=True,null=True)
    pestle = models.CharField(max_length=1024,blank=True,null=True)
    source = models.CharField(max_length=1024,blank=True,null=True)
    title = models.CharField(max_length=2000,blank=True,null=True)
    likelihood = models.CharField(max_length=1024,blank=True,null=True)
    def __str__(self):
        return self.title