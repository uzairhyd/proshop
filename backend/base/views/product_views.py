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


@api_view(['POST'])
@permission_classes([IsAdminUser])
def createProduct(request):
    data = request.data

    user = request.user

    # product = Product.objects.create(
    #     user=user,
    #     name=data['name'],
    #     price=data['price'],
    #     brand=data['brand'],
    #     countInStock=data['countInStock'],
    #     description=data['description'],
    #     category=data['category'],
    #     image=data['image']
    # )

    product = Product.objects.create(
        user=user,
        name='Sample Product',
        price=0.0,
        brand='Sample Brand',
        countInStock=0,
        description='Sample Description',
        category='Sample Category',
    )

    serializer = ProductSerializer(product, many=False)
    return Response(serializer.data)

@api_view(['PUT'])
@permission_classes([IsAdminUser])
def updateProduct(request, pk):
    data = request.data

    product = Product.objects.get(_id=pk)

    product.name = data['name']
    product.price = data['price']
    product.brand = data['brand']
    product.countInStock = data['countInStock']
    product.description = data['description']
    product.category = data['category']
    # product.image = data['image']

    product.save()

    serializer = ProductSerializer(product, many=False)
    return Response(serializer.data)

@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def deleteProduct(request, pk):
    product = Product.objects.get(_id=pk)
    product.delete()
    return Response('Product was deleted')