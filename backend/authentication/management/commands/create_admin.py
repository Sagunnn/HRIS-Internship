import os

from django.core.management.base import BaseCommand, CommandError

from authentication.models import User


class Command(BaseCommand):
    help = (
        "Create an HR admin (superuser with the Admin role) if one with the given username doesn't exist. "
        "Reads DJANGO_ADMIN_USERNAME, DJANGO_ADMIN_EMAIL and DJANGO_ADMIN_PASSWORD when options are omitted."
    )

    def add_arguments(self, parser):
        parser.add_argument('--username', default=os.environ.get('DJANGO_ADMIN_USERNAME'))
        parser.add_argument('--email', default=os.environ.get('DJANGO_ADMIN_EMAIL'))
        parser.add_argument('--password', default=os.environ.get('DJANGO_ADMIN_PASSWORD'))

    def handle(self, *args, username, email, password, **options):
        if not username:
            self.stdout.write('No admin username given; skipping admin creation.')
            return
        if User.objects.filter(username=username).exists():
            self.stdout.write(f'Admin user "{username}" already exists.')
            return
        if not (email and password):
            raise CommandError('An email and password are required to create the admin user.')

        User.objects.create_superuser(username=username, email=email, password=password, role='Admin')
        self.stdout.write(self.style.SUCCESS(f'Created admin user "{username}".'))
