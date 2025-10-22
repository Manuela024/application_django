from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from django.contrib.auth import get_user_model
from .serializers import UserSerializer, RegisterSerializer
from django.conf import settings

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