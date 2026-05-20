# Codebase Tour

> Languages: **English** | [日本語](codebase-tour.ja.md) | [Tiếng Việt](codebase-tour.vi.md)

This app is a minimal implementation of a meeting-notes tool. This document is a **map**, not a deep dive — read the source directly, or feed it to an AI coding tool, to learn the details.

> **AI tool tip**: pass this document plus `app/README.md` to your AI tool and ask it to summarize the structure. That is usually enough to grasp the codebase quickly.

## Directory Layout

```
app/
├── docker-compose.yml       # 3 containers (web / api / db)
├── .env.example             # env-var template
├── README.md                # developer setup
├── web/                     # Next.js (App Router) frontend
│   ├── app/                 # page components (App Router conventions)
│   │   ├── page.tsx         # list view (/)
│   │   └── meetings/
│   │       ├── new/         # create
│   │       └── [id]/        # detail / edit
│   └── lib/
│       ├── api.ts           # API call functions
│       └── types.ts         # shared types
└── api/                     # Express + TypeScript API
    ├── src/
    │   ├── index.ts         # server entry
    │   └── routes/
    │       └── meetings.ts  # CRUD routes
    └── prisma/
        ├── schema.prisma    # DB schema
        └── seed.ts          # seed script
```

## How to Run

```bash
cd app
docker compose up --build
```

- web: http://localhost:3000
- api: http://localhost:4000 (try `/health` to check it is up)
- db: PostgreSQL on host port 5433

The first run seeds 12 meetings into the DB.

## API Endpoints

| Method | Path | Purpose |
|---|---|---|
| GET | `/health` | Liveness check |
| GET | `/api/meetings` | List meetings (sorted by `meetingDate` desc) |
| GET | `/api/meetings/:id` | Get one |
| POST | `/api/meetings` | Create |
| PUT | `/api/meetings/:id` | Update |
| DELETE | `/api/meetings/:id` | Delete |

## Data Model

```prisma
model Meeting {
  id          String   @id @default(cuid())
  title       String
  body        String
  meetingDate DateTime
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
```

## "Where to start" Map

When you want to change something, this is where to look first:

| Goal | Start here |
|---|---|
| Change the look of the list view | `app/web/app/page.tsx` |
| Detail / edit / delete behavior | `app/web/app/meetings/[id]/page.tsx`, `[id]/edit/page.tsx` |
| Create form behavior | `app/web/app/meetings/new/page.tsx` |
| How API requests are sent / received | `app/web/lib/api.ts` |
| API logic (CRUD) | `app/api/src/routes/meetings.ts` |
| DB schema changes | `app/api/prisma/schema.prisma` |
| Add seed data | `app/api/prisma/seed.ts` |
| Date display formatting | `formatDate` in `app/web/lib/api.ts` |

## Changing the DB Schema

```bash
# 1. Edit schema.prisma
# 2. Inside the container:
docker compose exec api npx prisma db push --accept-data-loss
docker compose exec api npx prisma generate
```

This is a hackathon environment, so we use `db push` rather than committed migrations.

## Tips for Verifying Your Changes

- API alone: `curl http://localhost:4000/api/meetings | jq`
- DB directly: `docker compose exec db psql -U app meetings -c "SELECT title, \"meetingDate\" FROM \"Meeting\";"`
- Frontend: open http://localhost:3000 in a browser

## What This Document Does *Not* Cover

- Implementation details of existing code (read the source, or ask your AI)
- A recommended implementation pattern (your approach is up to you)
- Hints for solving specific tasks (use `tasks/user-stories.md` as your starting point)

## If You Finish All 6 Tasks Early

With a modern AI coding tool, finishing all 6 tasks well within the 1.5h window is realistic. If that happens, **use the remaining time on additional improvements you spot in the code**. Some prompts that tend to surface useful work:

- Search the codebase for `TODO` comments and address one or two
- Look at error handling around `app/api/src/routes/meetings.ts` and `app/web/lib/api.ts` — is anything silent or unhelpful?
- Audit the create/edit forms (`app/web/app/meetings/new/page.tsx`, `app/web/app/meetings/[id]/edit/page.tsx`) for missing validation
- Loading and empty states — are they doing the user any favors?
- Accessibility basics (labels, keyboard focus, contrast)
- Performance smells in the list page when many rows are present

Record what you did in the **"Extra work (optional)"** section of the PR body (`docs/submission.md` template). There is no separate point bucket for these — they help anchor your retrospective afterwards.
