from rest_framework import serializers
from api.models import Product, Tag, Customer, Cart, Supplier, Address, ShippingCompany, Order

from collections import OrderedDict
from django.core.exceptions import ValidationError

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'

class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = '__all__'

class CartSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cart
        fields = '__all__'

class AddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = Address
        fields = '__all__'

class CustomerSerializer(serializers.ModelSerializer):
    address = AddressSerializer()

    def create(self, validated_data):
        if 'cart' not in validated_data:
            validated_data['cart'] = Cart.objects.create()

        address_data = validated_data.pop('address')
        address = Address.objects.create(**address_data)

        password = validated_data.pop('password')

        customer = Customer.objects.create(address=address, email=validated_data['username'], **validated_data)
        customer.set_password(password)
        customer.save()

        return customer

    class Meta:
        model = Customer
        fields = ['id', 'first_name', 'last_name', 'username', 'password', 'email', 'address', 'cart']
        extra_kwargs = {
            'cart': {'required': False},
            'password': {'write_only': True}
        }

class SupplierSerializer(serializers.ModelSerializer):
    address = AddressSerializer()

    def create(self, validated_data):
        address_data = validated_data.pop('address')
        address = Address.objects.create(**address_data)

        supplier = Supplier.objects.create(address=address, **validated_data)
        return supplier

    class Meta:
        model = Supplier
        fields = '__all__'

class ShippingCompanySerializer(serializers.ModelSerializer):
    class Meta:
        model = ShippingCompany
        fields = '__all__'

class OrderSerializer(serializers.ModelSerializer):
    def create(self, validated_data):
        print('order created should send an email with the following producst')
        print(validated_data['products'])
        return super().create(validated_data)

    class Meta:
        model = Order
        fields = '__all__'
