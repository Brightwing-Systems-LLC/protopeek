from django.db import migrations

# Constance keys removed in the flat-30-day / no-cap cleanup. Any stored override
# rows for these must be deleted or they'd linger as orphans. DEFAULT_EXPIRY_HOURS
# left Constance entirely (retention is now a settings invariant, not an admin knob),
# so its stored row + any 48h value it held is pure dead weight — drop it too.
_REMOVED_KEYS = [
    "DEFAULT_EXPIRY_HOURS",  # → settings.PROTOTYPE_EXPIRY_HOURS (flat 30d, no drift)
    "FREE_MAX_ACTIVE_PROTOTYPES",
    "KEY_MINT_LIMIT",  # renamed → TOKEN_MINT_LIMIT
    "KEY_MINT_WINDOW",  # renamed → TOKEN_MINT_WINDOW
]


def prune(apps, schema_editor):
    Constance = apps.get_model("constance", "Constance")
    Constance.objects.filter(key__in=_REMOVED_KEYS).delete()


def noop(apps, schema_editor):
    # Irreversible by design — we don't recreate removed settings or the old 48h value.
    pass


class Migration(migrations.Migration):

    dependencies = [
        ("constance", "__first__"),
    ]

    operations = [
        migrations.RunPython(prune, noop),
    ]
