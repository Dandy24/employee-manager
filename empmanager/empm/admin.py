from django.contrib import admin

# Register your models here.
from .models import Employee, Company, Shift

admin.site.register(Employee)
admin.site.register(Company)
admin.site.register(Shift)

