from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.generics import ListAPIView,RetrieveAPIView
from rest_framework.permissions import IsAuthenticated,AllowAny
from .models import Listing
from .serializers import ListingSerializer
from datetime import datetime,timezone,timedelta



class ListingView(ListAPIView):
    permission_classes = [AllowAny]
    queryset = Listing.objects.order_by("list_date").filter(is_published=True)
    serializer_class = ListingSerializer
    lookup_field = "slug"
    
    
    def get_queryset(self):
        search_filter = Listing.objects.all()
        title = self.request.query_params.get("title")
        if title is not None:
           search_filter = search_filter.filter(title__icontains=title)
        return search_filter

