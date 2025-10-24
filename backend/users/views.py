# # from rest_framework import generics, permissions, status
# # from rest_framework.response import Response
# # from rest_framework.decorators import api_view, permission_classes
# # from django.contrib.auth import get_user_model
# # from .serializers import UserSerializer, RegisterSerializer
# # from django.conf import settings

# # User = get_user_model()

# # class RegisterView(generics.CreateAPIView):
# #     queryset = User.objects.all()
# #     permission_classes = [permissions.AllowAny]
# #     serializer_class = RegisterSerializer

# # class UserProfileView(generics.RetrieveUpdateAPIView):
# #     serializer_class = UserSerializer
# #     permission_classes = [permissions.IsAuthenticated]

# #     def get_object(self):
# #         return self.request.user

# # @api_view(['GET'])
# # @permission_classes([permissions.IsAuthenticated])
# # def user_list(request):
# #     if request.user.email == settings.ADMIN_EMAIL:
# #         users = User.objects.all()
# #         serializer = UserSerializer(users, many=True)
# #         return Response(serializer.data)
# #     return Response({"detail": "Accès non autorisé."}, status=status.HTTP_403_FORBIDDEN)

# # @api_view(['DELETE'])
# # @permission_classes([permissions.IsAuthenticated])
# # def delete_user(request, user_id):
# #     if request.user.email == settings.ADMIN_EMAIL:
# #         try:
# #             user = User.objects.get(id=user_id)
# #             if user != request.user:
# #                 user.delete()
# #                 return Response({"detail": "Utilisateur supprimé."})
# #             return Response({"detail": "Impossible de supprimer votre propre compte."}, status=status.HTTP_400_BAD_REQUEST)
# #         except User.DoesNotExist:
# #             return Response({"detail": "Utilisateur non trouvé."}, status=status.HTTP_404_NOT_FOUND)
# #     return Response({"detail": "Accès non autorisé."}, status=status.HTTP_403_FORBIDDEN)
# from rest_framework import generics, permissions, status
# from rest_framework.response import Response
# from rest_framework.decorators import api_view, permission_classes
# from django.contrib.auth import get_user_model
# from .serializers import UserSerializer, RegisterSerializer, ChangePasswordSerializer
# from django.conf import settings
# from django.core.mail import send_mail
# from django.utils import timezone
# from datetime import timedelta
# from .models import VerificationCode
# import traceback

# User = get_user_model()

# class RegisterView(generics.CreateAPIView):
#     queryset = User.objects.all()
#     permission_classes = [permissions.AllowAny]
#     serializer_class = RegisterSerializer

# class UserProfileView(generics.RetrieveUpdateAPIView):
#     serializer_class = UserSerializer
#     permission_classes = [permissions.IsAuthenticated]

#     def get_object(self):
#         return self.request.user

# @api_view(['GET'])
# @permission_classes([permissions.IsAuthenticated])
# def user_list(request):
#     if request.user.email == settings.ADMIN_EMAIL:
#         users = User.objects.all()
#         serializer = UserSerializer(users, many=True)
#         return Response(serializer.data)
#     return Response({"detail": "Accès non autorisé."}, status=status.HTTP_403_FORBIDDEN)

# @api_view(['DELETE'])
# @permission_classes([permissions.IsAuthenticated])
# def delete_user(request, user_id):
#     if request.user.email == settings.ADMIN_EMAIL:
#         try:
#             user = User.objects.get(id=user_id)
#             if user != request.user:
#                 user.delete()
#                 return Response({"detail": "Utilisateur supprimé."})
#             return Response({"detail": "Impossible de supprimer votre propre compte."}, status=status.HTTP_400_BAD_REQUEST)
#         except User.DoesNotExist:
#             return Response({"detail": "Utilisateur non trouvé."}, status=status.HTTP_404_NOT_FOUND)
#     return Response({"detail": "Accès non autorisé."}, status=status.HTTP_403_FORBIDDEN)

# @api_view(['POST'])
# @permission_classes([permissions.AllowAny])
# def send_password_reset_code(request):
#     try:
#         email = request.data.get('email')
        
#         if not email:
#             return Response(
#                 {'error': 'L\'email est requis'}, 
#                 status=status.HTTP_400_BAD_REQUEST
#             )
        
#         # Vérifier si l'utilisateur existe
#         try:
#             user = User.objects.get(email=email)
#         except User.DoesNotExist:
#             return Response(
#                 {'error': 'Aucun utilisateur trouvé avec cet email'}, 
#                 status=status.HTTP_404_NOT_FOUND
#             )
        
#         # Générer le code
#         verification_code = VerificationCode.generate_code(email)
        
#         # ⭐ EMAIL SIMPLE SANS ACCENTS
#         send_mail(
#             'Code de verification',
#             f'Votre code de verification est: {verification_code.code}\n\nCe code expirera dans 15 minutes.',
#             settings.DEFAULT_FROM_EMAIL,
#             [email],
#             fail_silently=False,
#         )
        
#         return Response({
#             'success': True,
#             'message': 'Code envoyé avec succès à votre email',
#             'email': email
#         })
        
#     except Exception as e:
#         print(f"Erreur: {e}")
#         return Response(
#             {'error': 'Erreur lors de l\'envoi de l\'email'}, 
#             status=status.HTTP_500_INTERNAL_SERVER_ERROR
#         )
        
#         # Test utilisateur
#         print("2. Recherche de l'utilisateur...")
#         try:
#             user = User.objects.get(email=email)
#             print(f"3. Utilisateur trouvé: {user.email}")
#         except User.DoesNotExist:
#             print("3. ❌ Utilisateur non trouvé")
#             return Response(
#                 {'error': 'Aucun utilisateur trouvé avec cet email'}, 
#                 status=status.HTTP_404_NOT_FOUND
#             )
        
#         # Test génération code
#         print("4. Génération du code...")
#         try:
#             verification_code = VerificationCode.generate_code(email)
#             print(f"5. Code généré: {verification_code.code}")
#         except Exception as e:
#             print(f"5. ❌ Erreur génération code: {e}")
#             traceback.print_exc()
#             return Response(
#                 {'error': f'Erreur génération code: {str(e)}'}, 
#                 status=status.HTTP_500_INTERNAL_SERVER_ERROR
#             )
        
#         # Test email
#         print("6. Envoi de l'email...")
#         try:
#             print(f"   - De: {settings.DEFAULT_FROM_EMAIL}")
#             print(f"   - À: {email}")
#             print(f"   - Code: {verification_code.code}")
#             print(f"   - Backend: {settings.EMAIL_BACKEND}")
            
#             # ⭐ EMAIL SANS CARACTÈRES SPÉCIAUX (évite l'erreur d'encodage)
#             send_mail(
#                 'Code de verification',  # Sans accents
#                 f'Votre code de verification est: {verification_code.code}\n\nCe code expirera dans 15 minutes.',
#                 settings.DEFAULT_FROM_EMAIL,
#                 [email],
#                 fail_silently=False,
#             )
#             print("7. ✅ Email envoyé avec succès!")
            
#             return Response({
#                 'success': True,  # ⭐ AJOUTÉ
#                 'message': 'Code de vérification envoyé avec succès',
#                 'email': email
#             })
            
#         except Exception as e:
#             print(f"7. ❌ Erreur envoi email: {e}")
#             traceback.print_exc()
#             verification_code.delete()
#             return Response(
#                 {'error': f'Erreur lors de l\'envoi de l\'email: {str(e)}'}, 
#                 status=status.HTTP_500_INTERNAL_SERVER_ERROR
#             )
            
#     except Exception as e:
#         print(f"💥 ERREUR GLOBALE: {str(e)}")
#         traceback.print_exc()
#         return Response(
#             {'error': f'Erreur serveur: {str(e)}'}, 
#             status=status.HTTP_500_INTERNAL_SERVER_ERROR
#         )

# @api_view(['POST'])
# @permission_classes([permissions.AllowAny])
# def verify_reset_code(request):
#     email = request.data.get('email')
#     code = request.data.get('code')
    
#     if not email or not code:
#         return Response(
#             {'error': 'L\'email et le code sont requis'}, 
#             status=status.HTTP_400_BAD_REQUEST
#         )
    
#     try:
#         verification_code = VerificationCode.objects.get(
#             email=email, 
#             code=code,
#             is_used=False
#         )
        
#         if not verification_code.is_valid():
#             verification_code.delete()
#             return Response(
#                 {'error': 'Code expiré ou invalide'}, 
#                 status=status.HTTP_400_BAD_REQUEST
#             )
        
#         verification_code.is_used = True
#         verification_code.save()
        
#         return Response({
#             'success': True,
#             'message': 'Code vérifié avec succès'
#         })
        
#     except VerificationCode.DoesNotExist:
#         return Response(
#             {'error': 'Code invalide'}, 
#             status=status.HTTP_400_BAD_REQUEST
#         )

# @api_view(['POST'])
# @permission_classes([permissions.AllowAny])
# def change_password_after_verification(request):
#     email = request.data.get('email')
#     new_password = request.data.get('new_password')
#     confirm_password = request.data.get('confirm_password')
    
#     if not email or not new_password or not confirm_password:
#         return Response(
#             {'error': 'Tous les champs sont requis'}, 
#             status=status.HTTP_400_BAD_REQUEST
#         )
    
#     if new_password != confirm_password:
#         return Response(
#             {'error': 'Les mots de passe ne correspondent pas'}, 
#             status=status.HTTP_400_BAD_REQUEST
#         )
    
#     try:
#         user = User.objects.get(email=email)
        
#         recent_verification = VerificationCode.objects.filter(
#             email=email,
#             is_used=True,
#             expires_at__gt=timezone.now() - timedelta(hours=1)
#         ).exists()
        
#         if not recent_verification:
#             return Response(
#                 {'error': 'Vérification requise avant de changer le mot de passe'}, 
#                 status=status.HTTP_400_BAD_REQUEST
#             )
        
#         user.set_password(new_password)
#         user.save()
        
#         VerificationCode.objects.filter(email=email).delete()
        
#         return Response({
#             'success': True,
#             'message': 'Mot de passe changé avec succès'
#         })
        
#     except User.DoesNotExist:
#         return Response(
#             {'error': 'Utilisateur non trouvé'}, 
#             status=status.HTTP_404_NOT_FOUND
#         )
#         # ... TOUTES TES FONCTIONS EXISTANTES RESTENT ...

# # ⭐⭐⭐ AJOUTE CETTE FONCTION À LA FIN ⭐⭐⭐
# # @api_view(['POST'])
# # @permission_classes([permissions.IsAuthenticated])
# # def change_password(request):
# #     current_password = request.data.get('current_password')
# #     new_password = request.data.get('new_password')
    
# #     if not current_password or not new_password:
# #         return Response(
# #             {'error': 'Le mot de passe actuel et le nouveau sont requis'}, 
# #             status=status.HTTP_400_BAD_REQUEST
# #         )
    
# #     # Vérifier le mot de passe actuel
# #     if not request.user.check_password(current_password):
# #         return Response(
# #             {'error': 'Mot de passe actuel incorrect'}, 
# #             status=status.HTTP_400_BAD_REQUEST
# #         )
    
# #     # Changer le mot de passe
# #     request.user.set_password(new_password)
# #     request.user.save()
    
# #     return Response({
# #         'success': True,
# #         'message': 'Mot de passe changé avec succès'
# #     })
# # # ⭐⭐⭐ FIN DE L'AJOUT ⭐⭐⭐
# @api_view(['POST'])
# @permission_classes([permissions.IsAuthenticated])
# def change_password(request):
#     current_password = request.data.get('current_password')
#     new_password = request.data.get('new_password')
    
#     if not current_password or not new_password:
#         return Response(
#             {'error': 'Le mot de passe actuel et le nouveau sont requis'}, 
#             status=status.HTTP_400_BAD_REQUEST
#         )
    
#     # Vérifier le mot de passe actuel
#     if not request.user.check_password(current_password):
#         return Response(
#             {'error': 'Mot de passe actuel incorrect'}, 
#             status=status.HTTP_400_BAD_REQUEST
#         )
    
#     # ⭐ ENVOYER UN EMAIL DE NOTIFICATION
#     try:
#         send_mail(
#             'Tentative de changement de mot de passe',
#             f'''Bonjour {request.user.first_name or request.user.username},

# Une tentative de changement de mot de passe a été détectée sur votre compte.

# Si vous êtes à l'origine de cette action, vous pouvez ignorer cet email.

# Si ce n'est pas vous, veuillez contacter immédiatement le support.

# Date: {timezone.now().strftime("%d/%m/%Y à %H:%M")}
# Adresse IP: {get_client_ip(request)}

# L'équipe de sécurité''',
#             settings.DEFAULT_FROM_EMAIL,
#             [request.user.email],
#             fail_silently=False,
#         )
#     except Exception as e:
#         print(f"Erreur envoi email notification: {e}")
#         # On continue quand même le changement de mot de passe
    
#     # Changer le mot de passe
#     request.user.set_password(new_password)
#     request.user.save()
    
#     # ⭐ ENVOYER UN EMAIL DE CONFIRMATION
#     try:
#         send_mail(
#             'Mot de passe changé avec succès',
#             f'''Bonjour {request.user.first_name or request.user.username},

# Votre mot de passe a été changé avec succès.

# Si vous n'êtes pas à l'origine de cette action, veuillez contacter immédiatement le support.

# Date: {timezone.now().strftime("%d/%m/%Y à %H:%M")}

# L'équipe de sécurité''',
#             settings.DEFAULT_FROM_EMAIL,
#             [request.user.email],
#             fail_silently=False,
#         )
#     except Exception as e:
#         print(f"Erreur envoi email confirmation: {e}")
    
#     return Response({
#         'success': True,
#         'message': 'Mot de passe changé avec succès - Un email de confirmation a été envoyé'
#     })

#    def get_client_ip(request):
#     x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
#     if x_forwarded_for:
#         ip = x_forwarded_for.split(',')[0]
#     else:
#         ip = request.META.get('REMOTE_ADDR')
#     return ip

from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from django.contrib.auth import get_user_model
from .serializers import UserSerializer, RegisterSerializer
from django.conf import settings
from django.core.mail import send_mail
from django.utils import timezone
from datetime import timedelta
from .models import VerificationCode
import random

User = get_user_model()

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = RegisterSerializer

class UserProfileView(generics.RetrieveUpdateAPIView):
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        return self.request.user

@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
def user_list(request):
    if request.user.email == settings.ADMIN_EMAIL:
        users = User.objects.all()
        serializer = UserSerializer(users, many=True)
        return Response(serializer.data)
    return Response({"detail": "Accès non autorisé."}, status=status.HTTP_403_FORBIDDEN)

@api_view(['DELETE'])
@permission_classes([permissions.IsAuthenticated])
def delete_user(request, user_id):
    if request.user.email == settings.ADMIN_EMAIL:
        try:
            user = User.objects.get(id=user_id)
            if user != request.user:
                user.delete()
                return Response({"detail": "Utilisateur supprimé."})
            return Response({"detail": "Impossible de supprimer votre propre compte."}, status=status.HTTP_400_BAD_REQUEST)
        except User.DoesNotExist:
            return Response({"detail": "Utilisateur non trouvé."}, status=status.HTTP_404_NOT_FOUND)
    return Response({"detail": "Accès non autorisé."}, status=status.HTTP_403_FORBIDDEN)

# @api_view(['POST'])
# @permission_classes([permissions.IsAuthenticated])  # Change de AllowAny à IsAuthenticated
# def send_password_reset_code(request):
#     try:
#         # UTILISE L'EMAIL DE L'UTILISATEUR CONNECTÉ
#         email = request.user.email
        
#         # Supprime la vérification par email puisque l'utilisateur est déjà authentifié
#         user = request.user
        
#         verification_code = VerificationCode.generate_code(email)
        
#         try:
#             send_mail(
#                 'Code de verification pour changement de mot de passe',
#                 f'Votre code de verification est: {verification_code.code}\n\nCe code expirera dans 15 minutes.',
#                 settings.DEFAULT_FROM_EMAIL,
#                 [email],
#                 fail_silently=False,
#             )
            
#             return Response({
#                 'success': True,
#                 'message': 'Code envoyé avec succès à votre email',
#                 'email': email
#             })
            
#         except Exception as e:
#             verification_code.delete()
#             return Response(
#                 {'error': 'Erreur lors de l\'envoi de l\'email'}, 
#                 status=status.HTTP_500_INTERNAL_SERVER_ERROR
#             )
        
#     except Exception as e:
#         return Response(
#             {'error': 'Erreur serveur'}, 
#             status=status.HTTP_500_INTERNAL_SERVER_ERROR
#         )



@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
def send_password_reset_code(request):
    try:
        email = request.user.email
        
        print(f"🚀 Début envoi email à: {email}")
        
        verification_code = VerificationCode.generate_code(email)
        print(f"✅ Code généré: {verification_code.code}")
        
        # TEST SIMPLE d'abord
        try:
            print(f"📧 Tentative d'envoi email...")
            print(f"   - De: {settings.DEFAULT_FROM_EMAIL}")
            print(f"   - À: {email}") 
            print(f"   - Code: {verification_code.code}")
            print(f"   - Backend: {settings.EMAIL_BACKEND}")
            
            send_mail(
                'Code de confirmation',
                f'Votre code: {verification_code.code}',
                settings.DEFAULT_FROM_EMAIL,
                [email],
                fail_silently=False,  # Important: pour voir les erreurs
            )
            
            print(f"✅ Email envoyé avec succès!")
            
            return Response({
                'success': True,
                'message': 'Code envoyé avec succès',
                'email': email
            })
            
        except Exception as e:
            print(f"❌ ERREUR envoi email: {str(e)}")
            verification_code.delete()
            return Response(
                {'error': f'Erreur envoi email: {str(e)}'}, 
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
        
    except Exception as e:
        print(f"💥 ERREUR globale: {str(e)}")
        return Response(
            {'error': 'Erreur serveur'}, 
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )
# @api_view(['POST'])
# @permission_classes([permissions.AllowAny])
# def send_password_reset_code(request):
#     try:
#         email = request.data.get('email')
        
#         if not email:
#             return Response(
#                 {'error': 'L\'email est requis'}, 
#                 status=status.HTTP_400_BAD_REQUEST
#             )
        
#         try:
#             user = User.objects.get(email=email)
#         except User.DoesNotExist:
#             return Response(
#                 {'error': 'Aucun utilisateur trouvé avec cet email'}, 
#                 status=status.HTTP_404_NOT_FOUND
#             )
        
#         verification_code = VerificationCode.generate_code(email)
        
#         try:
#             send_mail(
#                 'Code de verification',
#                 f'Votre code de verification est: {verification_code.code}\n\nCe code expirera dans 15 minutes.',
#                 settings.DEFAULT_FROM_EMAIL,
#                 [email],
#                 fail_silently=False,
#             )
            
#             return Response({
#                 'success': True,
#                 'message': 'Code envoyé avec succès à votre email',
#                 'email': email
#             })
            
#         except Exception as e:
#             verification_code.delete()
#             return Response(
#                 {'error': 'Erreur lors de l\'envoi de l\'email'}, 
#                 status=status.HTTP_500_INTERNAL_SERVER_ERROR
#             )
        
#     except Exception as e:
#         return Response(
#             {'error': 'Erreur serveur'}, 
#             status=status.HTTP_500_INTERNAL_SERVER_ERROR
#         )

@api_view(['POST'])
@permission_classes([permissions.AllowAny])
def verify_reset_code(request):
    email = request.data.get('email')
    code = request.data.get('code')
    
    if not email or not code:
        return Response(
            {'error': 'L\'email et le code sont requis'}, 
            status=status.HTTP_400_BAD_REQUEST
        )
    
    try:
        verification_code = VerificationCode.objects.get(
            email=email, 
            code=code,
            is_used=False
        )
        
        if not verification_code.is_valid():
            verification_code.delete()
            return Response(
                {'error': 'Code expiré ou invalide'}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        verification_code.is_used = True
        verification_code.save()
        
        return Response({
            'success': True,
            'message': 'Code vérifié avec succès'
        })
        
    except VerificationCode.DoesNotExist:
        return Response(
            {'error': 'Code invalide'}, 
            status=status.HTTP_400_BAD_REQUEST
        )

@api_view(['POST'])
@permission_classes([permissions.AllowAny])
def change_password_after_verification(request):
    email = request.data.get('email')
    new_password = request.data.get('new_password')
    confirm_password = request.data.get('confirm_password')
    
    if not email or not new_password or not confirm_password:
        return Response(
            {'error': 'Tous les champs sont requis'}, 
            status=status.HTTP_400_BAD_REQUEST
        )
    
    if new_password != confirm_password:
        return Response(
            {'error': 'Les mots de passe ne correspondent pas'}, 
            status=status.HTTP_400_BAD_REQUEST
        )
    
    try:
        user = User.objects.get(email=email)
        
        recent_verification = VerificationCode.objects.filter(
            email=email,
            is_used=True,
            expires_at__gt=timezone.now() - timedelta(hours=1)
        ).exists()
        
        if not recent_verification:
            return Response(
                {'error': 'Vérification requise avant de changer le mot de passe'}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        user.set_password(new_password)
        user.save()
        
        VerificationCode.objects.filter(email=email).delete()
        
        return Response({
            'success': True,
            'message': 'Mot de passe changé avec succès'
        })
        
    except User.DoesNotExist:
        return Response(
            {'error': 'Utilisateur non trouvé'}, 
            status=status.HTTP_404_NOT_FOUND
        )

@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
def change_password(request):
    current_password = request.data.get('current_password')
    new_password = request.data.get('new_password')
    
    if not current_password or not new_password:
        return Response(
            {'error': 'Le mot de passe actuel et le nouveau sont requis'}, 
            status=status.HTTP_400_BAD_REQUEST
        )
    
    if not request.user.check_password(current_password):
        return Response(
            {'error': 'Mot de passe actuel incorrect'}, 
            status=status.HTTP_400_BAD_REQUEST
        )
    
    request.user.set_password(new_password)
    request.user.save()
    
    return Response({
        'success': True,
        'message': 'Mot de passe changé avec succès'
    })


# @api_view(['POST'])
# @permission_classes([permissions.IsAuthenticated])
# def confirm_and_change_password(request):
#     try:
#         confirmation_code = request.data.get('confirmation_code')
#         current_password = request.data.get('current_password')
#         new_password = request.data.get('new_password')
        
#         # Vérifications de base
#         if not confirmation_code or not current_password or not new_password:
#             return Response(
#                 {'error': 'Tous les champs sont requis'}, 
#                 status=status.HTTP_400_BAD_REQUEST
#             )
        
#         # Vérifier le code de confirmation
#         try:
#             verification_code = VerificationCode.objects.get(
#                 email=request.user.email,
#                 code=confirmation_code,
#                 is_used=False
#             )
            
#             if not verification_code.is_valid():
#                 verification_code.delete()
#                 return Response(
#                     {'error': 'Code expiré'}, 
#                     status=status.HTTP_400_BAD_REQUEST
#                 )
                
#         except VerificationCode.DoesNotExist:
#             return Response(
#                 {'error': 'Code de confirmation invalide'}, 
#                 status=status.HTTP_400_BAD_REQUEST
#             )
        
#         # Vérifier le mot de passe actuel
#         if not request.user.check_password(current_password):
#             return Response(
#                 {'error': 'Mot de passe actuel incorrect'}, 
#                 status=status.HTTP_400_BAD_REQUEST
#             )
        
#         # Changer le mot de passe
#         request.user.set_password(new_password)
#         request.user.save()
        
#         # Marquer le code comme utilisé
#         verification_code.is_used = True
#         verification_code.save()
        
#         return Response({
#             'success': True,
#             'message': 'Mot de passe changé avec succès'
#         })
        
#     except Exception as e:
#         return Response(
#             {'error': 'Erreur serveur'}, 
#             status=status.HTTP_500_INTERNAL_SERVER_ERROR
#         )

@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
def confirm_and_change_password(request):
    try:
        confirmation_code = request.data.get('confirmation_code')
        current_password = request.data.get('current_password')
        new_password = request.data.get('new_password')
        
        print(f"🔍 DEBUG - Code reçu du frontend: '{confirmation_code}'")
        print(f"🔍 DEBUG - Email utilisateur: '{request.user.email}'")
        print(f"🔍 DEBUG - Longueur du code: {len(confirmation_code) if confirmation_code else 0}")
        
        # Vérifications de base
        if not confirmation_code or not current_password or not new_password:
            return Response(
                {'error': 'Tous les champs sont requis'}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # Vérifier le code de confirmation
        try:
            print(f"🔍 DEBUG - Recherche du code dans la base...")
            
            verification_code = VerificationCode.objects.get(
                email=request.user.email,
                code=confirmation_code,
                is_used=False
            )
            
            print(f"✅ DEBUG - Code trouvé en base: '{verification_code.code}'")
            print(f"✅ DEBUG - Code expiré à: {verification_code.expires_at}")
            print(f"✅ DEBUG - Maintenant: {timezone.now()}")
            print(f"✅ DEBUG - Code valide: {verification_code.is_valid()}")
            
            if not verification_code.is_valid():
                print("❌ DEBUG - Code expiré")
                verification_code.delete()
                return Response(
                    {'error': 'Code expiré'}, 
                    status=status.HTTP_400_BAD_REQUEST
                )
                
        except VerificationCode.DoesNotExist:
            print("❌ DEBUG - Code non trouvé en base de données")
            
            # Affiche tous les codes existants pour cet email
            all_codes = VerificationCode.objects.filter(email=request.user.email)
            print(f"🔍 DEBUG - Tous les codes pour {request.user.email}:")
            for code in all_codes:
                print(f"  - Code: '{code.code}', Utilisé: {code.is_used}, Expire: {code.expires_at}")
            
            return Response(
                {'error': 'Code de confirmation invalide'}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # Vérifier le mot de passe actuel
        if not request.user.check_password(current_password):
            return Response(
                {'error': 'Mot de passe actuel incorrect'}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # Changer le mot de passe
        request.user.set_password(new_password)
        request.user.save()
        
        # Marquer le code comme utilisé
        verification_code.is_used = True
        verification_code.save()
        
        return Response({
            'success': True,
            'message': 'Mot de passe changé avec succès'
        })
        
    except Exception as e:
        print(f"💥 DEBUG - Erreur globale: {e}")
        return Response(
            {'error': 'Erreur serveur'}, 
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )