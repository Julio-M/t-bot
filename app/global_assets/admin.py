from django.contrib import admin
from .models import Asset

# Register your models here.

class AssetAdmin(admin.ModelAdmin):
    list_display = ('name', 'ticker','logo')


admin.site.register(Asset, AssetAdmin)
