from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import Article, Category, Project, Technology

class UserRegistrationSerializer(serializers.ModelSerializer):

    class Meta:
        model = get_user_model()
        fields = ['id','email', 'username', 'password', 'first_name', 'last_name']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        email = validated_data['email']
        username = validated_data['username']
        password = validated_data['password']
        first_name = validated_data['first_name']
        last_name = validated_data['last_name']

        user = get_user_model()
        new_user = user.objects.create_user(email=email, username=username, first_name=first_name, last_name=last_name)
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

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ["id", "name"]


class ArticleSerializer(serializers.ModelSerializer):
    categories = CategorySerializer(many=True, read_only=True)  
    author = SimpleAuthorSerializer(read_only=True)
    
    class Meta:
        model = Article
        fields = "__all__"  


class ProjectSerializer(serializers.ModelSerializer):
    technologies = serializers.ListField(child=serializers.CharField(), write_only=True, required=False)
    technologies_display = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Project
        fields = [
            "id",
            "title",
            "description",
            "category",
            "technologies",
            "technologies_display",
            "github_link",
            "live_demo",
            "created_at",
        ]

    def get_technologies_display(self, obj):
        """Returns a list of technology names"""
        return [tech.name for tech in obj.technologies.all()]

    def create(self, validated_data):
        tech_names = validated_data.pop("technologies", [])

        project = Project.objects.create(**validated_data)

        technology_objects = []
        for name in tech_names:
            tech_obj, _ = Technology.objects.get_or_create(name=name.strip())  # Ensure no duplicates
            technology_objects.append(tech_obj)

        project.technologies.set(technology_objects)
        return project
