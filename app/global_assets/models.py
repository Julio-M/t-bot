from django.db import models

class Asset(models.Model):
    name = models.CharField(max_length=30,unique=True)
    ticker = models.CharField(max_length=30,unique=True)
    logo = models.CharField(max_length=500,unique=True)

    class Meta:
        ordering = ['name', 'ticker','logo']