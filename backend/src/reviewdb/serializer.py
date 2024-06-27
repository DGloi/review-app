from rest_framework import serializers
from .models import Employee, DatasetList

class EmployeeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Employee
        fields = ['id', 'name', 'email', 'level', 'location', 'department', 'division', 'position', 'salary', 'currency', 'salary_timebase', 'hire_date']

class DatasetListSerializer(serializers.ModelSerializer):
    class Meta:
        model = DatasetList
        fields = ['id', 'dataset_name', 'created_at']