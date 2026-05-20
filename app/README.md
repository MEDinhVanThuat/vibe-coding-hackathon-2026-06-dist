# Meeting Notes App

> Languages: **English** | [日本語](README.ja.md) | [Tiếng Việt](README.vi.md)

A meeting-notes app: Next.js + Express + PostgreSQL, orchestrated with Docker Compose.

## Setup

### Prerequisites

- Docker Desktop (Mac)
- 16 GB+ of RAM recommended

### Run

```bash
cd app
docker compose up
```

The first run takes a few minutes for image build and `npm install`. Subsequent runs are fast because the named volume caches `node_modules`.

After startup:

- Web UI: http://localhost:3000
- API: http://localhost:4000/api/meetings
- Health check: http://localhost:4000/health

### Stop

```bash
docker compose down
```

The DB data is kept in a named volume across restarts. To wipe everything and start clean:

```bash
docker compose down -v
```

## Layout

```
app/
├── docker-compose.yml
├── api/                 # Express + TypeScript + Prisma
│   ├── prisma/          # schema.prisma + seed.ts
│   └── src/
│       ├── index.ts     # Express entry
│       ├── lib/db.ts    # Prisma client
│       └── routes/
│           └── meetings.ts
└── web/                 # Next.js App Router
    ├── app/
    │   ├── page.tsx                 # meetings list
    │   ├── meetings/
    │   │   ├── new/page.tsx         # create
    │   │   └── [id]/
    │   │       ├── page.tsx         # detail
    │   │       └── edit/page.tsx    # edit
    │   └── layout.tsx
    └── lib/
        ├── api.ts       # API client
        └── types.ts
```

## API

| Method | Path | Description |
|---|---|---|
| GET | `/api/meetings` | List (sorted by `meetingDate` desc) |
| GET | `/api/meetings/:id` | Get one |
| POST | `/api/meetings` | Create |
| PUT | `/api/meetings/:id` | Update |
| DELETE | `/api/meetings/:id` | Delete |

## Troubleshooting

### `docker compose up` is slow or hangs

- The first run takes a few minutes for image build + `npm install` (especially when pulling arm64 images on Apple Silicon).
- Network bandwidth matters.

### Cannot connect to Postgres

- The `api` service does not start until `db` is healthy.
- If `pg_isready` keeps failing, run `docker compose down -v` to clear the volume and retry.

### Port conflicts

- This stack uses ports 3000, 4000, and 5433.
- If another process is holding those ports, edit `ports:` in `docker-compose.yml`.
