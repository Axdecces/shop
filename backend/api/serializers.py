from rest_framework import serializers
from api.models import Product, Tag, Customer, Cart, Supplier, Address, ShippingCompany, Order

from collections import OrderedDict
from django.core.exceptions import ValidationError

from django.conf import settings
from django.core.mail import send_mail

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
        customer = Customer.objects.get(username=self.context['request'].user)
        validated_data['customer'] = customer

        supplier = validated_data['shipping_company']
        products = validated_data['products']

        email_body = ''

        # Heading
        email_body += 'Rechnung BBS1 Shop\n\n'
        print(validated_data)
        # Customer Details
        email_body += f'Kunde {str(customer.id).zfill(5)}\n'
        email_body += f'{customer.first_name} {customer.last_name}\n'
        email_body += f'{customer.email}\n\n'
        email_body += f'{customer.address.street_address}\n'
        email_body += f'{customer.address.postcode} {customer.address.city}\n'
        email_body += f'{customer.address.country}\n\n'
        # Product List
        email_body += 'Ihre bestellten Produkte:\n'
        total = 0
        for product in products:
            print(product)
            name = product["name"]
            price = product["price"]
            total += price
            description = product["description"]
            email_body += f'{name} --- {price} EUR\n'
            email_body += f'{description}\n'
            email_body += '----------\n'
        
        email_body += f'Gesamtbetrag: {total} €\n\n'
        email_body += f'Bitte überweisen Sie diesen Betrag auf unser Konto.\n\n'


        # Text
        email_body += 'Vielen Dank für ihre Bestellung beim BBS1 Shop.\n'
        email_body += f'Ihre Waren werden nach Zahlungseingang innerhalb des nächsten Werktages an das Versandunternehmen "{supplier}" übergeben.\n\n'

        print(email_body)
        '''
        send_mail(
            subject='Bestellung erfasst',
            message=email_body,
            from_email=settings.SERVER_EMAIL,
            recipient_list=['simon.wagner@concat.de'],
            fail_silently=False,
        )
        '''

        return super().create(validated_data)

    class Meta:
        model = Order
        fields = ['id', 'date', 'products', 'shipping_company', 'customer']
