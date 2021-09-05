from django.urls import path
from . import views

# router = routers.DefaultRouter()
# router.register('api/employees', EmployeeViewSet, 'employees')

# urlpatterns = router.urls


urlpatterns = [
    path('', views.apiOverview, name='api-overview'),
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
]