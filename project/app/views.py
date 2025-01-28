from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import React
from .serializers import ReactSerializer
from rest_framework.decorators import api_view

# Create your views here.

@api_view(['PUT'])
def react_update(request, pk):
    if request.method == 'PUT':
        details = React.objects.get(pk=pk)
        serializer = ReactSerializer(details, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=400)

@api_view(['DELETE'])
def react_delete(request, pk):
    try:
        if request.method == 'DELETE':
            details = React.objects.get(pk=pk)
            details.delete()
            return Response({"message":"Employee deleted successfully"},status=204)
    except React.DoesNotExist:
        return Response({"message":"Employee not found"},status=404)

@api_view(['GET'])
def react_list(request):
    if request.method == 'GET':
        details = React.objects.all()
        serializer = ReactSerializer(details, many=True)
        return Response(serializer.data)
    return Response(serializer.errors, status=400)

@api_view(['POST'])
def react_create(request):
    if request.method == 'POST':
        serializer = ReactSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)


