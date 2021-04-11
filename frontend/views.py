from django.shortcuts import render
from django.http import HttpResponse , JsonResponse
from lead.models import Lead

# Create your views here.

def index(request):
    return render(request, 'frontend/index.html')

def getting_leads(request):
    qs = Lead.objects.all().values()
    
    user_list = list(qs)    

    print(user_list)

    return JsonResponse(user_list , safe=False)
