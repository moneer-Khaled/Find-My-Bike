from rest_framework import serializers
from .models import Bike, Sighting

class SightingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sighting
        fields = "__all__"


class BikeSerializer(serializers.ModelSerializer):
    sightings = SightingSerializer(many=True, read_only=True)

    class Meta:
        model = Bike
        fields = "__all__"
