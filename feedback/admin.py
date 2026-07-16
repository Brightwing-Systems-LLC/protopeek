from django.contrib import admin
from unfold.admin import ModelAdmin, TabularInline

from .models import Annotation, Comment, Reviewer


class CommentInline(TabularInline):
    model = Comment
    extra = 0
    fields = ["author_email", "body", "parent", "created_at"]
    readonly_fields = ["created_at"]


@admin.register(Annotation)
class AnnotationAdmin(ModelAdmin):
    list_display = ["feedback_type", "author_email", "version", "resolved", "created_at"]
    list_filter = ["feedback_type", "resolved"]
    search_fields = ["author_email", "note", "css_selector"]
    readonly_fields = ["created_at", "anchors"]
    inlines = [CommentInline]


@admin.register(Comment)
class CommentAdmin(ModelAdmin):
    list_display = ["author_email", "annotation", "parent", "created_at"]
    search_fields = ["author_email", "body"]
    readonly_fields = ["created_at"]


@admin.register(Reviewer)
class ReviewerAdmin(ModelAdmin):
    list_display = ["email", "first_seen", "last_seen"]
    search_fields = ["email"]
    readonly_fields = ["first_seen", "last_seen"]
