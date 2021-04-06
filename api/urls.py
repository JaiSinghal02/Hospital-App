from api import views
from django.urls import path,re_path
from rest_framework.authtoken.views import obtain_auth_token


urlpatterns = [
    re_path(r'^account/appointments/(?P<selected_day>\d{4}-\d{2}-\d{2})/$',views.bookingList.as_view()),
    re_path(r'^availableslots/(?P<selected_day>\d{4}-\d{2}-\d{2})/$',views.availableSlots.as_view()),
    path('bookslot',views.bookTheSlot.as_view()),
    path('account/signup',views.createUser.as_view()),
    path('account/signup/addinfo',views.addUserInfo.as_view()),
    path('account/pastbookings',views.pastBookings.as_view()),
    path('account/appointments',views.bookingList.as_view()),
    path('account/checkstaffstatus',views.checkStaffStatus.as_view()),
    path('account/login',views.loginUser.as_view()),
    path('account/logout',views.logoutUser.as_view()),
    path('gettoken',obtain_auth_token)
]