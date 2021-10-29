from rest_framework import serializers
from .models import Employee, Company, Shift


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


# Shift serializer
class ShiftSerializer(serializers.ModelSerializer):
    # employees = EmployeeSerializer(many=True)
    # company = CompanySerializer(many=False)

## TODO ????????????????
    class Meta:
        model = Shift
        fields = ('time', 'date', 'employees', 'company')

    # def create(self, validated_data):
    #     employees_data = validated_data.pop('employees')
    #     shift = Shift.objects.create(**validated_data)
    #     shift.company = Company.objects.create(**validated_data)
    #
    #     for employee in employees_data:
    #         employee, created = Employee.objects.get_or_create(id=employee['id'])
    #         shift.employees.add(employee)
    #     return shift
