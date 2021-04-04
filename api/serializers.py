from rest_framework import serializers
from .models import Patient

class PatientSerializer(serializers.ModelSerializer):
    class Meta:
        model= Patient
        fields='__all__'
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model= Patient
        fields= ('name','phone_number','email','address','pincode','city','state',)
class SlotTimeSerializer(serializers.ModelSerializer):
    class Meta:
        model= Patient
        fields= ('slotTime',)
class BookingSerializer(serializers.ModelSerializer):
    class Meta:
        model= Patient
        fields= ('slotTime','date',)