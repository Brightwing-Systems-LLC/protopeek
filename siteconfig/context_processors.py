"""Expose a whitelist of runtime flags to templates."""

from . import conf

_WHITELIST = ["OVERLAY_ENABLED"]


def flags(request):
    return {"flags": {key: conf.get(key) for key in _WHITELIST}}
