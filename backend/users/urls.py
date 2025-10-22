from django.urls import path
from .views import RegisterView, UserProfileView, user_list, delete_user

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('profile/', UserProfileView.as_view(), name='profile'),
    path('users/', user_list, name='user_list'),
    path('users/<int:user_id>/delete/', delete_user, name='delete_user'),
]