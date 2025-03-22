from django.urls import path
from . import views

urlpatterns = [
    path('register/', views.register_user, name='register_user'),
    path('update-profile/', views.update_profile, name='update_profile'),
    path('create-project/', views.create_project, name='create_project'),
    path("contact/", views.contact, name="contact"),
    path('projects/', views.project_list, name='project_list'),
    path('projects/<slug:slug>/', views.project_detail, name='project_detail'),
    path('update-project/<int:pk>/', views.update_project, name='update_project'),
    path('delete-project/<int:pk>/', views.delete_project, name='delete_project'),
    path('create-article/', views.create_article, name='create_article'),
    path('articles/', views.article_list, name='article_list'),
    path("articles/<slug:slug>/", views.article_detail, name="article-detail"),
    path('update-article/<int:pk>/', views.update_article, name='update_article'),
    path('delete-article/<int:pk>/', views.delete_article, name='delete_article'),
    
]