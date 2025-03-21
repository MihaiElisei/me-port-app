from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import Category, CustomUser, Article, Project, Technology

class CustomUserAdmin(UserAdmin):
    list_display = ("email", "username", "profile_image")  # Show profile image in the list
    fieldsets = UserAdmin.fieldsets + (  
        ("Profile Details", {"fields": ("name", "profile_image")}),
    )
    add_fieldsets = UserAdmin.add_fieldsets + (
        ("Profile Details", {"fields": ("name", "profile_image")}),
    )

admin.site.register(CustomUser, CustomUserAdmin)


@admin.register(Article)
class ArticleAdmin(admin.ModelAdmin):
    list_display = ("title", "published_date", "is_draft")
    filter_horizontal = ("categories",) 

admin.site.register(Category)

class ProjectAdmin(admin.ModelAdmin):
    list_display = ('title', 'category', 'published_date', 'is_draft')
admin.site.register(Project, ProjectAdmin)

