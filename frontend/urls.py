from django.urls import path
from . import views

urlpatterns = [
    path('',views.index),
    path('account/slotbooking',views.index),
    path('account/appointments',views.index),
    path('account/signup',views.index),
    path('account/signup/addinfo',views.index),
]
