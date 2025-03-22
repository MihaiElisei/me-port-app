from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils.text import slugify
from django.utils import timezone
from django.conf import settings

class CustomUser(AbstractUser):
    name = models.CharField(max_length=255, null=True, blank=True)
    email = models.EmailField(unique=True)
    profile_image = models.ImageField(upload_to="profile_pics/", null=True, blank=True) 

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["username"]

    def save(self, *args, **kwargs):
        if self.first_name and self.last_name:
            self.name = f"{self.first_name} {self.last_name}"
        super().save(*args, **kwargs)

    def __str__(self):
        return self.email

class Technology(models.Model):
    name = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.name

class Project(models.Model):

    PROJECT_CATEGORIES = [
        ("web_dev", "Web Development"),
        ("mobile_app", "Mobile App Development"),
        ("ai_ml", "AI & Machine Learning"),
        ("cybersecurity", "Cybersecurity"),
        ("data_science", "Data Science"),
        ("game_dev", "Game Development"),
        ("cloud", "Cloud Computing"),
        ("devops", "DevOps & Automation"),
        ("software", "Software Engineering"),
        ("other", "Other"),
    ]

    title = models.CharField(max_length=255)
    slug = models.SlugField(max_length=255, unique=True, blank=True)
    description = models.TextField()
    project_image = models.ImageField(upload_to="projects/", null=True, blank=True)
    technologies = models.ManyToManyField(Technology, related_name="projects")
    github_link = models.URLField(blank=True, null=True)
    live_demo = models.URLField(blank=True, null=True)
    category = models.CharField(max_length=50, choices=PROJECT_CATEGORIES,default="other")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    published_date = models.DateTimeField(null=True, blank=True)
    is_draft = models.BooleanField(default=True)

    class Meta:
        ordering = ["-published_date"]

    def __str__(self):
        return self.title

    def save(self, *args, **kwargs):
        if not self.slug:
            base_slug = slugify(self.title)
            slug = base_slug
            n = 1
            while Project.objects.filter(slug=slug).exists():
                slug = f"{base_slug}-{n}"
                n += 1
            self.slug = slug

        if not self.is_draft and not self.published_date:
            self.published_date = timezone.now()

        super().save(*args, **kwargs)


class Article(models.Model):

    CATEGORY_CHOICES = [
        ("tech", "Technology"),
        ("programming", "Programming"),
        ("web_dev", "Web Development"),
        ("ai_ml", "Artificial Intelligence & Machine Learning"),
        ("cybersecurity", "Cybersecurity"),
        ("software", "Software Engineering"),
        ("business", "Business & Startups"),
        ("data_science", "Data Science"),
        ("finance", "Finance & Investment"),
        ("design", "UI/UX & Product Design"),
        ("other", "Other")
    ]

    title = models.CharField(max_length=255)
    slug = models.SlugField(max_length=255, unique=True, blank=True)
    content = models.TextField()
    article_image = models.ImageField(upload_to="articles/", null=True, blank=True)
    author = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, related_name="articles", null=True
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    published_date = models.DateTimeField(null=True, blank=True)
    is_draft = models.BooleanField(default=True)
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES, default="other")

    class Meta:
        ordering = ["-published_date"]

    def save(self, *args, **kwargs):
        if not self.slug:
            base_slug = slugify(self.title)
            slug = base_slug
            n = 1
            while Article.objects.filter(slug=slug).exists():
                slug = f"{base_slug}-{n}"
                n += 1
            self.slug = slug

        if not self.is_draft and not self.published_date:
            self.published_date = timezone.now()

        super().save(*args, **kwargs)

