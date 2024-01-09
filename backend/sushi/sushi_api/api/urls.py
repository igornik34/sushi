from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import SushiViewsets, OrderCreateView, CheckPromocodeView

router = DefaultRouter()
router.register(r'sushi', SushiViewsets, basename="sushi")
router.register(r'orders', OrderCreateView, basename="order")

urlpatterns = [
    path('promocode/', CheckPromocodeView.as_view(), name="promocode"),
    path('', include(router.urls))
]
