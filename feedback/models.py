from django.db import models
from django.utils import timezone


class Reviewer(models.Model):
    """Lightweight, created on first feedback. One global row per email."""

    email = models.EmailField(unique=True)
    first_seen = models.DateTimeField(auto_now_add=True)
    last_seen = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.email

    @classmethod
    def touch(cls, email: str) -> "Reviewer":
        reviewer, _ = cls.objects.get_or_create(email=email)
        reviewer.last_seen = timezone.now()
        reviewer.save(update_fields=["last_seen"])
        return reviewer


class Annotation(models.Model):
    """A pinned note left on a specific version. Shaped to round-trip the SitePing
    widget's 'feedback' item (type + message + DOM anchors), extended with our own
    threaded Comments and a server-stamped author."""

    QUESTION, CHANGE, BUG, OTHER = "question", "change", "bug", "other"
    TYPE_CHOICES = [
        (QUESTION, "Question"),
        (CHANGE, "Change"),
        (BUG, "Bug"),
        (OTHER, "Other"),
    ]

    # Feedback pins to the version it was left on (survives re-uploads).
    version = models.ForeignKey(
        "prototypes.PrototypeVersion",
        on_delete=models.CASCADE,
        related_name="annotations",
    )
    author_email = models.EmailField()  # stamped server-side from the cookie identity
    author_name = models.CharField(max_length=200, blank=True)  # display only
    feedback_type = models.CharField(max_length=10, choices=TYPE_CHOICES, default=OTHER)
    note = models.TextField()
    resolved = models.BooleanField(default=False)
    resolved_at = models.DateTimeField(null=True, blank=True)

    # DOM anchoring — SitePing captures a multi-strategy anchor per pin (css selector,
    # xpath, text snippet, fingerprint, percentage rect). Stored verbatim so it can be
    # replayed to the widget and mined for the agent payload.
    anchors = models.JSONField(default=list, blank=True)
    # Convenience mirror of the primary anchor's CSS selector for quick display/query.
    css_selector = models.CharField(max_length=1000, blank=True)
    element_snapshot = models.TextField(blank=True)

    # Capture context (from the widget payload).
    url = models.CharField(max_length=2000, blank=True)
    viewport = models.CharField(max_length=50, blank=True)
    user_agent = models.CharField(max_length=500, blank=True)
    client_id = models.CharField(max_length=200, blank=True)

    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return f"{self.feedback_type} by {self.author_email}"

    @property
    def status(self) -> str:
        return "resolved" if self.resolved else "open"


class AnnotationShot(models.Model):
    """A client-captured screenshot of what the reviewer saw when they left the pin.
    Bytes live in Postgres (bytea) to keep the single-datastore invariant — small,
    transient (WebP, capped), and pruned with the version via the FK cascade. Kept in
    its own table so the blob never rides along in the frequent Annotation queries."""

    annotation = models.OneToOneField(
        Annotation, on_delete=models.CASCADE, related_name="shot"
    )
    image = models.BinaryField()  # re-encoded WebP bytes (never the raw client upload)
    content_type = models.CharField(max_length=40, default="image/webp")
    width = models.PositiveIntegerField()
    height = models.PositiveIntegerField()
    byte_size = models.PositiveIntegerField(editable=False)
    sha256 = models.CharField(max_length=64, editable=False)  # ETag + dedup
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"shot for annotation {self.annotation_id} ({self.byte_size}B)"


class Comment(models.Model):
    """A threaded reply. Attaches to an Annotation, or stands alone as a general
    comment (annotation is null). Author stamped server-side."""

    annotation = models.ForeignKey(
        Annotation,
        on_delete=models.CASCADE,
        related_name="comments",
        null=True,
        blank=True,
    )
    author_email = models.EmailField()
    body = models.TextField()
    parent = models.ForeignKey(
        "self", on_delete=models.CASCADE, related_name="replies", null=True, blank=True
    )
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["created_at"]

    def __str__(self):
        return f"comment by {self.author_email}"
