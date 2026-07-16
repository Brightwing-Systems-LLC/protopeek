from django.contrib import admin
from unfold.admin import ModelAdmin, TabularInline

from .models import AccessRule, Prototype, PrototypeVersion


class AccessRuleInline(TabularInline):
    model = AccessRule
    extra = 0


class PrototypeVersionInline(TabularInline):
    model = PrototypeVersion
    extra = 0
    fields = ["version_number", "sha256", "size", "uploaded_at"]
    readonly_fields = ["sha256", "size", "uploaded_at"]
    show_change_link = True


@admin.register(Prototype)
class PrototypeAdmin(ModelAdmin):
    list_display = ["name", "uuid", "owner", "is_active", "expires_at", "created_at"]
    list_filter = ["is_active", "named_invite_mode"]
    search_fields = ["name", "uuid", "owner__email"]
    readonly_fields = ["uuid", "created_at", "last_fetched_at"]
    inlines = [AccessRuleInline, PrototypeVersionInline]


@admin.register(PrototypeVersion)
class PrototypeVersionAdmin(ModelAdmin):
    list_display = ["prototype", "version_number", "size", "uploaded_at"]
    search_fields = ["prototype__name"]
    readonly_fields = ["sha256", "size", "uploaded_at"]
