"""One sending facade — views/tasks never touch django.core.mail directly.

Renders templates/email/<name>/{subject.txt,body.html,body.txt} and sends a
multipart (HTML + text) message through the active backend.
"""

from django.conf import settings
from django.core.mail import EmailMultiAlternatives
from django.template import TemplateDoesNotExist
from django.template.loader import render_to_string
from django.utils.html import strip_tags


def send_templated(template: str, *, to, context: dict, from_email=None):
    subject = render_to_string(f"email/{template}/subject.txt", context).strip()
    html = render_to_string(f"email/{template}/body.html", context)
    try:
        text = render_to_string(f"email/{template}/body.txt", context)
    except TemplateDoesNotExist:
        text = strip_tags(html)
    recipients = to if isinstance(to, (list, tuple)) else [to]
    msg = EmailMultiAlternatives(
        subject, text, from_email or settings.DEFAULT_FROM_EMAIL, recipients
    )
    msg.attach_alternative(html, "text/html")
    msg.send()
