from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import Company, Employee
from .serializers import CompanySerializer, EmployeeSerializer

@api_view(['GET'])
def apiOverview(request):

    api_urls = {
        'Company list' : '/company-list/',
        'Company detail': '/company-detail/<str:pk>/',
        'Company create': '/company-create/',
        'Company delete': '/company-delete/<str:pk>/',
        'Company update': '/company-update/<str:pk>/',


        'Employee detail': '/employee-detail/<str:pk>',
        'Employee list': '/employee-list/',
        'Employee create': '/employee-create/',
    }
    return Response(api_urls)

@api_view(['GET'])
def companyList(request):

    companies = Company.objects.all()
    serializer = CompanySerializer(companies, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def companyDetail(request,pk):

    company = Company.objects.get(id=pk)
    serializer = CompanySerializer(company, many=False)
    return Response(serializer.data)

@api_view(['POST'])
def companyCreate(request):

    serializer = CompanySerializer(data=request.data)

    if serializer.is_valid():
        serializer.save()
    else:
        print(serializer.errors)

    return Response(serializer.data)

@api_view(['POST'])
def companyUpdate(request,pk):
    company = Company.objects.get(id=pk)
    serializer = CompanySerializer(instance=company, data=request.data)

    if serializer.is_valid():
        serializer.save()
    else:
        print(serializer.errors)

    return Response(serializer.data)

@api_view(['DELETE','GET'])
def companyDelete(request, pk):

    company = Company.objects.get(id=pk)
    company.delete()

    return Response('Company was deleted.')



#Employee views

@api_view(['GET'])
def employeeList(request):

    employees = Employee.objects.all()
    serializer = EmployeeSerializer(employees, many=True)
    return Response(serializer.data)

@api_view(['POST'])
def employeeCreate(request):

    serializer = EmployeeSerializer(data=request.data)

    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    else:
        print(serializer.errors)

    return Response(serializer.errors)

@api_view(['GET'])
def employeeDetail(request,pk):

    employee = Employee.objects.get(id=pk)
    serializer = EmployeeSerializer(employee, many=False)
    return Response(serializer.data)
