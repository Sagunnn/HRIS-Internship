from rest_framework.permissions import SAFE_METHODS, BasePermission


def is_hr_admin(user):
    """Staff users and users with the Admin role can manage HR data."""
    return bool(user and user.is_authenticated and (user.is_staff or user.is_admin()))


class IsHRAdmin(BasePermission):
    def has_permission(self, request, view):
        return is_hr_admin(request.user)


class IsHRAdminOrReadOnly(BasePermission):
    """Any authenticated user can read; only HR admins can write."""

    def has_permission(self, request, view):
        if not (request.user and request.user.is_authenticated):
            return False
        return request.method in SAFE_METHODS or is_hr_admin(request.user)
