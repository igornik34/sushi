from django.contrib import admin
from .models import Order, Sushi, OrderedSushi, PromocodeDiscount, PromocodeProduct
# Register your models here.

class OrderedSushiInline(admin.TabularInline):
    model = OrderedSushi
    extra = 1

@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    inlines = (OrderedSushiInline,)
    list_display = ('name', 'phone_number', 'city', 'street', 'home')

admin.site.register(OrderedSushi)  # Регистрация модели OrderedSushi отдельно, если требуется
admin.site.register(Sushi)
admin.site.register(PromocodeProduct)
admin.site.register(PromocodeDiscount)