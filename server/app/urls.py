from django.urls import path
from .views import ListingView


urlpatterns = [
    path("",ListingView.as_view()),
]
