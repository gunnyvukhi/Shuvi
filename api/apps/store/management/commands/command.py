from django.core.management.base import BaseCommand
from apps.store.models import Product

class Command(BaseCommand):
    help = 'Add a product to the database'

    def add_arguments(self, parser):
        parser.add_argument('name', type=str, help='Name of the product')
        parser.add_argument('price', type=float, help='Price of the product')
        parser.add_argument('stock', type=int, help='Stock quantity of the product')
        parser.add_argument('description', type=str, help='Description of the product')
        parser.add_argument('image', type=str, help='Image URL of the product')
        parser.add_argument('category_id', type=int, help='Category ID of the product')
        parser.add_argument('created_by_id', type=int, help='ID of the user creating the product')

    def handle(self, *args, **kwargs):
        name = kwargs['name']
        price = kwargs['price']
        stock = kwargs['stock']
        description = kwargs['description']
        image = kwargs['image']
        category_id = kwargs['category_id']
        created_by_id = kwargs['created_by_id']

        product, created = Product.objects.get_or_create(
            name=name,
            defaults={
                'price': price,
                'stock': stock,
                'description': description,
                'image': image,
                'category_id': category_id,
                'created_by_id': created_by_id
            }
        )

        if created:
            self.stdout.write(self.style.SUCCESS(f'Product "{name}" added successfully!'))
        else:
            self.stdout.write(self.style.WARNING(f'Product "{name}" already exists.'))