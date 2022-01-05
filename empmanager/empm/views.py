from django.db import connection
from drf_yasg.utils import swagger_auto_schema
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import Company, Employee, Shift, MonthlyOutput, OverallMonthlyOutput
from .serializers import CompanySerializer, EmployeeSerializer, ShiftSerializer, MonthlyOutputSerializer, \
    OverallMonthlyOutputSerializer


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

    serializer = ShiftSerializer(instance=shift, data=request.data)

    if serializer.is_valid():
        serializer.save()
    else:
        print(serializer.errors)
        raise ValueError

    return Response(serializer.data)


@api_view(['DELETE'])
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


@api_view(['GET'])
def employeeMonthlyOutput(request, employeeID):
    employee = MonthlyOutput.objects.get(employee_id=employeeID)
    serializer = MonthlyOutputSerializer(employee, many=False)

    return Response(serializer.data)


@api_view(['GET'])
def employeeMonthlyOutputHistory(request, employeeID):
    employees = MonthlyOutput.objects.filter(employee_id=employeeID).order_by('-start_date')
    serializer = MonthlyOutputSerializer(employees[:6], many=True)

    return Response(serializer.data)


@api_view(['GET'])
def topEmployeeOutputList(request):
    employees = MonthlyOutput.objects.order_by('-start_date', '-working_hours', 'vacation_hours')
    serializer = MonthlyOutputSerializer(employees[:5], many=True)

    return Response(serializer.data)


@api_view(['GET'])
def employeeTopMonthList(request, employeeID):
    # TODO make sure it wont show outputs older than 1 year
    employees = MonthlyOutput.objects.filter(employee_id=employeeID).order_by('-working_hours',
                                                                              'vacation_hours')
    serializer = MonthlyOutputSerializer(employees[:5], many=True)

    return Response(serializer.data)


# TODO dont create new output if one with the same month already exist
@swagger_auto_schema(methods=['post'], request_body=MonthlyOutputSerializer)
@api_view(['POST'])
def monthlyOutputCreate(request):
    serializer = MonthlyOutputSerializer(data=request.data)

    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    else:
        print(serializer.errors)
        raise ValueError


@api_view(['GET'])
def overallMonthlyOutputHistory(request):
    overalls = OverallMonthlyOutput.objects.order_by('-start_date')
    serializer = OverallMonthlyOutputSerializer(overalls[:6], many=True)

    return Response(serializer.data)


@api_view(['GET'])
def overallMonthlyOutputByCompany(request, start_date, end_date):
    from django.db import connection
    cursor = connection.cursor()

    cursor.execute(
        "SELECT ec.name as name, SUM(working_hours) as overall_hours FROM empm_monthlyoutput join empm_employee on empm_employee.id = empm_monthlyoutput.employee_id join empm_company ec on ec.id = empm_employee.company_id where start_date = %s and end_date = %s GROUP BY ec.name;",
        [start_date, end_date])
    row = cursor.fetchall()

    # row = Shift.objects.raw("SELECT ec.name as name, SUM(working_hours) as overall_hours FROM empm_monthlyoutput join empm_employee on empm_employee.id = empm_monthlyoutput.employee_id join empm_company ec on ec.id = empm_employee.company_id where start_date = %s and end_date = %s GROUP BY ec.name;", [start_date, end_date])

    return Response(row)


@swagger_auto_schema(methods=['post'], request_body=OverallMonthlyOutputSerializer)
@api_view(['POST'])
def overallMonthlyOutputCreate(request):
    serializer = OverallMonthlyOutputSerializer(data=request.data)

    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    else:
        print(serializer.errors)
        raise ValueError
