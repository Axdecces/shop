from rest_framework.viewsets  import ModelViewSet

from api.models import Product, Tag, Customer, Cart, Supplier, Address, ShippingCompany, Order
from api.serializers import (
	ProductSerializer,
	TagSerializer,
	CustomerSerializer,
	CartSerializer,
	SupplierSerializer,
	AddressSerializer,
	ShippingCompanySerializer,
	OrderSerializer
)

class ProductViewSet(ModelViewSet):
	queryset = Product.objects.all()
	serializer_class = ProductSerializer


class TagViewSet(ModelViewSet):
	queryset = Tag.objects.all()
	serializer_class = TagSerializer

class CustomerViewSet(ModelViewSet):
	queryset = Customer.objects.all()
	serializer_class = CustomerSerializer


class CartViewSet(ModelViewSet):
	queryset = Cart.objects.all()
	serializer_class = CartSerializer

class SupplierViewSet(ModelViewSet):
	queryset = Supplier.objects.all()
	serializer_class = SupplierSerializer

class AddressViewSet(ModelViewSet):
	queryset = Address.objects.all()
	serializer_class = AddressSerializer

class ShippingCompanyViewSet(ModelViewSet):
	queryset = ShippingCompany.objects.all()
	serializer_class = ShippingCompanySerializer

class OrderViewSet(ModelViewSet):
	queryset = Order.objects.all()
	serializer_class = OrderSerializer
