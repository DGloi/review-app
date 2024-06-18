from django.shortcuts import render
from rest_framework import generics
from .models import *
from rest_framework.response import Response
from .serializer import *
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.db import connection
import json
# Create your views here.

class EmployeeView(generics.ListCreateAPIView):
    queryset = Employee.objects.all()
    serializer_class = EmployeeSerializer

class EmployeeDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Employee.objects.all()
    serializer_class = EmployeeSerializer
    lookup_field = 'id'

@csrf_exempt
def execute_dynamic_query(request):
    if request.method == 'POST':
        query_data = json.loads(request.body)
        query = build_query(query_data)
        with connection.cursor() as cursor:
            cursor.execute(query)
            rows = cursor.fetchall()
            columns = [col[0] for col in cursor.description]
        return JsonResponse({'data': [dict(zip(columns, row)) for row in rows]})

def build_query(query_data):
    # Example dynamic query building logic
    select_clause = "SELECT *"
    from_clause = "FROM employee"  # Update this to your actual table name
    where_clauses = []

    for item in query_data:
        where_clauses.append(f"{item['column']} = '{item['value']}'")

    where_clause = "WHERE " + " AND ".join(where_clauses) if where_clauses else ""
    query = f"{select_clause} {from_clause} {where_clause}"
    
    return query