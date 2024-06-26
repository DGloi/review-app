"""
URL configuration for config project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path,include
from reviewdb.views import *

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api-auth/', include('rest_framework.urls')),
    path('employee/', EmployeeView.as_view(), name='employee-list'),
    path('employee/<int:id>/', EmployeeDetailView.as_view(), name='employee-detail'),
    path('api/execute_dynamic_query/', execute_dynamic_query, name='execute_dynamic_query'),
    path('api/dataset-list/', DatasetListView.as_view(), name='dataset_list'),
    path('api/schema/<str:table_name>/', get_table_schema, name='get_table_schema'),
]
