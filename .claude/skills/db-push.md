---
name: db-push
description: >
  Apply Prisma schema changes to the running Docker PostgreSQL instance.
  Use after editing app/api/prisma/schema.prisma — always run all three
  commands in order (push → generate → restart).
---

# db-push

Run these three commands in order. Do not skip any step.

```bash
cd app

# 1. Push schema changes to DB (drops data only if columns are removed)
docker compose exec api npx prisma db push --accept-data-loss

# 2. Regenerate the Prisma client to match the new schema
docker compose exec api npx prisma generate

# 3. Restart the API container so it picks up the new client
docker compose restart api
```

Then verify the API is back:
```bash
curl -s http://localhost:4000/health
```

## After adding a new field with a default

If you added a field with `@default(...)` (e.g. `tags String[] @default([])`),
existing rows are backfilled automatically by `db push`. Confirm with:

```bash
docker compose exec db psql -U app meetings -c 'SELECT id, tags FROM "Meeting" LIMIT 3;'
```

## If db push fails

- **"relation does not exist"** → the DB container is not running. Run `docker compose up -d db` first.
- **"permission denied"** → wrong DB user. Check `app/.env` — `DATABASE_URL` should use user `app`.
- **"column already exists"** → you are re-running push on an already-applied schema. Safe to ignore.
