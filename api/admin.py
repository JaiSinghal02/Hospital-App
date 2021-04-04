from django.contrib import admin

from .models import Patient

class PatientAdmin(admin.ModelAdmin):
    list_display=['date','slotTime','name']
admin.site.register(Patient, PatientAdmin)
