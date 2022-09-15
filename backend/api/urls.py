from rest_framework import routers
from api.views import (
    ProductViewSet,
    TagViewSet,
    CustomerViewSet,
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
router.register(r'carts', CartViewSet)
router.register(r'suppliers', SupplierViewSet)
router.register(r'addresses', AddressViewSet)
router.register(r'shipping-companies', ShippingCompanyViewSet)
router.register(r'orders', OrderViewSet)

app_name = 'api'
urlpatterns = router.urls