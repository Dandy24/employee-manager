from rest_framework import routers
from .api import EmployeeViewSet
from django.urls import path
from . import views

#router = routers.DefaultRouter()
#router.register('api/employees', EmployeeViewSet, 'employees')

#urlpatterns = router.urls


urlpatterns = [
    path('', views.apiOverview, name='api-overview'),
    path('company-list', views.companyList, name='company-list'),
    path('company-detail/<str:pk>', views.companyDetail, name='company-detail'),
    path('company-create', views.companyCreate, name='company-create'),
]