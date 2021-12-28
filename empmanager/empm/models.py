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


class MonthlyOutput(models.Model):
    working_hours = models.DecimalField(max_digits=4, decimal_places=1)
    sick_hours = models.DecimalField(max_digits=4, decimal_places=1)
    vacation_hours = models.DecimalField(max_digits=4, decimal_places=1)
    start_date = models.DateField(blank=True, null=True)
    end_date = models.DateField(blank=True, null=True)
    employee = models.ForeignKey(
        'Employee',
        on_delete=models.SET_NULL,
        null=True
    )


class OverallMonthlyOutput(models.Model):
    housing_capacity = models.IntegerField()
    working_hours = models.DecimalField(max_digits=6, decimal_places=1)
    sick_hours = models.DecimalField(max_digits=6, decimal_places=1)
    vacation_hours = models.DecimalField(max_digits=6, decimal_places=1)
    start_date = models.DateField()
    end_date = models.DateField()


class Comment(models.Model):
    text = models.TextField()
    created_at = models.DateField()
    monthly_output = models.ForeignKey(
        'MonthlyOutput',
        on_delete=models.SET_NULL,
        null=True
    )


class Shift(models.Model):
    date = models.DateField()
    time = models.TextField(max_length=50)
    companyID = models.ForeignKey(
        'Company',
        on_delete=models.CASCADE,
        null=False
    )
    employeeIDs = models.ManyToManyField("Employee")
