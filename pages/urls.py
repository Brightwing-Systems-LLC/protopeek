from django.urls import path

from . import views

app_name = "pages"

urlpatterns = [
    path("tos/", views.terms, name="terms"),
    path("privacy/", views.privacy, name="privacy"),
    path("agent.md", views.agent_md, name="agent"),
]
