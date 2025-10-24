# # from django.contrib import admin
# # from django.urls import path, include
# # from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

# # urlpatterns = [
# #     path('admin/', admin.site.urls),
# #     path('api/auth/', include('users.urls')),
# #     path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
# #     path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
# # ]

# from django.urls import path

# from . import views

# urlpatterns = [
#     # ⭐⭐ SUPPRIME "auth/" de tous les chemins ⭐⭐
#     path('register/', RegisterView.as_view(), name='register'),
#     path('profile/', UserProfileView.as_view(), name='profile'),
#     path('users/', user_list, name='user_list'),
#     path('users/<int:user_id>/delete/', delete_user, name='delete_user'),
    
#     # Nouvelles URLs - SUPPRIME "auth/" ici aussi
#     path('send-password-reset-code/', views.send_password_reset_code, name='send_password_reset_code'),
#     path('verify-reset-code/', views.verify_reset_code, name='verify_reset_code'),
#     path('change-password-after-verification/', views.change_password_after_verification, name='change_password_after_verification'),
# ]

from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/auth/', include('users.urls')),  # ⭐ TOUTES les vues viennent de l'app 'users'
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]