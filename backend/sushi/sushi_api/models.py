from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator, RegexValidator
import datetime
from django.core.exceptions import ValidationError

# Create your models here.

def validate_uppercase(value):
    if value != value.upper():
        raise ValidationError('Введите только заглавные буквы')


class Sushi(models.Model):
    name = models.CharField(max_length=100, verbose_name="Название")
    description = models.TextField(verbose_name="Описание")
    price = models.DecimalField(max_digits=6, decimal_places=2)
    total_count = models.PositiveIntegerField(verbose_name="Кол-во")

    def __str__(self):
        return self.name


class Order(models.Model):
    name = models.CharField(max_length=100)
    phone_number = models.CharField(max_length=20)
    city = models.CharField(max_length=50)
    street = models.CharField(max_length=100)
    home = models.CharField(max_length=5)
    sum_order = models.DecimalField(max_digits=6, decimal_places=2)
    promocode = models.CharField(max_length=100, null=True, blank=True)

    def __str__(self):
        return f"Order #{self.id} - {self.name}"


class OrderedSushi(models.Model):
    sushi = models.ForeignKey(
        Sushi, on_delete=models.CASCADE, related_name="ordered_sushi"
    )
    order = models.ForeignKey(
        Order, on_delete=models.CASCADE, related_name="sushi_orders"
    )
    amount = models.PositiveIntegerField(default=1)

    def __str__(self):
        return f"{self.amount} шт. {self.sushi.name} в заказе {self.order.name}"

    def save(self, *args, **kwargs):
        # Получаем экземпляр заказанного суши
        ordered_sushi = self.sushi

        # Обновляем количество доступных роллов после заказа
        ordered_sushi.total_count -= self.amount
        ordered_sushi.save()

        super(OrderedSushi, self).save(*args, **kwargs)


class PromocodeDiscount(models.Model):
    promocode = models.CharField(
        max_length=50,
        validators=[
            RegexValidator(regex="^[А-ЯA-Z0-9]*$", message="Введите только заглавные буквы"),
            validate_uppercase,
        ],
    )
    min_sum_order = models.IntegerField()
    discount = models.IntegerField()
    time_action = models.DateField(default=datetime.date.today)

    def __str__(self):
        return f"{self.promocode} - {self.time_action}"

class PromocodeProduct(models.Model):
    promocode = models.CharField(
        max_length=50,
        validators=[
            RegexValidator(regex="^[А-ЯA-Z0-9]*$", message="Введите только заглавные буквы"),
            validate_uppercase,
        ],
    )
    sushi = models.ForeignKey(Sushi, on_delete=models.CASCADE)
    time_action = models.DateField(default=datetime.date.today)

    def __str__(self):
        return f"{self.promocode} - {self.time_action}"