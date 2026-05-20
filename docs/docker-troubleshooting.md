# Docker Troubleshooting

> Languages: **English** | [日本語](docker-troubleshooting.ja.md) | [Tiếng Việt](docker-troubleshooting.vi.md)

A catalog of common gotchas on Mac / Apple Silicon.
Each item follows a **Symptom → Cause → Fix** structure. When you get stuck on the day of the event, jump straight to the matching item.

If you ran through `docs/pre-event-setup.md` before the event, you will probably not hit any of these for the first time during the event.

---

## 1. `docker compose up` exits immediately

### Symptom

```
Cannot connect to the Docker daemon at unix:///var/run/docker.sock. Is the docker daemon running?
```

### Cause

Docker Desktop itself isn't running.

### Fix

Open Docker Desktop from the menu bar. Wait until the whale icon settles into a stable, "running" state (white, not animated).

```bash
docker info  # should print info without errors
```

---

## 2. Build fails with `exec format error`

### Symptom

```
exec /docker-entrypoint.sh: exec format error
```

or `WARNING: The requested image's platform (linux/amd64) does not match...`

### Cause

You pulled an amd64 image on Apple Silicon. The `platform: linux/arm64` in `docker-compose.yml` is being overridden, or your local Docker config is forcing a different platform.

### Fix

```bash
cd app
docker compose down -v
docker compose build --no-cache
docker compose up
```

If it still fails, check Docker Desktop → Settings → Features in development. If "Use Rosetta for x86/amd64 emulation on Apple Silicon" is enabled, turn it off.

---

## 3. `npm install` is slow / file changes are not reflected

### Symptom

- Build takes 10+ minutes
- Editing `app/web/lib/api.ts` doesn't trigger hot reload

### Cause

Docker volume mounts on Mac are slow. Mounting `node_modules` from the host destroys performance.
This app keeps `node_modules` in a named volume. **Don't put a `node_modules` folder on the host.**

### Fix

```bash
# Remove host-side node_modules if any (the container has its own)
rm -rf app/web/node_modules app/api/node_modules

# Recreate the named volume
docker compose down -v
docker compose up --build
```

Workflow: you edit code on the host, the container picks it up and reloads. `node_modules` lives only inside the container.

---

## 4. Port conflict (3000 / 4000 / 5433 already in use)

### Symptom

```
Error response from daemon: driver failed programming external connectivity on endpoint:
listen tcp 0.0.0.0:3000: bind: address already in use
```

### Cause

Another process on the host is already holding that port.

### Fix

```bash
# Identify the process
lsof -i :3000
lsof -i :4000
lsof -i :5433

# Kill it, or stop the offending app
kill <PID>
```

If you need different ports, edit `ports:` in `app/docker-compose.yml` (e.g. `"3001:3000"`). If you change the API port on the host, also update `NEXT_PUBLIC_API_URL` in your `.env`.

---

## 5. Reset the DB / re-seed

### Symptom

- Data got into a weird state, want the original 12 rows back
- Schema changed, want a fresh table

### Cause

Old data is sitting in the named volume `db_data`.

### Fix

```bash
docker compose down -v   # the -v flag is critical — it deletes the volume
docker compose up --build
```

On startup, `prisma db push` and the seed script run again.

**Note**: without `-v`, the volume sticks around (data is preserved). Use it deliberately.

---

## 6. Prisma client errors

### Symptom

```
@prisma/client did not initialize yet. Please run "prisma generate"
```

or

```
PrismaClientInitializationError: ...
```

### Cause

You changed `schema.prisma` but the Prisma client wasn't regenerated.

### Fix

```bash
# Regenerate inside the container
docker compose exec api npx prisma generate

# Push the schema to the DB
docker compose exec api npx prisma db push --accept-data-loss
```

If that doesn't work, rebuild the container:

```bash
docker compose down
docker compose up --build
```

---

## 7. "Some container is failing — which one?"

### Symptom

http://localhost:3000 returns nothing / connection refused.

### Fix (triage)

```bash
# 1. Container states
docker compose ps

# 2. Logs from the failing one
docker compose logs api      # API
docker compose logs web      # Web
docker compose logs db       # DB
docker compose logs -f api   # follow (Ctrl-C to exit)

# 3. Restart one service
docker compose restart api
```

Look for `Healthy` / `Up` in `docker compose ps`, and scan the logs for stack traces.

---

## 8. Last resort

```bash
cd app
docker compose down -v
docker system prune -f
docker compose up --build
```

If even that fails, ask in Slack and paste the symptom + the relevant logs.

---

## Note on non-Apple-Silicon environments

This hackathon is verified on **Mac (Apple Silicon)**. Intel Mac / Linux / Windows should mostly work, but `platform: linux/arm64` may hurt rather than help.

If you're not on Apple Silicon, ping the organizers in Slack — we'll handle it case by case.
