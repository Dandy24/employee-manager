import io

import PyPDF2
from drf_extra_fields.fields import Base64FileField, Base64ImageField
from rest_framework import serializers
from .models import Employee, Company, Shift, MonthlyOutput, OverallMonthlyOutput


class PDFBase64File(Base64FileField):
    ALLOWED_TYPES = ['pdf']

    def get_file_extension(self, filename, decoded_file):
        try:
            PyPDF2.PdfFileReader(io.BytesIO(decoded_file))
        except PyPDF2.utils.PdfReadError as e:
            print(e)
        else:
            return 'pdf'


class CompanySerializer(serializers.ModelSerializer):
    profile_picture = Base64ImageField(
        required=False
    )

    class Meta:
        model = Company
        fields = '__all__'


class EmployeeSerializer(serializers.ModelSerializer):
    attachment = PDFBase64File(
        required=False, allow_null=True
    )
    profile_picture = Base64ImageField(
        required=False
    )

    class Meta:
        model = Employee
        fields = '__all__'


class MonthlyOutputSerializer(serializers.ModelSerializer):
    working_hours = serializers.SerializerMethodField('cap_work_hours')
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

    def cap_work_hours(self, output):
        if output.working_hours > 160:
            return 160
        else:
            return output.working_hours

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
