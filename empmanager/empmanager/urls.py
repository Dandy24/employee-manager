from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('frontend.urls')),
    #path('', include('empm.urls'))
    path('api/', include('empm.urls'))
]
