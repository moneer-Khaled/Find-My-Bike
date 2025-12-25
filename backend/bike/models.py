from django.db import models

# Create your models here.


class Bike(models.Model):
    brand = models.CharField(max_length=100)
    color = models.CharField(max_length=50)
    bike_type = models.CharField(max_length=50)
    description = models.TextField()
    is_stolen = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.brand} - {self.color}"