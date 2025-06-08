from django.shortcuts import render

from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import Product
from .products import products

from .serializer import ProductSerializer

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