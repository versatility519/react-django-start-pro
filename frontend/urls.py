from django.urls import path
from .views import index , getting_leads

urlpatterns = [
    path("",  index),
    path("apis/",  getting_leads),

]