from django.contrib import admin

# Register your models here.
from .models import Employee, Company, Shift, MonthlyOutput, OverallMonthlyOutput

admin.site.register(Employee)
admin.site.register(Company)
admin.site.register(Shift)
admin.site.register(MonthlyOutput)
admin.site.register(OverallMonthlyOutput)

