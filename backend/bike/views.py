from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework import status

from .models import Bike, Sighting
from .serializers import BikeSerializer, SightingSerializer


@api_view(["GET"])
@permission_classes([AllowAny])
def bike_list(request):
    bikes = Bike.objects.all()
    serializer = BikeSerializer(bikes, many=True)
    return Response(serializer.data)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def my_bikes(request):
    bikes = Bike.objects.filter(owner=request.user).order_by("-created_at")
    serializer = BikeSerializer(bikes, many=True)
    return Response(serializer.data)


@api_view(["POST"])
@permission_classes([AllowAny])  # change to IsAuthenticated if you want only logged-in users to report sightings
def add_sighting(request, bike_id):
    try:
        bike = Bike.objects.get(id=bike_id)
    except Bike.DoesNotExist:
        return Response({"error": "Bike not found"}, status=status.HTTP_404_NOT_FOUND)

    serializer = SightingSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save(bike=bike, reported_by=request.user if request.user.is_authenticated else None)
        return Response({"message": "Sighting added"}, status=status.HTTP_201_CREATED)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)