from django.core.management.base import BaseCommand
from django.contrib.auth.models import User
from apps.users.models import UserInfo, Country, City, Address
# Your custom management commands go here.
class Command(BaseCommand):
    help = 'Create a the superuser account'

    def handle(self, *args, **kwargs):
        username = 'gunnyvukhi@gmail.com'
        password = 'Ta2422005@'
        User.objects.create_superuser(username=username, password=password, first_name='Gunny', last_name='Vukhi')

        # Create a country and a city associated with it
        countries = [
            Country(name="Việt Nam", code="VN", continent="Asia", population=98000000, area=331212, capital="Hà Nội", currency="VND", language="Tiếng Việt"),
            Country(name="Mỹ", code="US", continent="North America", population=331000000, area=9833517, capital="Washington, D.C.", currency="USD", language="English"),
        ]


        cities = [
            City(name="Hà Nội", country=countries[0], population=8000000, area=332, timezone="ICT", latitude=21.0285, longitude=105.8542, postal_code="100000"),
            City(name="New York", country=countries[1], population=8419600, area=789, timezone="EST", latitude=40.7128, longitude=-74.0060, postal_code="10001"),
        ]

        for country in countries:
            country.save()
        for city in cities:
            city.save()

        address = Address.objects.create(
            user=User.objects.get(username=username),
            street='123 Main St',
            city=cities[0],
            is_primary=True,
        )
        address.save()

        user = User.objects.get(username=username)
        user_info = UserInfo.objects.create(
            user=user,
            phone_number='0987654321',
            date_of_birth='2005-02-24',
            gender=True,
            profile_picture='Ina.jpg',
            rank='TOG',
        )
        user_info.save()
        self.stdout.write(self.style.SUCCESS(f"Superuser '{username}' created successfully."))
        
