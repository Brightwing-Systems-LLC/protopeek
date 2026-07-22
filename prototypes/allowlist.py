"""Allowlist matching: an email is allowed if the prototype is public, OR a domain-rule
matches its domain, OR an email-rule matches the whole address (compared case-insensitively).

The real access boundary is the unguessable link; the allowlist is a soft layer on top
(self-asserted email, unverified) that stops casual/accidental viewing and gives comments
an author. "Public" removes that soft layer — any well-formed address is admitted — but the
email is still collected at the gate so pinned feedback stays attributed."""

from .models import AccessRule, Prototype


def normalize_email(email: str) -> str:
    return (email or "").strip().lower()


def domain_of(email: str) -> str:
    email = normalize_email(email)
    return email.rsplit("@", 1)[-1] if "@" in email else ""


def is_allowed(prototype, email: str) -> bool:
    email = normalize_email(email)
    if not email or "@" not in email:
        return False
    if prototype.access_mode == Prototype.PUBLIC:
        return True
    domain = domain_of(email)
    rules = prototype.access_rules.all()
    for rule in rules:
        if rule.kind == AccessRule.EMAIL and rule.value == email:
            return True
        if rule.kind == AccessRule.DOMAIN and rule.value == domain:
            return True
    return False
