"""Typed accessors so call sites never touch `constance` directly."""

from constance import config as _c


def get(key):
    return getattr(_c, key)


def get_int(key) -> int:
    return int(getattr(_c, key))


def get_bool(key) -> bool:
    return bool(getattr(_c, key))


def get_str(key) -> str:
    return str(getattr(_c, key))
