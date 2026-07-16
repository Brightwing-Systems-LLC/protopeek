import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models

import accounts.models


class Migration(migrations.Migration):
    """Rename ApiKey → DeviceToken and its `key` field → `token`, preserving all
    existing rows (RenameModel/RenameField = ALTER TABLE, no data loss). The
    AlterFields only realign migration state (new default callable + reverse
    accessor) — they emit no schema change."""

    dependencies = [
        ("accounts", "0002_user_default_allow_domain_user_is_provisional"),
    ]

    operations = [
        migrations.RenameModel(old_name="ApiKey", new_name="DeviceToken"),
        migrations.RenameField(
            model_name="devicetoken", old_name="key", new_name="token"
        ),
        migrations.AlterField(
            model_name="devicetoken",
            name="token",
            field=models.CharField(
                default=accounts.models.generate_token,
                editable=False,
                max_length=80,
                unique=True,
            ),
        ),
        migrations.AlterField(
            model_name="devicetoken",
            name="owner",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE,
                related_name="tokens",
                to=settings.AUTH_USER_MODEL,
            ),
        ),
    ]
