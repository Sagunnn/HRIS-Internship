#!/bin/sh
set -e

python manage.py migrate --noinput
python manage.py collectstatic --noinput
# Creates the first HR admin from DJANGO_ADMIN_* env vars (no-op if unset or already present)
python manage.py create_admin

exec "$@"
