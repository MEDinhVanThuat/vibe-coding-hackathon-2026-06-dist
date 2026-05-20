# Vibe Coding Hackathon 2026-06

> Available languages: **English** (this file) | [日本語](README.ja.md) | [Tiếng Việt](README.vi.md)

![Vibe Coding Hackathon 2026-06 — Announcement poster](assets/poster-2026-06.png)

Starter repository for the internal Vibe Coding diagnostic hackathon (held June 2026, for the Vietnam-based engineering team).

This hackathon is a diagnostic exercise — a structured way to measure each participant's current ability to use AI coding tools effectively (vibe-coding fluency). You spend **1.5 hours improving an existing meeting-notes app** based on a set of user stories. **What is evaluated is *how* you used AI**, not how much you finished.

## Timeline at a glance

| When | What you do | Pointer |
|---|---|---|
| **T-1 week** | Run through environment setup; ingest the repo (including `tasks/user-stories.md`) into your AI tool | [docs/pre-event-setup.md](docs/pre-event-setup.md) |
| **0:00** | Event starts | — |
| **0:00 – 0:10** | Final environment / AI warmup; read [`docs/codebase-tour.md`](docs/codebase-tour.md) if you haven't | — |
| **0:10 – 0:50** | **Phase A** — work from `tasks/user-stories.md` alone | [tasks/user-stories.md](tasks/user-stories.md) |
| **0:50** | `tasks/specs/` is pushed to `upstream/main`. Run `git pull upstream main` | [tasks/README.md](tasks/README.md) |
| **0:50 – 1:25** | **Phase B** — spec examples for high-priority tasks are now available | tasks/specs/ |
| **1:25** | **Submission deadline** — open a PR from your fork into this repository's `main` | [docs/submission.md](docs/submission.md) |
| **1:25 – 1:30** | Fill out the reflection | [docs/reflection-template.md](docs/reflection-template.md) |

`tasks/user-stories.md` is in the repo from the start — read it ahead of time if you like. The only mid-event push is `tasks/specs/` at 0:50; the `upstream` remote is set up during pre-event prep.

## If you finish all 6 tasks early

With a modern AI coding tool, finishing all 6 tasks well within the 1.5h window is realistic. If that happens, **use the remaining time on additional improvements you spot in the code**.

- See [docs/codebase-tour.md](docs/codebase-tour.md) — "If You Finish All 6 Tasks Early" for prompts that surface useful work
- Record what you did in the **"Extra work (optional)"** section of your PR body ([docs/submission.md](docs/submission.md))
- There is no separate point bucket for these — they help anchor your retrospective afterwards

## Questions / help during the event

- **All questions and bug reports about the event go to Slack `#vibe-coding-hackathon`** — operators are watching there
- **Do not file GitHub issues** against this repository during the event (it would pollute the evaluation surface)
- If you spot a real bug in the starter app that you do not have time to fix, note it in your reflection ([docs/reflection-template.md](docs/reflection-template.md))

## About the evaluation

This event is a **diagnostic, not a competition**. We are not ranking participants by completion rate. We observe how each person works with AI tools.

What matters more than the final implementation is **what you chose to do, what you chose to defer, and how you collaborated with the AI**. See [docs/ai-tools-guide.md](docs/ai-tools-guide.md) for practical guidance.

Output: a personal diagnostic report per participant, plus an organization-level tooling report.

## Design at a glance

| Item | Detail |
|---|---|
| Format | Phase 2 only — improve an existing app, no greenfield work |
| Duration | 1.5 hours, fixed |
| Subject | Meeting-notes app (Next.js + Express + PostgreSQL) |
| Environment | Docker Compose (Mac / Apple Silicon assumed) |
| Tasks | 6 user stories |
| Output | Personal diagnostic report + organization-level tooling report |

## Repository layout

```
vibe-coding-hackathon-2026-06/
├── app/                # starter app (meeting notes)
│   ├── web/            # Next.js (frontend)
│   ├── api/            # Express (backend)
│   └── docker-compose.yml
├── tasks/              # participant-facing task documents
│   ├── README.md       # task delivery schedule
│   ├── user-stories.md # ← already in the repo (read any time)
│   └── specs/          # ← pushed to upstream/main at the 0:50 mark
├── docs/               # participant-facing guides
│   ├── pre-event-setup.md
│   ├── ai-tools-guide.md
│   ├── codebase-tour.md
│   ├── submission.md
│   ├── reflection-template.md
│   └── docker-troubleshooting.md
```

## Status

🚧 Under development (starter implementation phase).
