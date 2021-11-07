from rest_framework.decorators import api_view
from rest_framework.response import Response
from drf_yasg.utils import swagger_auto_schema

from .models import Company, Employee, Shift
from .serializers import CompanySerializer, EmployeeSerializer, ShiftSerializer


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
def shiftListForCompany(request, companyID):
    shift = Shift.objects.filter(company_id__exact=companyID)
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

