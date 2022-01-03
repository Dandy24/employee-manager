from rest_framework import serializers
from .models import Employee, Company, Shift, MonthlyOutput, OverallMonthlyOutput


class CompanySerializer(serializers.ModelSerializer):
    class Meta:
        model = Company
        fields = '__all__'


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

    def calculate_effectivity(self, output):
        emp_cnt = Employee.objects.count()
        effectivity = (output.working_hours / (160 * emp_cnt)) * 100
        if effectivity > 100:
            return 100
        else:
            return effectivity

    class Meta:
        model = OverallMonthlyOutput
        fields = '__all__'


class ShiftSerializer(serializers.ModelSerializer):
    class Meta:
        model = Shift
        fields = '__all__'
