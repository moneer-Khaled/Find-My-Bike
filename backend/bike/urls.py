from django.urls import path, include
from .views import bike_list, add_sighting, my_bikes
from rest_framework.routers import DefaultRouter
from .views import BikeViewSet, CommentViewSet

router = DefaultRouter()
router.register(r"bikes", BikeViewSet)
router.register(r"comments", CommentViewSet)

urlpatterns = [
    path("bikes/", bike_list),
    path("my-bikes/", my_bikes), 
    path("bikes/<int:bike_id>/sighting/", add_sighting),
    path("", include(router.urls)),
]