from django.shortcuts import render

from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import Product
from .products import products

from .serializer import ProductSerializer

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    # @classmethod
    # def get_token(cls, user):
    #     token = super().get_token(user)

    #     # Add custom claims
    #     token['username'] = user.username
    #     token['message'] = 'hello world'

    #     return token
    def validate(self, attrs):
        data = super().validate(attrs)

        refresh = self.get_token(self.user)

        data['username'] = self.user.username
        data['email'] = self.user.email

        return data

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

    
# Create your views here.
@api_view(['GET'])
def getRoutes(request):
    return Response('Hello, this is the backend API')


@api_view(['GET'])
def getProducts(request):
    products = Product.objects.all()
    serialzier = ProductSerializer(products, many=True)
    return Response(serialzier.data)


@api_view(['GET'])
def getProduct(request, pk):
    product = Product.objects.get(_id=pk)
    serialzier = ProductSerializer(product, many=False)
    return Response(serialzier.data)