from copy import copy

from rest_framework.decorators import api_view
from rest_framework.response import Response
from drf_yasg.utils import swagger_auto_schema
from django.db import connection
from rest_framework.test import APIRequestFactory

from .models import Company, Employee, Shift
from .serializers import CompanySerializer, EmployeeSerializer, ShiftSerializer

from django.db import connection


@api_view(['GET'])
def apiOverview(request):
    api_urls = {
        'Company list': '/company-list/',
        'Company detail': '/company-detail/<str:pk>/',
        'Company create': '/company-create/',
        'Company delete': '/company-delete/<str:pk>/',
        'Company update': '/company-update/<str:pk>/',

        'Employee detail': '/employee-detail/<str:pk>',
        'Employee list': '/employee-list/',
        'Employee create': '/employee-create/',
        'Employee delete': '/employee-delete/<str:pk>/',
        'Employee update': '/employee-update/<str:pk>/',
    }

    return Response(api_urls)


@api_view(['GET'])
def companyList(request):
    companies = Company.objects.all()
    serializer = CompanySerializer(companies, many=True)

    return Response(serializer.data)


@api_view(['GET'])
def companyDetail(request, pk):
    company = Company.objects.get(id=pk)
    serializer = CompanySerializer(company, many=False)

    return Response(serializer.data)


@swagger_auto_schema(methods=['post'], request_body=CompanySerializer)
@api_view(['POST'])
def companyCreate(request):
    serializer = CompanySerializer(data=request.data)

    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    else:
        print(serializer.errors)
        raise ValueError


@api_view(['PUT'])
def companyUpdate(request, pk):
    company = Company.objects.get(id=pk)
    serializer = CompanySerializer(instance=company, data=request.data)

    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    else:
        print(serializer.errors)
        raise ValueError


@api_view(['DELETE'])  # ,GET ?
def companyDelete(request, pk):
    company = Company.objects.get(id=pk)
    company.delete()

    return Response('Company was deleted.')


# Employee views

@api_view(['GET'])
def employeeList(request):
    employees = Employee.objects.all()
    serializer = EmployeeSerializer(employees, many=True)

    return Response(serializer.data)


@api_view(['GET'])
def employeeListForCompany(request, pk):
    employees = Employee.objects.filter(company_id__exact=pk)
    serializer = EmployeeSerializer(employees, many=True)

    return Response(serializer.data)


@api_view(['GET'])
def employeeListForShift(request, pk):
    shift = Shift.objects.get(id=pk)
    # employees = Employee.objects.select_related()
    employees = shift.employeeIDs
    serializer = EmployeeSerializer(employees, many=True)

    return Response(serializer.data)


@swagger_auto_schema(methods=['post'], request_body=EmployeeSerializer)
@api_view(['POST'])
def employeeCreate(request):
    serializer = EmployeeSerializer(data=request.data)

    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    else:
        print(serializer.errors)
        raise ValueError


@api_view(['GET'])
def employeeDetail(request, pk):
    employee = Employee.objects.get(id=pk)
    serializer = EmployeeSerializer(employee, many=False)

    return Response(serializer.data)


@api_view(['DELETE'])  # ,GET ?
def employeeDelete(request, pk):
    employee = Employee.objects.get(id=pk)
    employee.delete()

    return Response('Employee was deleted.')


@swagger_auto_schema(methods=['put'], request_body=EmployeeSerializer)
@api_view(['PUT'])
def employeeUpdate(request, pk):
    employee = Employee.objects.get(id=pk)
    serializer = EmployeeSerializer(instance=employee, data=request.data)

    if serializer.is_valid():
        serializer.save()
    else:
        print(serializer.errors)
        raise ValueError

    return Response(serializer.data)


@api_view(['GET'])
def shiftList(request):
    shift = Shift.objects.all()
    serializer = ShiftSerializer(shift, many=True)

    return Response(serializer.data)


@api_view(['GET'])
def shiftDetail(request, pk):
    shift = Shift.objects.get(id=pk)
    serializer = ShiftSerializer(shift, many=False)

    return Response(serializer.data)


@api_view(['GET'])
def shiftListForCompany(request, companyID):
    shift = Shift.objects.filter(companyID_id__exact=companyID)
    serializer = ShiftSerializer(shift, many=True)

    return Response(serializer.data)


## TODO
@api_view(['GET'])
def shiftListForEmployee(request, employeeID):
    shift = Shift.objects.filter(employees__shift__employees__in=employeeID)
    serializer = ShiftSerializer(shift, many=True)

    return Response(serializer.data)


@swagger_auto_schema(methods=['post'], request_body=ShiftSerializer)
@api_view(['POST'])
def shiftCreate(request):
    print(request.data)
    serializer = ShiftSerializer(data=request.data)

    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    else:
        print(serializer.errors)
        raise ValueError


@swagger_auto_schema(methods=['put'], request_body=ShiftSerializer)
@api_view(['PUT'])
def shiftUpdate(request, pk):
    shift = Shift.objects.get(id=pk)

    # print(request.data)
    requestEmployeeList = request.data['employeeIDs']

    employees = []

    emp = {}

    for employee in requestEmployeeList:
        emp = Employee.objects.get(id=employee)
        employees.append(emp)
        emp = {}

    print(employees)

    serializedShift = copy(request.data)

    print(serializedShift)

    serializedShift['employeeIDs'] = employees

    serializer = EmployeeSerializer(instance=shift, data=serializedShift)

    if serializer.is_valid():
        serializer.save()
    else:
        print(serializer.errors)
        raise ValueError

    return Response(serializer.data)


@api_view(['DELETE'])  # ,GET ?
def shiftDelete(request, pk):
    shift = Shift.objects.get(id=pk)
    shift.delete()

    return Response('Shift was deleted.')


@api_view(['DELETE'])
def deleteCompanyTable(request):
    cursor = connection.cursor()

    Company.objects.all().delete()
    cursor.execute("delete from sqlite_sequence where name='empm_company'")

    return Response('All companies were deleted')


@api_view(['DELETE'])
def deleteShiftTable(request):
    cursor = connection.cursor()

    Shift.objects.all().delete()
    cursor.execute("delete from sqlite_sequence where name='empm_shift'")

    return Response('All shifts were deleted')

@api_view(['DELETE'])
def deleteEmployeeTable(request):
    cursor = connection.cursor()

    Shift.objects.all().delete()
    cursor.execute("delete from sqlite_sequence where name='empm_employee'")

    return Response('All employees were deleted')