from django.contrib import admin

from api.models import Product, Tag, Customer, Cart, Supplier, Address, ShippingCompany, Order

models = [
    Product,
    Tag,
    Customer,
    Cart,
    Supplier,
    Address,
    ShippingCompany,
    Order
]

admin.site.register(models)
