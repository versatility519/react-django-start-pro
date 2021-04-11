from rest_framework import generics , permissions
from rest_framework.response import Response
# getting our token from knox.models.AuthToken
from knox.models import AuthToken
from .serializers import UserSerializer, RegisterSerializer , LoginSerializer


#WHEN MAKING ANY REQUEST; THE TOKEN CREATED HERE GOES INTO AUTHORIZATION PART OF THE HEADER
# Register API
class RegisterAPI(generics.GenericAPIView):
    # defining the serializer class for our API view
    serializer_class = RegisterSerializer

    #defining the post request function def()
    # all the data coming from the form is entering the 'request' object
    def post(self, request, *args, **kwargs):
        # serializing the posted data which is being pushed to the serializer_class defined
        # and thereby passing the posted data to the model for further validation
        serializer = self.get_serializer(data=request.data)
        #checking if the posted data is valid and making sure its valid
        #raise_exception=True will send back error that are raised
        serializer.is_valid(raise_exception = True) 
        # saving the user in the db
        user = serializer.save()


        # WE PASS THE USER SERIALIZER CONTEXT as context variable to the user AND SEND BACK RESPONSE
        
        # sending response back from our api
        return Response({
            # this will give us a serialized user data
            "user" : UserSerializer(user, context = self.get_serializer_context()).data,
            # The Token.objects.create returns a tuple(instance, token).So in order to get token use the index 1
            # The token goes to the header authorization
            # this will create token specific to that user
            # AuthToken is a model that is going to create token that is specific for that user
            "token" : AuthToken.objects.create(user)[1]
        })




# Login API
class  LoginAPI(generics.GenericAPIView):
    # defining the serializer class for our API view
    serializer_class = LoginSerializer

    # defining the post request function def()
    # all the data coming from the form is entering the 'request' object
    def post(self, request, *args, **kwargs):
        # serializing the posted data which is being pushed to the serializer_class defined
        # and thereby passing the posted data to the model for further validation
        serializer = self.get_serializer(data=request.data)
        # checking if the posted data is valid and making sure its valid
        # raise_exception=True will send back error that are needed
        serializer.is_valid(raise_exception=True)
        # saving the user in the db
        user = serializer.validated_data
        # print(UserSerializer(user, context=self.get_serializer_context()).data)
        # sending response back from our api

        return Response({
            # this will give us a serialized user data
            # WE PASS THE USER SERIALIZER CONTEXT as context variable to the user AND SEND BACK RESPONSE
            "user": UserSerializer(user, context=self.get_serializer_context()).data,
            "token": AuthToken.objects.create(user)[1]
        })



# Get User API using the authenticaed user
class  UserAPI(generics.RetrieveAPIView):
    # section to authenticate user
    # user must be authenticates
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    # user serializer
    serializer_class = UserSerializer

    # overriding the get_object()
    # its looking at the token that we send along and return the user associated with that token
    def get_object(self):
        return self.request.user

