from rest_framework import serializers
from .models import Bike, Sighting ,Comment

class SightingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sighting
        fields = "__all__"

class CommentSerializer(serializers.ModelSerializer):
  user=serializers.StringRelatedField(read_only=True)
  class Meta:
      model=Comment
      fields=["id", "user", "content", "created_at"]

class BikeSerializer(serializers.ModelSerializer):
    comments= CommentSerializer(many=True, read_only=True)
    class Meta:
        model = Bike
        fields = "__all__"
        read_only_fields = ['user', 'created_at', 'updated_at']

class BikeSerializer(serializers.ModelSerializer):
    sightings = SightingSerializer(many=True, read_only=True)

    class Meta:
        model = Bike
        fields = "__all__"
        
        
class BikeSerializer(serializers.ModelSerializer):
    sightings = SightingSerializer(many=True, read_only=True)
    owner_email = serializers.EmailField(source="owner.email", read_only=True)

    class Meta:
        model = Bike
        fields = "__all__"