#!/usr/bin/env python3
"""Idempotent Porkbun DNS setup for protopeek (BWS starter §12).

Points the apex and www A records for protopeek.dev at the BWS prod server. A
freshly-registered Porkbun domain ships with **parking** records — an ALIAS at
the apex and a wildcard CNAME, both to pixie.porkbun.com — and an ALIAS is
mutually exclusive with an A record, so the apex A silently fails to stick until
the parking ALIAS is removed. This script deletes those parking records first,
then creates/updates the A records. Safe to re-run.

Credentials come from the environment (never committed):
    PORKBUN_API_KEY      Porkbun API key
    PORKBUN_SECRET_KEY   Porkbun secret key   (NOTE: *_SECRET_KEY, not *_SECRET)

Usage:
    python scripts/dns_setup.py            # apply (clean parking + create/update)
    python scripts/dns_setup.py --dry-run  # print the plan, change nothing

Stdlib only — no third-party deps.
"""

from __future__ import annotations

import argparse
import json
import os
import sys
import urllib.error
import urllib.request

API_BASE = "https://api.porkbun.com/api/json/v3"
DOMAIN = "protopeek.dev"
TARGET_IP = "5.78.149.157"
TTL = "600"

# (label, fqdn): `label` is the subdomain for /dns/create+/dns/edit ("" = apex);
# `fqdn` is what /dns/retrieve reports as the record "name".
DESIRED = [("", DOMAIN), ("www", f"www.{DOMAIN}")]

# Records that must not coexist with our A records: Porkbun parking at the apex,
# www, or wildcard, pointing at their parking host.
_PARKING_NAMES = {DOMAIN, f"www.{DOMAIN}", f"*.{DOMAIN}"}
_PARKING_TYPES = {"ALIAS", "CNAME"}


def _die(msg: str) -> None:
    print(f"error: {msg}", file=sys.stderr)
    raise SystemExit(1)


def _creds() -> dict[str, str]:
    key = os.environ.get("PORKBUN_API_KEY", "").strip()
    secret = os.environ.get("PORKBUN_SECRET_KEY", "").strip()
    if not key or not secret:
        _die(
            "PORKBUN_API_KEY and PORKBUN_SECRET_KEY must be set in the "
            "environment (copy them from ../credentials.txt into your shell or "
            ".env, but never commit them)."
        )
    return {"apikey": key, "secretapikey": secret}


def _post(path: str, payload: dict) -> dict:
    req = urllib.request.Request(
        f"{API_BASE}{path}",
        data=json.dumps(payload).encode(),
        headers={"Content-Type": "application/json"},
        method="POST",
    )
    try:
        with urllib.request.urlopen(req, timeout=30) as resp:
            body = json.loads(resp.read().decode())
    except urllib.error.HTTPError as exc:
        _die(f"POST {path} -> HTTP {exc.code}: {exc.read().decode(errors='replace')}")
    except urllib.error.URLError as exc:
        _die(f"POST {path} failed: {exc.reason}")
    if body.get("status") != "SUCCESS":
        _die(f"POST {path} -> API error: {body.get('message', body)}")
    return body


def retrieve_records(auth: dict) -> list[dict]:
    return _post(f"/dns/retrieve/{DOMAIN}", auth).get("records", [])


def parking_to_delete(records: list[dict]) -> list[dict]:
    """Porkbun default-parking ALIAS/CNAME records at apex/www/wildcard."""
    out = []
    for rec in records:
        if (
            rec.get("type") in _PARKING_TYPES
            and rec.get("name") in _PARKING_NAMES
            and "porkbun.com" in (rec.get("content") or "")
        ):
            out.append(rec)
    return out


def build_a_plan(records: list[dict]) -> list[tuple[str, str, str, str | None]]:
    existing = {r["name"]: r for r in records if r.get("type") == "A"}
    plan: list[tuple[str, str, str, str | None]] = []
    for label, fqdn in DESIRED:
        rec = existing.get(fqdn)
        if rec is None:
            plan.append(("CREATE", label, fqdn, None))
        elif rec.get("content") == TARGET_IP and str(rec.get("ttl")) == TTL:
            plan.append(("OK", label, fqdn, rec.get("id")))
        else:
            plan.append(("UPDATE", label, fqdn, rec.get("id")))
    return plan


def main(argv: list[str] | None = None) -> int:
    parser = argparse.ArgumentParser(
        description="Idempotent Porkbun A-record setup for protopeek.dev."
    )
    parser.add_argument(
        "--dry-run",
        action="store_true",
        help="Print the intended changes without applying anything.",
    )
    args = parser.parse_args(argv)
    auth = _creds()

    print(f"Porkbun DNS setup for {DOMAIN} -> {TARGET_IP} (ttl {TTL})")
    print(f"Mode: {'DRY RUN — no changes will be made' if args.dry_run else 'APPLY'}\n")

    records = retrieve_records(auth)
    parking = parking_to_delete(records)
    a_plan = build_a_plan(records)

    print("Plan:")
    for rec in parking:
        print(f"  [DELETE] {rec['type']:<5} {rec['name']} -> {rec['content']} (parking)")
    for action, label, fqdn, _id in a_plan:
        shown = f"{DOMAIN} (apex)" if label == "" else fqdn
        print(f"  [{action:^6}] A     {shown} -> {TARGET_IP}")
    print()

    if args.dry_run:
        print("Dry run complete — no records were changed.")
        return 0

    changed = 0
    # Delete parking first so the apex A has no conflicting ALIAS.
    for rec in parking:
        _post(f"/dns/delete/{DOMAIN}/{rec['id']}", auth)
        print(f"  deleted  {rec['type']} {rec['name']} (parking)")
        changed += 1
    for action, label, fqdn, rec_id in a_plan:
        if action == "OK":
            continue
        record = {**auth, "type": "A", "name": label, "content": TARGET_IP, "ttl": TTL}
        if action == "CREATE":
            _post(f"/dns/create/{DOMAIN}", record)
            print(f"  created  A {fqdn} -> {TARGET_IP}")
        else:
            _post(f"/dns/edit/{DOMAIN}/{rec_id}", record)
            print(f"  updated  A {fqdn} -> {TARGET_IP}")
        changed += 1

    print(f"\nDone — {changed} change(s) applied.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
