import pytest


@pytest.mark.django_db
def test_agent_md_is_token_first_and_cross_agent(client):
    resp = client.get("/agent.md")
    assert resp.status_code == 200
    assert resp["Content-Type"].startswith("text/plain")
    body = resp.content.decode()
    # token-first: mint a token, no signup
    assert "/api/tokens" in body
    assert "/api/keys" not in body  # renamed → tokens
    assert "no signup" in body.lower()
    assert "/accounts/signup/" not in body
    assert "PROTOPEEK_TOKEN" in body
    assert "Authorization: Bearer" in body
    assert "X-API-Key" not in body
    # cross-agent
    assert "Claude Code" in body and "Codex" in body and "Gemini" in body
    assert ".claude/commands/" in body and "~/.codex/skills/" in body
    assert "~/.codex/prompts/" not in body  # deprecated → skills
    # shared cross-tool core is handed over
    assert "AGENTS.md" in body
    # global store, not per-project .env
    assert "~/.config/protopeek/" in body
    # retention is stated as a flat 30 days
    assert "30 days" in body
    # all four commands embedded
    for cmd in ["proto-up", "proto-status", "proto-feedback", "proto-list"]:
        assert cmd in body
    assert body.count("````md") == 4


@pytest.mark.django_db
def test_agent_md_is_consent_first_and_links_trust_signals(client):
    body = client.get("/agent.md").content.decode()
    # documentation tone with explicit consent gates, not imperative injection-shape
    assert "confirm each with your user" in body
    assert "ask your user first" in body.lower()
    # installer-first: both user-run install channels, before any curl
    npx = body.index("npx skills@latest add Brightwing-Systems-LLC/protopeek")
    assert "claude plugin marketplace add Brightwing-Systems-LLC/protopeek" in body
    assert npx < body.index("/api/tokens")
    # verifiable trust signals: source repo + legal pages
    assert "https://github.com/Brightwing-Systems-LLC/protopeek" in body
    assert "/tos" in body and "/privacy" in body
    # the PII nudge reviewers' agents should relay
    assert "placeholders" in body


@pytest.mark.django_db
def test_landing_leads_with_the_installer(client):
    body = client.get("/").content.decode()
    assert "npx skills@latest add Brightwing-Systems-LLC/protopeek" in body
    assert "/agent.md" in body  # manual fallback still discoverable
    assert "github.com/Brightwing-Systems-LLC/protopeek" in body  # open-source link
