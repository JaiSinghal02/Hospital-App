from django.shortcuts import render
from django.http import HttpResponse
from .serializers import PatientSerializer
from .serializers import UserSerializer
from .serializers import SlotTimeSerializer
from .serializers import BookingSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Patient
from django.http import JsonResponse
from rest_framework import status
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated,IsAdminUser
from django.contrib.auth.models import User,auth
from rest_framework.authtoken.models import Token


time_slots= ['10:00:00', '10:30:00', '11:00:00', '12:00:00', '12:30:00', '14:00:00', '14:30:00', '15:00:00', '15:30:00', '17:30:00','18:00:00','18:30:00','19:00:00','20:00:00']
class bookingList(APIView):
    permission_classes=[IsAdminUser,]
    def get(self,request):
        Patients= Patient.objects.all()
        serializer=PatientSerializer(Patients,many=True)
        return Response(serializer.data)
class addUserInfo(APIView):
    permission_classes=[IsAuthenticated,]
    def post(self,request):
        user= Patient.objects.get(user=request.user)
        serializer=UserSerializer(user,data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data,status=status.HTTP_201_CREATED)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
class bookTheSlot(APIView):
    permission_classes=[IsAuthenticated,]
    def post(self,request):
        user= Patient.objects.get(user=request.user)
        serializer=BookingSerializer(user,data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data,status=status.HTTP_201_CREATED)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
class availableSlots(APIView):
    def get(self,request,selected_day):
        ref_slots=time_slots
        BookedTime= Patient.objects.filter(date=selected_day)
        serializer=SlotTimeSerializer(BookedTime,many=True)
        for i in serializer.data:
            if(i["slotTime"] in ref_slots):
                ref_slots.remove(i["slotTime"])
        print(ref_slots)
        return JsonResponse(ref_slots,safe=False)
class createUser(APIView):
    def post(self,request):
        username=request.data['username']
        password=request.data['password']
        email=request.data['email']
        first_name=request.data['first_name']
        last_name=request.data['last_name']
        result={}
        status=None
        try:
            user=User.objects.create_user(username=username,password=password,email=email,first_name=first_name,last_name=last_name)
            user.save()
            auth.login(request,user)
            token=Token.objects.get(user=user).key
            result["status"]= "Success"
            result["message"]="User Sign up successfull"
            result["first_name"]=user.first_name
            result["last_name"]=user.last_name
            result["email"]=user.email
            result["token"]=token
            status=200
        except Exception as Error:
            result["status"]= "Failure"
            result["message"]="{0}".format(Error)
            status=400
        return JsonResponse(data=result,status=status)

class loginUser(APIView):
    def post(self,request):
        username=request.data['username']
        password=request.data['password']
        user=auth.authenticate(username=username,password=password)
        result={}
        status=None
        if user is not None:
            auth.login(request,user)
            token=Token.objects.get(user=user).key
            result["status"]= "true"
            result["message"]="User Logged In"
            result["first_name"]=user.first_name
            result["last_name"]=user.last_name
            result["token"]=token
            status=200
        else:
            result["status"]= "false"
            result["message"]="Invalid Credentials"
            status=401
        return JsonResponse(data=result,status=status)
class logoutUser(APIView):
    def post(self,request):
        auth.logout(request)
        result={}
        result["status"]= "Success"
        result["message"]="User Logged Out"
        return JsonResponse(result)

