from django.shortcuts import render
from rest_framework.views import APIView
from .models import *
from rest_framework.response import Response
from .serializer import *
# Create your views here.

class EmployeeView(APIView):
    def get(self, request):
        output = [{
            "id": output.id,
            "name": output.name,
            "email": output.email,
            "level": output.level,
            "location": output.location,
            "department": output.department,
            "division": output.division,
            "position": output.position,
            "salary": output.salary,
            "currency": output.currency,
            "salary_timebase": output.salary_timebase,
            "hire_date": output.hire_date,
            "created_at": output.created_at,
            "updated_at": output.updated_at,
        } for output in Employee.objects.all()]
        return Response(output)

    def post(self, request):
        serializer = EmployeeSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data)
