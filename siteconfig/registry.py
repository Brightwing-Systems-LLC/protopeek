"""django-constance registry — global, singleton, admin-editable platform settings
that change WITHOUT a restart. Per-object config (e.g. a prototype's own expiry)
lives on the model; only platform defaults belong here."""

CONSTANCE_CONFIG = {
    "DEFAULT_ALLOW_DOMAIN": (
        "",
        "Prefilled into the dashboard upload form's domains field when the owner has no default of their own (blank = none). Never applied server-side — uploads get exactly the rules they send.",
        str,
    ),
    "ENTER_RATE_LIMIT": (
        10,
        "Max reviewer email-submit attempts per IP per window.",
        int,
    ),
    "ENTER_RATE_WINDOW": (
        300,
        "Rate-limit window for the reviewer email form, in seconds.",
        int,
    ),
    "OVERLAY_ENABLED": (
        True,
        "Inject the SitePing annotation overlay into served prototypes.",
        bool,
    ),
    "TOKEN_MINT_LIMIT": (
        10,
        "Max tokens that can be minted per IP per window (anti-abuse).",
        int,
    ),
    "TOKEN_MINT_WINDOW": (
        3600,
        "Rate-limit window for token minting, in seconds.",
        int,
    ),
}

CONSTANCE_CONFIG_FIELDSETS = {
    "Sharing": ("DEFAULT_ALLOW_DOMAIN",),
    "Reviewer access": ("ENTER_RATE_LIMIT", "ENTER_RATE_WINDOW", "OVERLAY_ENABLED"),
    "Abuse": ("TOKEN_MINT_LIMIT", "TOKEN_MINT_WINDOW"),
}
