from django.shortcuts import render

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser 
from rest_framework.response import Response


from base.models import Product
from base.products import products

from base.serializer import ProductSerializer


from rest_framework import status
  

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