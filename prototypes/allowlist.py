"""Allowlist matching: an email is allowed if a domain-rule matches its domain
OR an email-rule matches the whole address (both compared case-insensitively)."""

from .models import AccessRule


def normalize_email(email: str) -> str:
    return (email or "").strip().lower()


def domain_of(email: str) -> str:
    email = normalize_email(email)
    return email.rsplit("@", 1)[-1] if "@" in email else ""


def is_allowed(prototype, email: str) -> bool:
    email = normalize_email(email)
    if not email or "@" not in email:
        return False
    domain = domain_of(email)
    rules = prototype.access_rules.all()
    for rule in rules:
        if rule.kind == AccessRule.EMAIL and rule.value == email:
            return True
        if rule.kind == AccessRule.DOMAIN and rule.value == domain:
            return True
    return False
