from django.shortcuts import render
from django.http import HttpResponse
from .serializers import PatientSerializer
from .serializers import SlotTimeSerializer
from .serializers import UserSerializer
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
from datetime import date


time_slots= ['10:00', '10:30', '11:00', '12:00', '12:30', '14:00', '14:30', '15:00', '15:30', '17:30','18:00','18:30','19:00','20:00']
class bookingList(APIView):
    def get(self,request,selected_day):
        if(request.user.is_staff or request.user.is_superuser):
            Patients= Patient.objects.filter(slot__has_key=selected_day)
            serializer=PatientSerializer(Patients,many=True)
            print("GET-->",serializer.data)
            return Response(serializer.data)
        
        result={}
        result["status"]="Failure"
        result["message"]="Un-Authorised Access"
        return Response(data=result,status=401)
        
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
        req_date=str(list(request.data.keys())[0])
        print("req_booking=",request.data)
        result={}
        try:
            hasslot=Patient.objects.filter(slot__has_key=req_date).get(user=request.user)
            result["status"]="Failure"
            result["message"]="Already have a booking on {0}".format(req_date)
        except Patient.DoesNotExist:
            print("No booking on request day")
            curr_date=str(date.today())
            userSlots=list(Patient.objects.values_list('slot',flat=True).get(user=request.user).keys())
            userSlots.sort()
            totalSlots=len(userSlots)
            if(curr_date in userSlots):
                pos=userSlots.index(curr_date)
                activeSlots=totalSlots-pos
            
            else:
                pos=0
                if(len(userSlots)!=0):
                    if(userSlots[0]>curr_date):
                        pos=0
                
                else:
                    pos=-1
                    for i in range(totalSlots-1):
                        if(userSlots[i]<curr_date and userSlots[i+1]>curr_date):
                            pos=i+1
                            break
                
                    if(pos==-1):
                        totalSlots=-1
                activeSlots=totalSlots-pos
            print("Active SLots=",activeSlots)
            if(activeSlots==2):
                result["status"]="Failure"
                result["message"]="Cannot have more than 2 active bookings"
            else:
                user.slot.update(request.data)
                user.save()
                result["status"]="Success"
                result["message"]="Appointment booked successfully"
                result["slot"]=request.data
                return Response(data=result,status=status.HTTP_201_CREATED)
                result["status"]="Failure"
                result["message"]="Appointment booking Failed"
                return Response(data=result,status=status.HTTP_400_BAD_REQUEST)
            
        return JsonResponse(data=result,status=400)
class pastBookings(APIView):
    permission_classes=[IsAuthenticated,]
    def get(self,request):
        userBookings=Patient.objects.values_list('slot',flat=True).get(user=request.user)
        print(userBookings)
        return Response(data=userBookings,status=200)

class availableSlots(APIView):
    def get(self,request,selected_day):
        print("selected day is",selected_day)
        ref_slots=[]
        for i in time_slots:
            ref_slots.append(i)
        BookedTime= Patient.objects.filter(slot__has_key=selected_day)
        for i in BookedTime:
            print("QUER-->",i)
        serializer=BookingSerializer(BookedTime,many=True)
        for i in serializer.data:
            print("Databse-->",list(i["slot"].values())[0])
            if(list(i["slot"].values())[0] in ref_slots):
                ref_slots.remove(list(i["slot"].values())[0])
        print(time_slots)
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
        check=True
        if user is not None:
            if(request.data['authLevel']=="Staff"):
                if(user.is_staff!=True):
                    check=False
            if(check):
                auth.login(request,user)
                token=Token.objects.get(user=user).key
                result["status"]= "true"
                result["message"]="User Logged In"
                result["first_name"]=user.first_name
                result["last_name"]=user.last_name
                result["email"]=user.email
                result["token"]=token
                result["is_staff"]=request.user.is_staff
                status=200
            else:
                result["status"]= "false"
                result["message"]="Invalid Credentials"
                status=401
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
        print("LOGGED OUT-->",result)
        return JsonResponse(result,status=200)
class checkStaffStatus(APIView):
    def get(self,request):
        result={}
        result["status"]= "Success"
        result["is_staff"]=request.user.is_staff
        print(result)
        return JsonResponse(result,status=200)

