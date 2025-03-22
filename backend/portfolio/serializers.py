from .models import Article, Project
from rest_framework import serializers
from django.contrib.auth import get_user_model


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
