# 'VIEWSETS' rest_framework module can allow us to perform from crud api operation
from lead.models import Lead 
from rest_framework import viewsets , permissions
from .serializers import LeadSerializer 


#Lead Viewset
# viewset allows us to perform full CRUD operations api without defining explicit methods for the functionality
#so u dont need to define ur http verbs like 'get', 'post', 'delete','update', 'put'
class LeadViewSet(viewsets.ModelViewSet) :
    # queryset = Lead.objects.all()
    # setting our permissions
    permission_classes = [
        # allow all permissions for now
        # permissions.AllowAny
        #
        # restricted to the users only
        permissions.IsAuthenticated
    ]

    # we need to define our serializer class up here
    serializer_class = LeadSerializer

    # we are overriding the get_queryset() function bcos we want to return the leads of the only authenticated User/anonymous user (persmission.AllowAny)
    def get_queryset(self):
        # this will get only the lead of the user
        return self.request.user.leads.all()

    # # it allows us to save the lead owner when we create the lead
    def perform_create(self  , serializer):
       serializer.save(owner = self.request.user)








