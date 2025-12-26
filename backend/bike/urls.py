from django.urls import path
from .views import bike_list, add_sighting

urlpatterns = [
    path("bikes/", bike_list),
    path("bikes/<int:bike_id>/sighting/", add_sighting),
]
