from django.db import models

class Company(models.Model):
    name = models.CharField(max_length=50)
    phone = models.IntegerField()
    address = models.CharField(max_length=120)

    def __str__(self):
        return self.name

class Employee(models.Model):
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    email = models.EmailField(blank=True)
    phone = models.PositiveIntegerField()
    health_limitations = models.TextField(blank=True)
    active = models.BooleanField(default=True)
    working_category = models.CharField(max_length=1)
    med_exam_date = models.DateField(blank=True, null=True)
    job_assign_date = models.DateField(blank=True, null=True)
    company = models.ForeignKey(
        'Company',
        on_delete=models.CASCADE,
        null=True
    )