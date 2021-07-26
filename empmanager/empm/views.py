from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import Company
from .serializers import CompanySerializer

@api_view(['GET'])
def apiOverview(request):

    api_urls = {
        'Company list' : '/company-list/',
        'Company detail': '/company-detail/<str:pk>/',
        'Company create': '/company-create/',
        'Company delete': '/company-delete/<str:pk>/',
        'Company update': '/company-update/<str:pk>/',
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

    return Response(serializer.data)

@api_view(['POST'])
def companyUpdate(request,pk):
    company = Company.objects.get(id=pk)
    serializer = CompanySerializer(instance=company, data=request.data)

    if serializer.is_valid():
        serializer.save()

    return Response(serializer.data)

@api_view(['DELETE','GET'])
def companyDelete(request, pk):

    company = Company.objects.get(id=pk)
    company.delete()

    return Response('Company was deleted.')
