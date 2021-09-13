from django.conf.urls import url
from django.urls import path
from . import views
from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi

# router = routers.DefaultRouter()
# router.register('api/employees', EmployeeViewSet, 'employees')

# urlpatterns = router.urls

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
    #path('', views.apiOverview, name='api-overview'),
    path('', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    path('company-list', views.companyList, name='company-list'),
    path('company-detail/<str:pk>', views.companyDetail, name='company-detail'),
    path('company-create', views.companyCreate, name='company-create'),
    path('company-delete/<str:pk>', views.companyDelete, name='company-delete'),
    path('company-update/<str:pk>', views.companyUpdate, name='company-update'),

    path('employee-list', views.employeeList, name='employee-list'),
    path('employee-detail/<str:pk>', views.employeeDetail, name='employee-detail'),
    path('employee-create', views.employeeCreate, name='employee-create'),
    path('employee-delete/<str:pk>', views.employeeDelete, name='employee-delete'),
    path('employee-update/<str:pk>', views.employeeUpdate, name='employee-update'),

    path('monthly-output-list/<str:pk>', views.MonthlyOutputByEmployeeID, name='monthly-output-list'),
    path('monthly-output-create', views.MonthlyOutputCreate, name='monthly-output-create'),
]
