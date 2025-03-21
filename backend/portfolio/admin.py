from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import CustomUser, Article, Project, Technology

class CustomUserAdmin(UserAdmin):
    list_display = ('email', 'username', 'is_staff', 'is_active')

admin.site.register(CustomUser, CustomUserAdmin)

class ArticleAdmin(admin.ModelAdmin):
    list_display = ('title', 'author', 'published_date', 'is_draft', 'category')

admin.site.register(Article, ArticleAdmin)

class ProjectAdmin(admin.ModelAdmin):
    list_display = ('title', 'category', 'published_date', 'is_draft')
admin.site.register(Project, ProjectAdmin)

