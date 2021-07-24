from rest_framework import serializers
from empm.models import Employee

#Employee serializer
class EmployeeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Employee
        fields = '__all__'