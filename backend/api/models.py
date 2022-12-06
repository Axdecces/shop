from django.contrib.auth.models import AbstractUser
from django.db import models

from django.conf import settings
from django.dispatch import receiver
from django.db.models.signals import post_save
from rest_framework.authtoken.models import Token

class Address(models.Model):
    street_address = models.CharField(max_length=255)
    city = models.CharField(max_length=255)
    postcode = models.CharField(max_length=10)
    country = models.CharField(max_length=20)

    def __str__(self) -> str:
        return f'{self.street_address}, {self.postcode} {self.city}, {self.country}'

class Tag(models.Model):
    name = models.CharField(max_length=120)

    class Meta:
        ordering = ['name']

    def __str__(self) -> str:
        return self.name

class Supplier(models.Model):
    company_name = models.CharField(max_length=255)
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    email= models.EmailField()

    address = models.OneToOneField(to=Address, on_delete=models.CASCADE)

    def __str__(self) -> str:
        return self.name

class Product(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    price = models.FloatField(default=0)
    stock = models.IntegerField(default=0)
    image = models.ImageField(null=True)

    tags = models.ManyToManyField(to=Tag, blank=True)

    supplier = models.ManyToManyField(to=Supplier, blank=True)

    active = models.BooleanField(default=True)

    def __str__(self) -> str:
        return f'Name: {self.name}, in Stock: {self.stock}'

class Cart(models.Model):
    products = models.ManyToManyField(to=Product, blank=True)

class Customer(AbstractUser):
    first_name = models.CharField(max_length=255, blank=True)
    last_name = models.CharField(max_length=255, blank=True)
    email = models.EmailField(blank=True)

    address = models.OneToOneField(to=Address, on_delete=models.CASCADE, null=True)

    cart = models.OneToOneField(to=Cart, on_delete=models.CASCADE, null=True)

    def __str__(self) -> str:
        return self.username

@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_auth_token(sender, instance=None, created=False, **kwargs):
    if created:
        Token.objects.create(user=instance)

class ShippingCompany(models.Model):
    name = models.CharField(max_length=255)

    def __str__(self) -> str:
        return self.name

class Order(models.Model):
    date = models.DateField
    products = models.JSONField()
    customer = models.ForeignKey(to=Customer, null=True, on_delete=models.SET_NULL)
    shipping_company = models.ForeignKey(ShippingCompany, null=True, on_delete=models.SET_NULL)

    def __str__(self) -> str:
        return f'Order-ID: {self.id}'
