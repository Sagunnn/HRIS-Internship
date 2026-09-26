from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.contrib.auth.forms import UserChangeForm, UserCreationForm

from .models import User


class HRISUserCreationForm(UserCreationForm):
    class Meta(UserCreationForm.Meta):
        model = User
        fields = ('username', 'email', 'role')


class HRISUserChangeForm(UserChangeForm):
    class Meta(UserChangeForm.Meta):
        model = User


# Django's UserAdmin hashes passwords; a plain ModelAdmin would store them as plain text.
@admin.register(User)
class UserAdmin(BaseUserAdmin):
    form = HRISUserChangeForm
    add_form = HRISUserCreationForm
    list_display = ('username', 'email', 'role', 'is_staff', 'is_active')
    list_filter = ('role', 'is_staff', 'is_active')
    fieldsets = BaseUserAdmin.fieldsets + (
        ('HRIS', {'fields': ('role', 'profile_picture')}),
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('username', 'email', 'role', 'password1', 'password2'),
        }),
    )
