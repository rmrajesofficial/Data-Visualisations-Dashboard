from .serializers import *
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import *
# Create your views here.
class GetData(APIView):
    def get(self, request):
        # Retrieve all instances of DashboardData
        instance = DashboardData.objects.all()
        serializer = DashboardDataSerializer(instance, many=True)
        return Response(serializer.data,status=status.HTTP_201_CREATED)

class PostData(APIView):
    def post(self, request):
        json_data=request.data.get('jsondata',[])
        if not json_data:
            return Response({'error': "jsondata is null or not present"}, status=status.HTTP_400_BAD_REQUEST)
        serializer = DashboardDataSerializer(data=json_data, many=True)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': "data entered successfully"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)