# Pre-Event Setup (one week before the hackathon)

> Languages: **English** | [日本語](pre-event-setup.ja.md) | [Tiếng Việt](pre-event-setup.vi.md)

To avoid spending hackathon time on environment setup, **complete the steps below before the event**.
Budget around 30 to 60 minutes (the first `docker compose up` build takes 5–10 minutes).

If you get stuck, ask in the `#vibe-coding-hackathon` Slack channel — the organizers will respond.

---

## 1. Docker Desktop install / sanity check

- Docker Desktop for Mac (Apple Silicon build) is installed.
  - Download: https://www.docker.com/products/docker-desktop/
- Docker Desktop is running (whale icon in the menu bar).
- The following commands work in your terminal:

```bash
docker --version          # e.g. Docker version 28.x.x
docker compose version    # e.g. Docker Compose version v2.x.x
```

`docker info` should run without errors.

## 2. Fork and clone the repo

1. Open https://github.com/marketenterprise/vibe-coding-hackathon-2026-06-dist.
2. Click **Fork** at the top right to fork it to your account.
3. Clone your fork locally and add `upstream` pointing at the organizer repo (the staged task pushes go to `upstream/main`, not your fork):

```bash
git clone https://github.com/<your-account>/vibe-coding-hackathon-2026-06-dist.git
cd vibe-coding-hackathon-2026-06-dist
git remote add upstream https://github.com/marketenterprise/vibe-coding-hackathon-2026-06-dist.git
git remote -v   # verify: origin -> your fork / upstream -> marketenterprise
git fetch upstream
```

## 3. Bring up the app

```bash
cd app
docker compose up --build
```

The first build takes 5–10 minutes. Once it's done, three containers should be running:

- `api-1`: log shows `API listening on port 4000`
- `web-1`: log shows `Ready in <time>`
- `db-1`: `database system is ready to accept connections`

## 4. Verify it works

Open http://localhost:3000 in your browser. You should see the list of 12 meetings.

Try also:

- Click a meeting to open its detail view
- Click "New" to open the create page
- On a detail page, try Edit and Delete

If all of that works, you are set for the event day.

## 5. If something doesn't work

- Read `docs/docker-troubleshooting.md` first — it covers the most common issues.
- If that doesn't help, ask in `#vibe-coding-hackathon` on Slack.
- **Don't leave this until the morning of the event.** Run through it now.

---

## Task content

- **`tasks/user-stories.md` is already in the repo** — read it now if you like; feeding it to your AI tool during pre-event preparation is encouraged. `tasks/README.md` has the same summary.
- **`tasks/specs/` (spec examples for the high-priority tasks) is NOT in the repo yet** — it will be pushed to `upstream/main` at the **0:50 mark** of the event. Run `git pull upstream main` then to fetch it (your fork's `origin/main` does not receive that push — see step 2 above for the `upstream` remote). Phase B (0:50–1:25) opens up these specs.

Phase A (0:10–0:50) is meant to be solved from user-stories alone; Phase B adds the spec examples for the high-priority tasks.

## Files you *can* read in advance

- `README.md`
- `docs/codebase-tour.md` ← codebase overview, useful as AI context
- `docs/submission.md` ← submission flow
- `docs/reflection-template.md` ← reflection template
- `docs/ai-tools-guide.md` ← AI tools guide
- `docs/docker-troubleshooting.md` ← companion to this setup doc
- `app/README.md` ← detailed developer setup for the starter app
- The source files (`app/api/prisma/schema.prisma`, etc.) — practicing "have my AI tool read this codebase" before the event makes the day go more smoothly

## What to have ready on the day

- Your usual AI coding tool (Claude Code / Copilot / Cursor / etc.) is already working in your environment.
- All authentication / API keys / logins are sorted out beforehand — don't burn event time on that.
- Pick whatever tools you want — see `docs/ai-tools-guide.md`.
