from django.shortcuts import render
from rest_framework import generics
from .models import *
from rest_framework.response import Response
from .serializer import *
from django.http import JsonResponse, HttpResponseNotAllowed, HttpResponseBadRequest
from django.views.decorators.csrf import csrf_exempt
from django.db import connection, DatabaseError
import json

# Create your views here.

class EmployeeView(generics.ListCreateAPIView):
    queryset = Employee.objects.all()
    serializer_class = EmployeeSerializer

class EmployeeDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Employee.objects.all()
    serializer_class = EmployeeSerializer
    lookup_field = 'id'

class DatasetListView(generics.ListAPIView):
    queryset = DatasetList.objects.all()
    serializer_class = DatasetListSerializer

@csrf_exempt
def execute_dynamic_query(request):
    if request.method == 'POST':
        try:
            query_data = json.loads(request.body)
            print("Received query data:", query_data)  # Log incoming data
            query = build_query(query_data)
            with connection.cursor() as cursor:
                cursor.execute(query)
                rows = cursor.fetchall()
                columns = [col[0] for col in cursor.description]
            return JsonResponse({'data': [dict(zip(columns, row)) for row in rows]})
        except json.JSONDecodeError as e:
            return HttpResponseBadRequest(f"Invalid JSON: {e}")
        except KeyError as e:
            return HttpResponseBadRequest(f"Missing key: {e}")
        except DatabaseError as e:
            return JsonResponse({'error': str(e)}, status=500)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)
    else:
        return HttpResponseNotAllowed(['POST'])

def build_query(query_data):
    datasets = query_data['datasets']
    joinKeys = query_data['joinKeys']
    
    if len(datasets) != 2 or len(joinKeys) != 2:
        raise ValueError("Two datasets and two join keys must be provided.")

    table1 = datasets[0]['name']
    table2 = datasets[1]['name']
    joinKey1 = joinKeys[0]
    joinKey2 = joinKeys[1]

    query = f"""
    SELECT * 
    FROM {table1}
    JOIN {table2}
    ON {table1}.{joinKey1} = {table2}.{joinKey2}
    """
    
    return query
@csrf_exempt
def get_table_schema(request, table_name):
    with connection.cursor() as cursor:
        cursor.execute(f"SELECT column_name FROM information_schema.columns WHERE table_name = '{table_name}'")
        columns = [row[0] for row in cursor.fetchall()]
    return JsonResponse(columns, safe=False)