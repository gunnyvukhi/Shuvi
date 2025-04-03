from django.http import JsonResponse
from .models import Measurement
from .serializers import MeasurementSerializer
from rest_framework.decorators import api_view
from django.shortcuts import get_object_or_404
from rest_framework.response import Response

@api_view(['GET'])
def measurement_list(request):
    measurements = Measurement.objects.all()
    serializer = MeasurementSerializer(measurements, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def measurement_detail(request, pk):
    measurement = get_object_or_404(Measurement, id=pk)
    serializer = MeasurementSerializer(measurement)
    return Response(serializer.data)

@api_view(['POST'])
def measurement_create(request):
    serializer = MeasurementSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)