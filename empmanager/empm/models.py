from django.db import models

class Company(models.Model):
    name = models.CharField(max_length=50)
    phone = models.IntegerField()
    address = models.CharField(max_length=120)

class Employee(models.Model):
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    email = models.EmailField(blank=True, unique=True)