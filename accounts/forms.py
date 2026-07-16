from django import forms
from timezone_field import TimeZoneFormField

from .models import User


class ProfileUpdateForm(forms.ModelForm):
    timezone = TimeZoneFormField()

    class Meta:
        model = User
        fields = ["first_name", "last_name", "timezone"]
