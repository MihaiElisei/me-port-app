from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import CustomUser, Technology, Project, Article


class CustomUserAdmin(UserAdmin):
    model = CustomUser
    list_display = ("email", "username", "name", "is_staff", "is_active")  
    list_filter = ("is_staff", "is_active")  
    ordering = ("email",)  
    search_fields = ("email", "username", "name")  
    
    fieldsets = (
        (None, {"fields": ("email", "password")}),
        ("Personal Info", {"fields": ("username", "name", "profile_image")}),
        ("Permissions", {"fields": ("is_staff", "is_active", "is_superuser", "groups", "user_permissions")}),
        ("Important Dates", {"fields": ("last_login", "date_joined")}),
    )

    add_fieldsets = (
        (
            None,
            {
                "classes": ("wide",),
                "fields": ("email", "username", "name", "profile_image", "password1", "password2", "is_staff", "is_active"),
            },
        ),
    )
admin.site.register(CustomUser, CustomUserAdmin) 

@admin.register(Technology)
class TechnologyAdmin(admin.ModelAdmin):
    list_display = ("name",)
    search_fields = ("name",)
    ordering = ("name",)

@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ("title", "category", "is_draft", "published_date", "created_at")
    list_filter = ("category", "is_draft")
    search_fields = ("title", "description")
    ordering = ("-published_date",)
    prepopulated_fields = {"slug": ("title",)}
    filter_horizontal = ("technologies",)

@admin.register(Article)
class ArticleAdmin(admin.ModelAdmin):
    list_display = ("title", "category", "author", "is_draft", "published_date", "created_at")
    list_filter = ("category", "is_draft", "author")
    search_fields = ("title", "content", "author__email")
    ordering = ("-published_date",)
    prepopulated_fields = {"slug": ("title",)}
