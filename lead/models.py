from django.db import models
# user model which comes default with django
from django.contrib.auth.models import User


# LEADS MODEL STARTS HERE
# Create your models here.
# model definition from which database table you want to make rest api request from it
class Lead(models.Model):
    # name field of the Lead table set to CharField(max_length=100) ; with max length of the field
    # if this field character length is more than 100 every other character that follows will be truncated
    name = models.CharField(max_length=100)
    # defining my address field with max_length of 100
    address = models.CharField(max_length = 100, blank=True)
    # unique allows distinct email address throughout the data in this field
    email = models.EmailField(max_length = 100 , unique = True)
    # blank allows blank form to be submitted i.e blank = True,
    message = models.CharField(max_length=500, blank=True)
     # adds the date automatically
    create_at = models.DateTimeField(auto_now_add=True)
    # we want to track the leads by owner, we want only the owner to be able to track only there own leads
    # on_delete=models.CASCADE delete lead once the user is deleted
    owner = models.ForeignKey(User , related_name='leads' , on_delete = models.CASCADE , null = True)


    def __str__(self):
        return f"{self.name}"


        

        



# LEAD MODEL ENDS HERE




# ANOTHER MODEL BY ME
PART_CHOICES = (
    ('1','PART 1'),
    ('2','PART 2'),
    ('3','PART 3'),
    ('4','PART 4'),
    ('5','PART 5'),
)

class Student(models.Model):
    name = models.CharField(max_length=100)
    username = models.CharField(max_length=100)
    part = models.CharField(max_length=1, choices = PART_CHOICES)
    phone = models.CharField(max_length = 11)
    created_on = models.DateTimeField(auto_now_add = True)

    def __str__(self):
        return f"{self.username}"
