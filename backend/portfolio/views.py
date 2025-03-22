
from .serializers import ArticleSerializer, ProjectSerializer, UserRegistrationSerializer, UpdateProfileUserSerializer
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import permission_classes
from rest_framework.pagination import PageNumberPagination
from .models import Article, Project
from django.core.mail import send_mail
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json


class StandardResultsSetPagination(PageNumberPagination):
    page_size = 10
   

@api_view(['POST'])
def register_user(request):
    serializer = UserRegistrationSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    
    return Response({"errors": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def update_profile(request):
    user = request.user
    serializer = UpdateProfileUserSerializer(user, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@permission_classes([IsAuthenticated]) 
def create_project(request):
    user = request.user  

    if not user.is_staff and not user.is_superuser:  
        return Response({"error": "You are not authorized to create projects."}, status=status.HTTP_403_FORBIDDEN)

    serializer = ProjectSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()  
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def project_list(request):
    projects = Project.objects.all()

    paginator = StandardResultsSetPagination()
    result_page = paginator.paginate_queryset(projects, request)
    serializer = ProjectSerializer(result_page, many=True)
    return paginator.get_paginated_response(serializer.data)

@api_view(["GET"])
def project_detail(request, slug):
    project = Project.objects.filter(slug=slug).first()
    if not project:
        return Response({"error": "project not found."}, status=status.HTTP_404_NOT_FOUND)

    serializer = ProjectSerializer(project)
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update_project(request, pk):
    user = request.user
    project = Project.objects.get(id=pk)
    if not user.is_staff and not user.is_superuser:
        return Response({"error": "You are not authorized to update this project."}, status=status.HTTP_403_FORBIDDEN)
    serializer = ProjectSerializer(project, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_project(request, pk):
    user = request.user
    project = Project.objects.get(id=pk)
    if not user.is_staff and not user.is_superuser:
        return Response({"error": "You are not authorized to delete this project."}, status=status.HTTP_403_FORBIDDEN)
    project.delete()
    return Response({"message": "Project deleted."}, status=status.HTTP_204_NO_CONTENT)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_article(request):
    user = request.user
    serializer = ArticleSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save(author=user)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def article_list(request):
    articles = Article.objects.all()
    paginator = StandardResultsSetPagination()
    result_page = paginator.paginate_queryset(articles, request)
    serializer = ArticleSerializer(result_page, many=True)
    return paginator.get_paginated_response(serializer.data)


@api_view(['GET'])
def article_detail(request, slug):
    article = Article.objects.filter(slug=slug).first()
    if not article:
        return Response({"error": "Article not found."}, status=status.HTTP_404_NOT_FOUND)

    serializer = ArticleSerializer(article)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update_article(request, pk):
    user = request.user
    article = Article.objects.get(id=pk)
    if article.author != user:
        return Response({"error": "You are not authorized to update this article."}, status=status.HTTP_403_FORBIDDEN)
    serializer = ArticleSerializer(article, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_article(request, pk):
    user = request.user
    article = Article.objects.get(id=pk)
    if article.author != user:
        return Response({"error": "You are not authorized to delete this article."}, status=status.HTTP_403_FORBIDDEN)
    article.delete()
    return Response({"message": "Article deleted."}, status=status.HTTP_204_NO_CONTENT)


@csrf_exempt  
def contact(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            name = data.get("name")
            email = data.get("email")
            message = data.get("message")

            if not name or not email or not message:
                return JsonResponse({"error": "All fields are required."}, status=400)

            # Send Email
            send_mail(
                subject=f"New Contact Form Submission from {name}",
                message=f"Name: {name}\nEmail: {email}\n\nMessage:\n{message}",
                from_email=email, 
                recipient_list=["mihai.m.elisei@gmail.com"],  
                fail_silently=False,
            )

            return JsonResponse({"message": "Email sent successfully!"})

        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)

    return JsonResponse({"error": "Invalid request method."}, status=405)