from rest_framework import serializers
from lead.models import Lead 


# lead app serializer class
# we are turning our 'Lead' model into a serializer to serialize the requested data from the
# Lead table or any other table/models we are trying to serialize
class LeadSerializer(serializers.ModelSerializer):
    # TURNING OUR LEAD MODEL INTO A SERIALIZER
    class Meta:
        model = Lead
        fields = '__all__'


# LEAD MODEL SERIALIZING ENDS HERE






