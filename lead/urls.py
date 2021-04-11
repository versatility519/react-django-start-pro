# importing the router from the rest_framework installed in settings.py
from rest_framework import routers
from .apiview import LeadViewSet 


# invoking the DefaultRouter() which has all the http verb path url
# initiate a router with routers.DefaultRouter()
router = routers.DefaultRouter()
#we register the general path for the each api request i.e for all http verbs request(post,get,delete,update,create)
# and then register the different view sets with it
# the router registration process uses the router.registermethod that accepts two arguments:
# the first argument indicates the REST url prefix - in this case
# stores- and a second argument to specify the view set
router.register('api/lead', LeadViewSet, 'lead')


# we now invoke the urls of the router to generate all the urls for the api request
urlpatterns = router.urls

