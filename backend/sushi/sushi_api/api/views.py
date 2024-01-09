from rest_framework import viewsets, status
from ..models import Sushi, Order, PromocodeProduct, PromocodeDiscount
from .serializers import SushiSerializer, OrderSerializer
from rest_framework.response import Response
from rest_framework.views import APIView


class SushiViewsets(viewsets.ModelViewSet):
    queryset = Sushi.objects.all()
    serializer_class = SushiSerializer


class OrderCreateView(viewsets.ModelViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer


class CheckPromocodeView(APIView):
    def post(self, request):
        promocode_value = request.data.get("promocode")

        # Проверяем существование промокода в модели PromocodeDiscount
        try:
            promocode_discount = PromocodeDiscount.objects.get(
                promocode=promocode_value
            )
        except PromocodeDiscount.DoesNotExist:
            promocode_discount = None

        # Проверяем существование промокода в модели PromocodeProduct
        try:
            promocode_product = PromocodeProduct.objects.get(promocode=promocode_value)
        except PromocodeProduct.DoesNotExist:
            promocode_product = None

        if promocode_discount or promocode_product:
            if promocode_discount:
                details = {
                    "type_promocode": 'discount',
                    "discount": promocode_discount.discount,
                    "time_action": promocode_discount.time_action, 
                    "min_sum_order": promocode_discount.min_sum_order
                }
            if promocode_product: 
                details = {
                    "type_promocode": 'product',
                    "sushi": {
                        "id": promocode_product.sushi.id,
                        "name": promocode_product.sushi.name,
                        "description": promocode_product.sushi.description,
                        "price": 0.00
                    },
                    "time_action": promocode_product.time_action
                }
            return Response(
                {"message": "Промокод существует", "details": details}, status=status.HTTP_200_OK
            )
        else:
            return Response(
                {"message": "Промокод не существует"}, status=status.HTTP_404_NOT_FOUND
            )
