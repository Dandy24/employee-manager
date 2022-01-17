from django.conf import settings
from django.conf.urls import url
from django.views.static import serve
from django.urls import path
from . import views
from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi

schema_view = get_schema_view(
    openapi.Info(
        title="Employee Manager API",
        default_version='1.0',
        description="Detailed API overview for Employee manager app"
    ),
    public=True,
    permission_classes=(permissions.AllowAny,),
)


urlpatterns = [
    path('', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    path('company-list', views.companyList, name='company-list'),
    path('company-detail/<str:pk>', views.companyDetail, name='company-detail'),
    path('company-create', views.companyCreate, name='company-create'),
    path('company-delete/<str:pk>', views.companyDelete, name='company-delete'),
    path('company-update/<str:pk>', views.companyUpdate, name='company-update'),

    path('employee-list', views.employeeList, name='employee-list'),
    path('employee-list/<str:pk>', views.employeeListForCompany, name='employee-list-company'),
    path('employee-list-shift/<str:pk>', views.employeeListForShift, name='employee-list-shift'),
    path('employee-detail/<str:pk>', views.employeeDetail, name='employee-detail'),
    path('employee-create', views.employeeCreate, name='employee-create'),
    path('employee-delete/<str:pk>', views.employeeDelete, name='employee-delete'),
    path('employee-update/<str:pk>', views.employeeUpdate, name='employee-update'),

    path('shift-list', views.shiftList, name='shift-list'),
    path('shift-detail/<str:pk>', views.shiftDetail, name='shift-detail'),
    path('shift-list-company/<str:companyID>', views.shiftListForCompany, name='shift-list-company'),
    path('shift-list-employee/<str:employeeID>', views.shiftListForEmployee, name='shift-list-employee'),
    path('shift-create', views.shiftCreate, name='shift-create'),
    path('shift-update/<str:pk>', views.shiftUpdate, name='shift-update'),
    path('shift-delete/<str:pk>', views.shiftDelete, name='shift-delete'),

    path('delete-employee-table', views.deleteEmployeeTable, name='delete-employee-table'),
    path('delete-shift-table', views.deleteShiftTable, name='delete-shift-table'),
    path('company-table-delete', views.deleteCompanyTable, name='company-table-delete'),

    path('employee-monthly-output/<str:employeeID>', views.employeeMonthlyOutputHistory,
         name='employee-monthly-output'),
    path('monthly-output', views.overallMonthlyOutputHistory, name='monthly-output'),
    path('monthly-output-company/<str:start_date>&<str:end_date>', views.overallMonthlyOutputByCompany,
         name='monthly-output-company'),
    path('employee-monthly-output-create', views.monthlyOutputCreate, name='employee-monthly-output-create'),
    path('monthly-output-create', views.overallMonthlyOutputCreate, name='monthly-output-create'),
    path('top-outputs-list', views.topEmployeeOutputList, name='top-outputs-list'),
    path('employee-top-outputs-list/<employeeID>', views.employeeTopMonthList, name='employee-top-outputs-list'),


]

if settings.DEBUG:
    urlpatterns += [
        url(r'^media/(?P<path>.*)$', serve, {
            'document_root': settings.MEDIA_ROOT
        })
    ]
