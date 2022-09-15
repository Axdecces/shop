from django.db import models

class Tag(models.Model):
    name = models.CharField(max_length=120)

    class Meta:
        ordering = ['name']

    def __str__(self):
        return self.name


class Product(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    price = models.FloatField(default=0)
    stock = models.IntegerField(default=0)
    image = models.ImageField(null=True)

    tags = models.ManyToManyField(to=Tag)

    active = models.BooleanField(default=True)

    def __str__(self):
        return f'Name: {self.name}, in Stock: {self.stock}'

class Cart(models.Model):
    products = models.ManyToManyField(to=Product)

class Address(models.Model):
    street_address = models.CharField(max_length=255)
    city = models.CharField(max_length=255)
    postcode = models.CharField(max_length=10)
    country = models.CharField(max_length=20)

class Customer(models.Model):
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    email = models.EmailField()

    address = models.OneToOneField(to=Address, on_delete=models.CASCADE)

    cart = models.OneToOneField(to=Cart, on_delete=models.CASCADE)

class Supplier(models.Model):
    company_name = models.CharField(max_length=255)
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    email= models.EmailField()

    address = models.OneToOneField(to=Address, on_delete=models.CASCADE)

class ShippingCompany(models.Model):
    name = models.CharField(max_length=255)

class Order(models.Model):
    date = models.DateField
    shipping_company = models.ManyToManyField(to=ShippingCompany)
    products = models.JSONField()
