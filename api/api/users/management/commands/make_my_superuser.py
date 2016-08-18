from django.core.management.base import BaseCommand, CommandError
from django.contrib.auth.models import User
import os

class Command(BaseCommand):
    help = '''Creates a superuser account if it doesn't already exist'''

    def handle(self, *args, **options):
        try:
            print('Trying to get admin user...')
            admin = User.objects.get(username=os.environ['API_ADMIN_USER'])
            print('Admin user found!')

        except User.DoesNotExist:
            print('Creating admin user...')
            User.objects.create_superuser(
                os.environ['API_ADMIN_USER'],
                os.environ['API_ADMIN_EMAIL'],
                os.environ['API_ADMIN_PASS'],
            )
            print('Admin user created!')
