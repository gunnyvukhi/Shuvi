from django.core.management.base import BaseCommand
from django.contrib.auth.models import User
from apps.users.models import UserInfo
# Your custom management commands go here.
class Command(BaseCommand):
    help = 'Create a the superuser account'

    def handle(self, *args, **kwargs):
        username = 'gunnyvukhi@gmail.com'
        password = 'Ta2422005@'
        User.objects.create_superuser(username=username, password=password, first_name='Gunny', last_name='Vukhi')
        user = User.objects.get(username=username)
        user_info = UserInfo.objects.create(
            user=user,
            phone_number='0987654321',
            address='123 Main St, City, Country'
        )
        user_info.save()
        self.stdout.write(self.style.SUCCESS(f"Superuser '{username}' created successfully."))
        
