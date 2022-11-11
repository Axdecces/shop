from django.db import models

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

class Customer(models.Model):
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    email = models.EmailField()

    address = models.OneToOneField(to=Address, on_delete=models.CASCADE)

    cart = models.OneToOneField(to=Cart, on_delete=models.CASCADE)

    def __str__(self) -> str:
        return f'{self.first_name} {self.last_name}'

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
