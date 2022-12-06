from rest_framework.viewsets  import ModelViewSet
from rest_framework.permissions import IsAuthenticated
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from rest_framework.response import Response

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

class CustomerLogIn(ObtainAuthToken):

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data,
                                           context={'request': request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        token = Token.objects.get(user=user)
        return Response({
            'token': token.key,
            'id': user.pk,
            'username': user.username
        })

class CartViewSet(ModelViewSet):
	permission_classes = [IsAuthenticated]
	serializer_class = CartSerializer

	def get_queryset(self):
		return self.request.user.cart

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
	permission_classes = [IsAuthenticated]
	serializer_class = OrderSerializer

	def get_queryset(self):
		return Order.objects.filter(customer=self.request.user)
