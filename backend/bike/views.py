from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Bike, Sighting
from .serializers import BikeSerializer, SightingSerializer

@api_view(["GET"])
def bike_list(request):
    bikes = Bike.objects.all()
    serializer = BikeSerializer(bikes, many=True)
    return Response(serializer.data)


@api_view(["POST"])
def add_sighting(request, bike_id):
    bike = Bike.objects.get(id=bike_id)
    serializer = SightingSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save(bike=bike)
        return Response({"message": "Sighting added"})
    return Response(serializer.errors, status=400)
