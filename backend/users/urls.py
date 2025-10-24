# from django.urls import path
# from .views import RegisterView, UserProfileView, user_list, delete_user, change_password
# from . import views

# urlpatterns = [
#     path('register/', RegisterView.as_view(), name='register'),
#     path('profile/', UserProfileView.as_view(), name='profile'),
#     path('users/', user_list, name='user_list'),
#     path('users/<int:user_id>/delete/', delete_user, name='delete_user'),
    
#     # Nouvelles URLs
#     path('send-password-reset-code/', views.send_password_reset_code, name='send_password_reset_code'),
#     path('verify-reset-code/', views.verify_reset_code, name='verify_reset_code'),
#     path('change-password-after-verification/', views.change_password_after_verification, name='change_password_after_verification'),
#     path('change-password/', change_password, name='change_password'),
#      path('api/auth/request-password-change/', views.send_password_reset_code, name='request_password_change'),
#       path('api/auth/confirm-and-change-password/', views.confirm_and_change_password, name='confirm_and_change_password'),
# ]

from django.urls import path
from . import views  # Importe le module views

urlpatterns = [
    path('register/', views.RegisterView.as_view(), name='register'),
    path('profile/', views.UserProfileView.as_view(), name='profile'),
    path('users/', views.user_list, name='user_list'),
    path('users/<int:user_id>/delete/', views.delete_user, name='delete_user'),
    
    # Nouvelles URLs
    path('send-password-reset-code/', views.send_password_reset_code, name='send_password_reset_code'),
    path('verify-reset-code/', views.verify_reset_code, name='verify_reset_code'),
    path('change-password-after-verification/', views.change_password_after_verification, name='change_password_after_verification'),
    path('change-password/', views.change_password, name='change_password'),
    path('request-password-change/', views.send_password_reset_code, name='request_password_change'),
    path('confirm-and-change-password/', views.confirm_and_change_password, name='confirm_and_change_password'),
]