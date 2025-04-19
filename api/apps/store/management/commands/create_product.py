import random
from decimal import Decimal

from django.core.management.base import BaseCommand
from django.utils import lorem_ipsum
from apps.store.models import Category, SubCategory, Brand, Product, ProductSize, Order, OrderItem

class Command(BaseCommand):
    help = 'Creates application data'

    def handle(self, *args, **kwargs):
        # get or create superuser

        categorys = [
            Category(name="Whey protein", description=lorem_ipsum.paragraph()),
            Category(name="Vitamin", description=lorem_ipsum.paragraph()),
            Category(name="Dụng cụ", description=lorem_ipsum.paragraph()),
        ]

        sub_categorys = [
            SubCategory(name="Whey protein isolate", description=lorem_ipsum.paragraph(), category=categorys[0]),
            SubCategory(name="Whey protein concentrate", description=lorem_ipsum.paragraph(), category=categorys[0]),
            SubCategory(name="Vitamin tổng hợp", description=lorem_ipsum.paragraph(), category=categorys[1]),
            SubCategory(name="Vitamin D", description=lorem_ipsum.paragraph(), category=categorys[1]),
            SubCategory(name="Dụng cụ tập tại nhà", description=lorem_ipsum.paragraph(), category=categorys[2]),
            SubCategory(name="Dụng cụ hỗ trợ tập gym", description=lorem_ipsum.paragraph(), category=categorys[2]),
        ]

        brands = [
            Brand(name="Rule1", description=lorem_ipsum.paragraph()),
            Brand(name="Mutant", description=lorem_ipsum.paragraph()),
            Brand(name="OstroVit", description=lorem_ipsum.paragraph()),
        ]

        products = [
            Product(name="Rule1 Whey Isolate", sub_category=sub_categorys[0], brand=brands[0], description=lorem_ipsum.paragraph()),
            Product(name="Mutant Iso Surge", sub_category=sub_categorys[0], brand=brands[1], description=lorem_ipsum.paragraph()),
            Product(name="Rule1 Whey Concentrate", sub_category=sub_categorys[1], brand=brands[0], description=lorem_ipsum.paragraph()),
            Product(name="OstroVit Whey Protein", sub_category=sub_categorys[1], brand=brands[2], description=lorem_ipsum.paragraph()),
            Product(name="Ostrovit Testo Booster", sub_category=sub_categorys[2], brand=brands[2], description=lorem_ipsum.paragraph()),
            Product(name="Mutant Madness ALL-IN", sub_category=sub_categorys[2], brand=brands[1], description=lorem_ipsum.paragraph()),
            Product(name="Ostrovit Vitamin D3 2000 IU", sub_category=sub_categorys[3], brand=brands[2], description=lorem_ipsum.paragraph()),
            Product(name="Ostrovit Vitamin D3+K2 Calcium", sub_category=sub_categorys[3], brand=brands[2], description=lorem_ipsum.paragraph()),
            Product(name="Xà đơn", sub_category=sub_categorys[4], description=lorem_ipsum.paragraph()),
            Product(name="Thảm tập", sub_category=sub_categorys[4], description=lorem_ipsum.paragraph()),
            Product(name="Găng tay", sub_category=sub_categorys[5], description=lorem_ipsum.paragraph()),
            Product(name="Bó gối", sub_category=sub_categorys[5], description=lorem_ipsum.paragraph()),
        ]

        product_sizes = [
            ProductSize(product=products[0], size="S", stock=10, price=Decimal('20.00'), is_main=True),
            ProductSize(product=products[0], size="M", stock=5, price=Decimal('22.00')),
            ProductSize(product=products[0], size="L", stock=0, price=Decimal('24.00')),
            ProductSize(product=products[1], size="S", stock=8, price=Decimal('25.00'), is_main=True),
            ProductSize(product=products[1], size="M", stock=3, price=Decimal('27.00')),
            ProductSize(product=products[1], size="L", stock=0, price=Decimal('29.00')),
            ProductSize(product=products[2], size="S", stock=12, price=Decimal('30.00'), is_main=True),
            ProductSize(product=products[2], size="M", stock=7, price=Decimal('32.00')),
            ProductSize(product=products[2], size="L", stock=0, price=Decimal('34.00')),
            ProductSize(product=products[3], size="S", stock=15, price=Decimal('35.00'), is_main=True),
            ProductSize(product=products[3], size="M", stock=10, price=Decimal('37.00')),
            ProductSize(product=products[3], size="L", stock=0, price=Decimal('39.00')),
            ProductSize(product=products[4], size="S", stock=20, price=Decimal('40.00'), is_main=True),
            ProductSize(product=products[4], size="M", stock=15, price=Decimal('42.00')),
            ProductSize(product=products[4], size="L", stock=0, price=Decimal('44.00')),
            ProductSize(product=products[5], size="S", stock=25, price=Decimal('45.00'), is_main=True),
            ProductSize(product=products[5], size="M", stock=20, price=Decimal('47.00')),
            ProductSize(product=products[5], size="L", stock=0, price=Decimal('49.00')),
            ProductSize(product=products[6], size="S", stock=30, price=Decimal('50.00'), is_main=True),
            ProductSize(product=products[6], size="M", stock=25, price=Decimal('52.00')),
            ProductSize(product=products[6], size="L", stock=0, price=Decimal('54.00')),
            ProductSize(product=products[7], size="S", stock=35, price=Decimal('55.00'), is_main=True),
            ProductSize(product=products[7], size="M", stock=30, price=Decimal('57.00')),
            ProductSize(product=products[7], size="L", stock=0, price=Decimal('59.00')),
            ProductSize(product=products[8], size="S", stock=40, price=Decimal('60.00'), is_main=True),
            ProductSize(product=products[8], size="M", stock=35, price=Decimal('62.00')),
            ProductSize(product=products[8], size="L", stock=0, price=Decimal('64.00')),
            ProductSize(product=products[9], size="S", stock=45, price=Decimal('65.00'), is_main=True),
            ProductSize(product=products[9], size="M", stock=40, price=Decimal('67.00')),
            ProductSize(product=products[9], size="L", stock=0, price=Decimal('69.00')),
            ProductSize(product=products[10], size="S", stock=50, price=Decimal('70.00'), is_main=True),
            ProductSize(product=products[10], size="M", stock=45, price=Decimal('72.00')),
            ProductSize(product=products[10], size="L", stock=0, price=Decimal('74.00')),
            ProductSize(product=products[11], size="S", stock=55, price=Decimal('75.00'), is_main=True),
            ProductSize(product=products[11], size="M", stock=50, price=Decimal('77.00')),
            ProductSize(product=products[11], size="L", stock=0, price=Decimal('79.00')),
        ]

        # Save categories individually
        for category in categorys:
            category.save()
        categorys = list(Category.objects.all())

        # Save subcategories individually
        for sub_category in sub_categorys:
            sub_category.save()
        sub_categorys = list(SubCategory.objects.all())

        # Save brands individually
        for brand in brands:
            brand.save()
        brands = list(Brand.objects.all())

        # Save products individually
        for product in products:
            product.save()
        products = list(Product.objects.all())

        # Save product sizes in bulk
        ProductSize.objects.bulk_create(product_sizes)
        product_sizes = list(ProductSize.objects.all())
        
        # create some dummy orders tied to the superuser
        # for _ in range(3):
        #     # create an Order with 2 order items
        #     order = Order.objects.create(user=user)
        #     for product in random.sample(list(product_sizes), 3):
        #         OrderItem.objects.create(
        #             order=order, product_size=product, quantity=random.randint(1,5)
        #         )