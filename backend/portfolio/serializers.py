from .models import Article, Project
from rest_framework import serializers
from django.contrib.auth import get_user_model
from rest_framework.response import Response
from rest_framework import status
from rest_framework import serializers
from django.contrib.auth import get_user_model

User = get_user_model()

class UserRegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'email', 'username', 'password', 'first_name', 'last_name']
        extra_kwargs = {'password': {'write_only': True}, 'username': {'read_only': True}}

    def validate_email(self, value):
        """Ensure email is unique before reaching create()."""
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError({"email": "Email already exists."})
        return value

    def create(self, validated_data):
        email = validated_data.get('email')
        password = validated_data.get('password')
        first_name = validated_data.get('first_name', '').strip().capitalize()
        last_name = validated_data.get('last_name', '').strip().capitalize()

        base_username = f"{first_name}.{last_name}".lower()
        username = base_username
        count = 1
        while User.objects.filter(username=username).exists():
            username = f"{base_username}{count}"
            count += 1

        new_user = User.objects.create_user(
            email=email, username=username, first_name=first_name, last_name=last_name
        )
        new_user.set_password(password)
        new_user.save()
        return new_user
    
class SimpleAuthorSerializer(serializers.ModelSerializer):
    full_name = serializers.SerializerMethodField()
    class Meta:
        model = get_user_model()
        fields = ['id', 'username', 'first_name', 'last_name', 'profile_image', 'full_name' ]
    
    def get_full_name(self, obj):
        return obj.get_full_name() if obj.first_name or obj.last_name else obj.username
    
class UpdateProfileUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = ['id','email', 'username', 'first_name', 'last_name', 'profile_image']
        extra_kwargs = {'password': {'write_only': True}}

class ArticleSerializer(serializers.ModelSerializer):
    author = SimpleAuthorSerializer(read_only=True)
    category = serializers.SerializerMethodField()

    class Meta:
        model = Article
        fields = "__all__"  

    def get_category(self, obj):
        return obj.get_category_display() 
    
class ProjectSerializer(serializers.ModelSerializer):
    author = SimpleAuthorSerializer(read_only=True)
    category = serializers.SerializerMethodField()
    technologies = serializers.SerializerMethodField()  

    class Meta:
        model = Project
        fields = "__all__"
    
    def get_category(self, obj):
        return obj.get_category_display() 
    
    def get_technologies(self, obj): 
        return [tech.name for tech in obj.technologies.all()]  
