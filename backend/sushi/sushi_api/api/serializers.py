from rest_framework import serializers
from ..models import Sushi, Order, OrderedSushi, PromocodeDiscount, PromocodeProduct

class SushiSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sushi
        fields = '__all__'

class OrderedSushiSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderedSushi
        fields = ('sushi', 'amount')

class OrderSerializer(serializers.ModelSerializer):
    sushi_orders = OrderedSushiSerializer(many=True)

    class Meta:
        model = Order
        fields = ('name', 'phone_number', 'city', 'street', 'home', 'sushi_orders', 'promocode', 'sum_order')

    def create(self, validated_data):
        sushi_data = validated_data.pop('sushi_orders')
        order = Order.objects.create(**validated_data)
        for sushi_item in sushi_data:
            OrderedSushi.objects.create(order=order, **sushi_item)
        return order

class PromocodeDiscountSerializer(serializers.ModelSerializer):
    class Meta:
        model = PromocodeDiscount
        fields = '__all__'

class PromocodeProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = PromocodeProduct
        fields = '__all__'
