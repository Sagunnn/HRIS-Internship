from datetime import date

from rest_framework import status
from rest_framework.test import APITestCase

from authentication.models import User
from departments.models import Department
from employees.models import Employee
from leaves.models import Leave


class HRISAPITests(APITestCase):
    def setUp(self):
        self.department = Department.objects.create(department_id='ENG', department_name='Engineering')
        self.admin = User.objects.create_user('admin', 'admin@example.com', 'pass12345', role='Admin', is_staff=True)
        self.alice = self.make_employee('alice')
        self.bob = self.make_employee('bob')

    def make_employee(self, username):
        user = User.objects.create_user(username, f'{username}@example.com', 'pass12345', role='Employee')
        return Employee.objects.create(
            user=user, first_name=username.title(), last_name='Tester', department=self.department
        )

    def test_token_contains_role_and_name(self):
        response = self.client.post('/api/v1/token/', {'username': 'alice', 'password': 'pass12345'})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('access', response.data)

    def test_anonymous_cannot_list_users(self):
        response = self.client.get('/api/v1/users/')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_employee_cannot_delete_users(self):
        self.client.force_authenticate(self.alice.user)
        response = self.client.delete(f'/api/v1/users/{self.bob.user.id}/')
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
        self.assertTrue(User.objects.filter(id=self.bob.user.id).exists())

    def test_employee_cannot_promote_themselves(self):
        self.client.force_authenticate(self.alice.user)
        response = self.client.patch(f'/api/v1/users/{self.alice.user.id}/', {'role': 'Admin'})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.alice.user.refresh_from_db()
        self.assertEqual(self.alice.user.role, 'Employee')

    def test_admin_can_list_users(self):
        self.client.force_authenticate(self.admin)
        response = self.client.get('/api/v1/users/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 3)

    def test_employee_cannot_register_employees(self):
        self.client.force_authenticate(self.alice.user)
        response = self.client.post('/api/v1/register-employee/', {}, format='multipart')
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_admin_can_register_employee(self):
        self.client.force_authenticate(self.admin)
        response = self.client.post('/api/v1/register-employee/', {
            'user.username': 'carol',
            'user.email': 'carol@example.com',
            'user.password': 'pass12345',
            'user.confirm_password': 'pass12345',
            'user.role': 'Employee',
            'department': 'Engineering',
            'first_name': 'Carol',
            'last_name': 'Tester',
            'address': 'Kathmandu',
        }, format='multipart')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED, response.data)
        self.assertEqual(response.data['department'], 'Engineering')
        self.assertTrue(User.objects.get(username='carol').check_password('pass12345'))

    def test_employee_can_read_but_not_edit_departments(self):
        self.client.force_authenticate(self.alice.user)
        self.assertEqual(self.client.get('/api/v1/departments/').status_code, status.HTTP_200_OK)
        response = self.client.delete(f'/api/v1/departments/{self.department.department_id}/')
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_me_returns_own_profile(self):
        self.client.force_authenticate(self.alice.user)
        response = self.client.get('/api/v1/register-employee/list/me/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['user']['username'], 'alice')

    def test_leave_end_date_must_not_precede_start_date(self):
        self.client.force_authenticate(self.alice.user)
        response = self.client.post('/api/v1/leaves/user-leaves/', {
            'leave_type': 'SICK', 'start_date': '2025-03-10', 'end_date': '2025-03-01', 'reason': 'Flu',
        })
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_employee_cannot_edit_someone_elses_leave(self):
        leave = Leave.objects.create(
            employee=self.bob, leave_type='SICK', start_date=date(2025, 3, 1), end_date=date(2025, 3, 2), reason='Flu'
        )
        self.client.force_authenticate(self.alice.user)
        response = self.client.patch(f'/api/v1/leaves/user-leaves/update/{leave.id}/', {'reason': 'Hacked'})
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_only_admin_can_approve_leave(self):
        leave = Leave.objects.create(
            employee=self.alice, leave_type='SICK', start_date=date(2025, 3, 1), end_date=date(2025, 3, 2), reason='Flu'
        )
        url = f'/api/v1/leaves/leave-approval/{leave.id}/'

        self.client.force_authenticate(self.alice.user)
        self.assertEqual(self.client.patch(url, {'status': 'APPROVED'}).status_code, status.HTTP_403_FORBIDDEN)

        self.client.force_authenticate(self.admin)
        self.assertEqual(self.client.patch(url, {'status': 'APPROVED'}).status_code, status.HTTP_200_OK)
        leave.refresh_from_db()
        self.assertEqual(leave.status, 'APPROVED')


class DjangoAdminUserTests(APITestCase):
    def test_users_created_in_django_admin_get_hashed_passwords(self):
        superuser = User.objects.create_superuser('root', 'root@example.com', 'pass12345', role='Admin')
        self.client.force_login(superuser)
        response = self.client.post('/django-admin/authentication/user/add/', {
            'username': 'hr2', 'email': 'hr2@example.com', 'role': 'Admin',
            'password1': 'S3cure-pass!', 'password2': 'S3cure-pass!', 'usable_password': 'true',
        })
        self.assertEqual(response.status_code, 302)
        user = User.objects.get(username='hr2')
        self.assertTrue(user.check_password('S3cure-pass!'))
