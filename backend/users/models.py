# from django.contrib.auth.models import AbstractUser
# from django.db import models

# class CustomUser(AbstractUser):
#     email = models.EmailField(unique=True)
#     phone = models.CharField(max_length=20, blank=True)
#     address = models.TextField(blank=True)
#     city = models.CharField(max_length=100, blank=True)
#     postal_code = models.CharField(max_length=20, blank=True)
#     country = models.CharField(max_length=100, blank=True)
#     date_joined = models.DateTimeField(auto_now_add=True)
    
#     def __str__(self):
#         return self.email
    
#     @property
#     def is_admin_user(self):
#         return self.email == 'admin@example.com'

from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils import timezone
from datetime import timedelta
import random

class CustomUser(AbstractUser):
    email = models.EmailField(unique=True)
    phone = models.CharField(max_length=20, blank=True)
    address = models.TextField(blank=True)
    city = models.CharField(max_length=100, blank=True)
    postal_code = models.CharField(max_length=20, blank=True)
    country = models.CharField(max_length=100, blank=True)
    date_joined = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.email
    
    @property
    def is_admin_user(self):
        return self.email == 'admin@example.com'

class VerificationCode(models.Model):
    email = models.EmailField()
    code = models.CharField(max_length=6)
    created_at = models.DateTimeField(auto_now_add=True)
    expires_at = models.DateTimeField()
    is_used = models.BooleanField(default=False)
    
    def __str__(self):
        return f"{self.email} - {self.code}"
    
    def is_valid(self):
        return not self.is_used and timezone.now() < self.expires_at
    
    @classmethod
    def generate_code(cls, email):
        # Supprimer les anciens codes pour cet email
        cls.objects.filter(email=email).delete()
        
        # Générer un nouveau code
        code = str(random.randint(100000, 999999))
        expires_at = timezone.now() + timedelta(minutes=15)
        
        return cls.objects.create(
            email=email,
            code=code,
            expires_at=expires_at
        )