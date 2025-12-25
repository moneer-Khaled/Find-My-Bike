from django.db import models
from django.contrib.auth.models import User


class Bike(models.Model):
    owner = models.ForeignKey( User, on_delete=models.CASCADE, related_name="bikes")

    brand = models.CharField(max_length=100)
    model = models.CharField(max_length=100)
    color = models.CharField(max_length=50)

    description = models.TextField( help_text="Scratches, stickers, basket, seat color, etc." )

    is_stolen = models.BooleanField(default=False)

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.brand} {self.model} ({self.color})"


class Sighting(models.Model):
    bike = models.ForeignKey( Bike,on_delete=models.CASCADE,related_name="sightings")

    location = models.CharField(max_length=200)
    description = models.TextField(help_text="What did you see? Who was riding it?")

    photo = models.ImageField(upload_to="sightings/", blank=True, null=True)

    reported_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Sighting of {self.bike} at {self.location}"
