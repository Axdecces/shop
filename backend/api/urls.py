from rest_framework import routers
from django.urls import path
from api.views import (
    ProductViewSet,
    TagViewSet,
    CustomerViewSet,
    CustomerLogIn,
    CartViewSet,
    SupplierViewSet,
    AddressViewSet,
    ShippingCompanyViewSet,
    OrderViewSet
)

router = routers.SimpleRouter()
router.register(r'products', ProductViewSet)
router.register(r'tags', TagViewSet)
router.register(r'customers', CustomerViewSet)
router.register(r'carts', CartViewSet, basename='carts')
router.register(r'suppliers', SupplierViewSet)
router.register(r'addresses', AddressViewSet)
router.register(r'shipping-companies', ShippingCompanyViewSet)
router.register(r'orders', OrderViewSet, basename='orders')

urlpatterns = [
    path('login/', CustomerLogIn.as_view()),
]

app_name = 'api'
urlpatterns += router.urls
