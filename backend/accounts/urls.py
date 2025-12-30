from django.urls import path
from .views import register
from .views import RegisterView, LoginView

urlpatterns = [
    path("register/", register, name="register"),
    path("register/", RegisterView.as_view(), name="register"),
    path("login/", LoginView.as_view(), name="login"),
]
