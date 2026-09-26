from django.contrib import admin

from .models import Employee


@admin.register(Employee)
class EmployeeAdmin(admin.ModelAdmin):
    list_display = ('get_full_name', 'user', 'department', 'contact_number')
    search_fields = ('first_name', 'last_name', 'user__username', 'user__email')
    list_filter = ('department',)
