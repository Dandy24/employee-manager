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
        on_delete=models.SET_NULL,
        null=True
    )

    def __str__(self):
        return self.first_name + self.last_name


class Shift(models.Model):
    date = models.DateField()
    time = models.TextField(max_length=50)
    company = models.ForeignKey(
        'Company',
        on_delete=models.CASCADE,
        null=False
    )
    employees = models.ManyToManyField("Employee")
