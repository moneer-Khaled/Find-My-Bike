from django.db import models
from django.contrib.auth.models import User


class Bike(models.Model):
    STATUS_CHOICES = [ ('stolen', 'Stolen'),  ('found', 'Found'),]

    brand = models.CharField(max_length=100)
    model = models.CharField(max_length=100)
    serial_number = models.CharField(max_length=100, unique=True)
    color = models.CharField(max_length=50)
    status = models.CharField(max_length=10, choices=STATUS_CHOICES)
    image = models.ImageField(upload_to='bikes/', blank=True, null=True)
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)



    def __str__(self):
        return f"{self.brand} - {self.model}"


class Sighting(models.Model):
    bike = models.ForeignKey( Bike,on_delete=models.CASCADE, related_name='sightings' )
    location = models.CharField(max_length=255)
    date = models.DateField()
    description = models.TextField(blank=True)
    reported_by = models.ForeignKey(    User,on_delete=models.SET_NULL, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)



    def __str__(self):
        return f"{self.bike} seen in {self.city}"

