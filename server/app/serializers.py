from .models import Listing 
from rest_framework import serializers

# using as blog thumbnail
class ListingSerializer(serializers.ModelSerializer):
    author_name = serializers.StringRelatedField(source='author.name',read_only=True)
    author_email = serializers.StringRelatedField(source='author.email',read_only=True)
    class Meta:
        model = Listing
        fields = "__all__"