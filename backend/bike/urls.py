from django.urls import path
from .views import bike_list, add_sighting, my_bikes

urlpatterns = [
    path("bikes/", bike_list),
    path("my-bikes/", my_bikes), 
    path("bikes/<int:bike_id>/sighting/", add_sighting),
]