from rest_framework import serializers
# django already have the User models and also the Authentication
# we will be using knox for tokens
from django.contrib.auth.models import User
from django.contrib.auth import authenticate

# User data Serializer class
class UserSerializer(serializers.ModelSerializer):
    class  Meta:
        model = User
        fields = ('id', 'username', 'email',)


#User Register data Serializer class
class RegisterSerializer(serializers.ModelSerializer):
    class Meta :
        model = User
        fields =  ('id', 'username' , 'email', 'password')
        extra_kwargs = {'password' : {'write_only' : True}}

    # validated_data => validated using the structure of the model => from django validators 'PLEASE READ THE DJANGO DOCS'
    def create( self , validated_data ) :
        # creating the user with validated data from the user in each field
        user = User.objects.create_user(validated_data['username'],
                                        validated_data['email'],
                                        validated_data['password'] #handles hashing of the password
                                        )
        # print(validated_data)
        
        return user


# Login data Serializer class
# we are not using model serializer here cos we a not dealing with models here
# we just want to validate that the user is authenticated
class LoginSerializer(serializers.Serializer):
    username =  serializers.CharField()
    password = serializers.CharField()

    def validate(self, data):
        # using the authenticate from django
        user  = authenticate(**data)
        # checking if the authentication is passed or correct
        # The authentication is abstract
        if user and user.is_active:
            return user
        raise serializers.ValidationError("Incorrect Credentials")

