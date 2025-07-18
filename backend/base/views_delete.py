from django.shortcuts import render

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser 
from rest_framework.response import Response
from django.contrib.auth.models import User
from .models import Product
from .products import products

from .serializer import ProductSerializer, UserSerializer, UserSerializerWithToken

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import status

from django.contrib.auth.hashers import make_password   


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

        # data['username'] = self.user.username
        # data['email'] = self.user.email

        serializer = UserSerializerWithToken(self.user).data
        for k, v in serializer.items():
            data[k] = v

        return data

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

    
# Create your views here.
@api_view(['GET'])
def getRoutes(request):
    return Response('Hello, this is the backend API')


@api_view(['POST'])
def registerUser(request):
    data = request.data

    try:
        user = User.objects.create(
            first_name=data['name'],
            username=data['email'],
            email=data['email'],
            password=make_password(data['password'])
        )

        serializer = UserSerializerWithToken(user, many=False)
        return Response(serializer.data)

    except Exception as e: 
        message = {'detail': 'User with this email already exists'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getUserProfile(request):
    user = request.user
    serializer = UserSerializer(user, many=False)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAdminUser])
def getUsers(request):
    users = User.objects.all()
    serialzier = UserSerializer(users, many=True)
    return Response(serialzier.data)



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