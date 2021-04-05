from django.db import models
from django.contrib.auth.models import User
from django.conf import settings
from django.dispatch import receiver
from django.db.models.signals import post_save
from rest_framework.authtoken.models import Token
User._meta.get_field('email')._unique = True

class Patient(models.Model):
    user=models.OneToOneField(User,on_delete=models.CASCADE)
    # date=models.DateField(null=True)
    # slotTime=models.CharField(max_length=20,null=True)
    slot=models.JSONField(default={}) #will store (date,time) as key value pairs
    name=models.CharField(max_length=50)
    email=models.EmailField(max_length=254,default="jai@gmail.com")
    address=models.TextField(max_length=400, default="as")
    pincode=models.PositiveIntegerField(default="234")
    phone_number=models.CharField(null=True,max_length=10)
    city=models.CharField(max_length=50,null=True)
    state=models.CharField(max_length=50,null=True)

@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_auth_token(sender, instance=None, created=False,**kwargs):
    if created:
        Token.objects.create(user=instance)
@receiver(post_save, sender=User)
def create_user_patient(sender, instance,created,**kwargs):
    if created:
        Patient.objects.create(user=instance)
@receiver(post_save, sender=User)
def save_user_patient(sender, instance,**kwargs):
    instance.patient.save()
    



