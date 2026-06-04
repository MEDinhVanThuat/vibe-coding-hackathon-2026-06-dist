---
name: verify-app
description: >
  Smoke test the running meeting-notes app after a change.
  Checks API health, CRUD endpoints, and reports pass/fail for each.
  Use after implementing any hackathon task to confirm nothing is broken.
---

# verify-app

Run the following checks in order and report ✅ / ❌ for each.
Stop at the first failure and diagnose before continuing.

## Checks

```bash
# 1. API is up
curl -s http://localhost:4000/health

# 2. List endpoint returns an array
curl -s http://localhost:4000/api/meetings | jq 'type, length'

# 3. Create a test meeting
curl -s -X POST http://localhost:4000/api/meetings \
  -H "Content-Type: application/json" \
  -d '{"title":"__verify_test__","body":"smoke test","meetingDate":"2026-01-15T09:00:00.000Z"}' \
  | jq '{id, title, meetingDate}'

# 4. Fetch the created meeting by id (use id from step 3)
curl -s http://localhost:4000/api/meetings/<ID_FROM_STEP_3> | jq '.title'

# 5. Delete the test meeting
curl -s -X DELETE http://localhost:4000/api/meetings/<ID_FROM_STEP_3> -o /dev/null -w "%{http_code}"
```

## If a check fails

| Symptom | Likely cause | Fix |
|---|---|---|
| Step 1 fails (connection refused) | Container not running | `docker compose up -d` |
| Step 2 returns error JSON | DB not seeded or migration not applied | Run `/db-push`, then `docker compose exec api npx ts-node prisma/seed.ts` |
| Step 3 returns 500 | Schema mismatch after Prisma change | Run `/db-push` |
| Frontend blank/error at :3000 | Next.js build error | `docker compose logs web` |

## After verifying task-specific features

If you just implemented a specific task, also check:

- **#1 (date)**: Does the list show today's date for a meeting created with today's date?
- **#4 (search)**: Does `curl "http://localhost:4000/api/meetings?q=test"` return filtered results?
- **#3 (tags)**: Does `curl "http://localhost:4000/api/meetings?tag=project-x"` work?
- **#6 (overflow)**: Load http://localhost:3000 and check no row bleeds past its container width.
