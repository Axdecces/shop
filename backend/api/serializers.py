from rest_framework import serializers
from api.models import Product, Tag, Customer, Cart, Supplier, Address, ShippingCompany, Order

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

class CustomerSerializer(serializers.ModelSerializer):
    cart = CartSerializer(required=False)

    def create(self, validated_data):
        cart = Cart.objects.create()
        return Customer.objects.create(cart=cart, **validated_data)

    class Meta:
        model = Customer
        fields = ['id', 'first_name', 'last_name', 'email', 'address', 'cart']

class SupplierSerializer(serializers.ModelSerializer):
    class Meta:
        model = Supplier
        fields = '__all__'

class AddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = Address
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
