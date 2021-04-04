from django.contrib import admin
from django.urls import path,include
from hospitalapp import views

urlpatterns = [
    path('',include('frontend.urls')),
    path('api/',include('api.urls')),
    path('admin/', admin.site.urls),
]
