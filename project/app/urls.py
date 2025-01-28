from django.urls import path
from . import views

urlpatterns = [
    path('', views.react_list),
    path('create/', views.react_create),
    path('update/<int:pk>/', views.react_update),
    path('delete/<int:pk>/', views.react_delete),
] 