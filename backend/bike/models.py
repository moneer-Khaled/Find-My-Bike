from django.db import models
from django.contrib.auth.models import User
from django.contrib.auth import get_user_model


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
        return f"{self.bike} seen in {self.location}"


User = get_user_model()
class Bike(models.Model):
  user = models.ForeignKey(User, on_delete=models.CASCADE)
  image=models.ImageField(upload_to='bike_images/')
  description=models.TextField()
  location=models.CharField(max_length=255)
  model_number=models.CharField(max_length=100)
  bike_type=models.CharField(max_length=100)
  date_seen=models.DateField()
  color=models.CharField(max_length=50)
  is_stolen=models.BooleanField(default=False)
  created_at=models.DateTimeField(auto_now_add=True)
  updated_at=models.DateTimeField(auto_now=True)
  def __str__(self):
      return f"{self.model_number} - {self.location}"
    
class Comment(models.Model):
  bike = models.ForeignKey(Bike, on_delete=models.CASCADE, related_name='comments')
  user = models.ForeignKey(User, on_delete=models.CASCADE)
  content = models.TextField()
  created_at = models.DateTimeField(auto_now_add=True)
  def __str__(self):
      return f"Comment by {self.user.username} on {self.bike.model_number}"