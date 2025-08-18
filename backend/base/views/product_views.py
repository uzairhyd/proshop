from django.shortcuts import render

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser 
from rest_framework.response import Response
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger


from base.models import Product, Review, Category
from base.products import products

from base.serializer import ProductSerializer, CategorySerializer


from rest_framework import status
  

@api_view(['GET'])
def getCategories(request):
    categories = Category.objects.all()
    serializer = CategorySerializer(categories, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def getProducts(request):
    query = request.query_params.get('keyword', None)
    category_name = request.query_params.get('category', None)
    print('QUERY:', query)
    print('CATEGORY NAME:', category_name)

    products = Product.objects.all()

    # Filter by keyword if provided
    if query:
        products = products.filter(name__icontains=query)

    # Filter by category if provided
    if category_name:
        products = products.filter(category__name=category_name)

    print('PRODUCT COUNT:', products.count())

    page = request.query_params.get('page', 1)
    try:
        page = int(page)
        if page < 1:
            page = 1
    except (ValueError, TypeError):
        page = 1

    paginator = Paginator(products, 5)  # Show 5 products per page

    try:
        products = paginator.page(page)
    except PageNotAnInteger:
        products = paginator.page(1)
    except EmptyPage:
        products = paginator.page(paginator.num_pages)

    serializer = ProductSerializer(products, many=True)
    return Response({
        'products': serializer.data,
        'page': page,
        'pages': paginator.num_pages
    })

@api_view(['GET'])
def getTopProducts(request):
    products = Product.objects.filter(rating__gte=4).order_by('-rating')[0:5]
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def getProduct(request, pk):
    product = Product.objects.get(_id=pk)
    serializer = ProductSerializer(product, many=False)
    return Response(serializer.data)


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


@api_view(['POST'])
def uploadImage(request):
    data = request.data

    product_id = data['product_id']
    product = Product.objects.get(_id=product_id)

    product.image = request.FILES.get('image')
    product.save()

    return Response('Image was uploaded')

    # serializer = ProductSerializer(product, many=False)
    # return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createProductReview(request, pk):
    data = request.data
    user = request.user
    product = Product.objects.get(_id=pk)
    print("user: ",user)

    #1 Check if the user has already reviewed the product
    alreadyExists = product.reviews.filter(user=user.id).exists()
    if alreadyExists:
        content = {'detail': 'You have already reviewed this product'}
        return Response(content, status=status.HTTP_400_BAD_REQUEST)
    
    #2 Check if the rating is between 1 and 5
    try:
        rating = int(data['rating'])
    except (ValueError, TypeError):
        return Response({'detail': 'Invalid rating value'}, status=status.HTTP_400_BAD_REQUEST)

    if rating < 1 or rating > 5:
        content = {'detail': 'Rating must be between 1 and 5'}
        return Response(content, status=status.HTTP_400_BAD_REQUEST)
    
    #3 Create the review
    review = Review.objects.create(
        user=user,
        product=product,
        name=user.first_name,
        rating=rating,
        comment=data['comment']
    )

    # product.numReviews += 1
    # product.rating = (product.rating * (product.numReviews - 1) + data['rating']) / product.numReviews
    # product.save()
    reviews = product.reviews.all()
    product.numReviews = len(reviews)
    
    total=0
    for i in reviews:
        total += i.rating
    product.rating = total / len(reviews) if reviews else 0 

    product.save()  
    return Response('Review added')

    # serializer = ReviewSerializer(review, many=False)
    # return Response(serializer.data)