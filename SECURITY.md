# Security policy

ProtoPeek hosts private prototypes behind unguessable, time-boxed links with an email
allowlist. We take reports about anything that weakens that gate seriously.

## Reporting a vulnerability

Please **do not open a public issue** for security problems. Email
**security@brightwingsystems.com** with a description and reproduction steps.
You'll get an acknowledgment within a few days. Please give us a reasonable window
to fix the issue before public disclosure.

In scope, for example:

- Reading a prototype or its feedback without a valid link **and** an allowlisted identity
- Forging the reviewer-identity cookie or another reviewer's attribution
- Accessing another owner's prototypes, tokens, or feedback through the API
- Bypassing upload limits or the screenshot re-encoding guardrails

Out of scope: issues requiring a leaked owner token (tokens are bearer credentials by
design — rotate them), denial-of-service volume testing against protopeek.dev, and
reports about the intentionally self-asserted nature of reviewer identity (documented
in the Terms of Service).

If you want to test against a live target, please self-host (see the README) rather
than probing protopeek.dev.
