from django.db.models import Count
from rest_framework import serializers
from .models import Employee, Company, Shift, MonthlyOutput, OverallMonthlyOutput


# Company serializer
class CompanySerializer(serializers.ModelSerializer):
    class Meta:
        model = Company
        fields = '__all__'


# Employee serializer
class EmployeeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Employee
        fields = '__all__'


class MonthlyOutputSerializer(serializers.ModelSerializer):
    effectivity = serializers.SerializerMethodField('calculate_effectivity')
    overtime_hours = serializers.SerializerMethodField('calculate_overtimes')

    def calculate_effectivity(self, output):
        effectivity = (output.working_hours / 160) * 100
        if effectivity > 100:
            return 100
        else:
            return effectivity

    def calculate_overtimes(self, output):
        overtime = output.working_hours - 160
        if overtime > 0:
            return overtime
        else:
            return

    class Meta:
        model = MonthlyOutput
        fields = '__all__'


class OverallMonthlyOutputSerializer(serializers.ModelSerializer):

    effectivity = serializers.SerializerMethodField('calculate_effectivity')
    # overtime_hours = serializers.SerializerMethodField('calculate_overtimes')
    companies = serializers.SerializerMethodField('get_companies')

    def calculate_effectivity(self, output):
        emp_cnt = Employee.objects.count()
        effectivity = (output.working_hours / (160 * emp_cnt)) * 100
        if effectivity > 100:
            return 100
        else:
            return effectivity

    def get_companies(self, output):

        from django.db import connection, transaction
        cursor = connection.cursor()

        cursor.execute("SELECT ec.name, SUM(working_hours) FROM empm_monthlyoutput join empm_employee on empm_employee.id = empm_monthlyoutput.employee_id join empm_company ec on ec.id = empm_employee.company_id where start_date = %s and end_date = %s GROUP BY ec.name;", [output.start_date, output.end_date])
        row = cursor.fetchmany()

        return row

        # companies = Company.objects.all()
        #
        # res = []
        #
        # for comp in companies:
        #     employees = Employee.objects.filter(company_id=comp.id).values('company__name').annotate(dcount=Count(''))
        #     res.append(employees)
        # return res

    # def calculate_overtimes(self, output):
    #     overtime = output.working_hours - 160
    #     if overtime > 0:
    #         return overtime
    #     else:
    #         return

    class Meta:
        model = OverallMonthlyOutput
        fields = '__all__'


# Shift serializer
class ShiftSerializer(serializers.ModelSerializer):
    # employees = EmployeeSerializer(many=True)
    # company = CompanySerializer(many=False)

    ## TODO ????????????????
    class Meta:
        model = Shift
        fields = ('id', 'time', 'date', 'employeeIDs', 'companyID')

    # def create(self, validated_data):
    #     employees_data = validated_data.pop('employees')
    #     shift = Shift.objects.create(**validated_data)
    #     shift.company = Company.objects.create(**validated_data)
    #
    #     for employee in employees_data:
    #         employee, created = Employee.objects.get_or_create(id=employee['id'])
    #         shift.employees.add(employee)
    #     return shift
