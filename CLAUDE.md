# Meeting Notes App — Hackathon Context

## Stack & entry points
- **Frontend**: Next.js App Router → `app/web/`
- **Backend**: Express + Prisma → `app/api/`
- **DB**: PostgreSQL (Docker, exposed at host port 5433)
- **Run**: `cd app && docker compose up --build`
- **Web**: http://localhost:3000 | **API**: http://localhost:4000

## Key files — open these before changing anything

| What to change | File |
|---|---|
| List view (/) | `app/web/app/page.tsx` |
| Detail / Delete | `app/web/app/meetings/[id]/page.tsx` |
| Edit form | `app/web/app/meetings/[id]/edit/page.tsx` |
| Create form | `app/web/app/meetings/new/page.tsx` |
| API fetch functions + **formatDate** | `app/web/lib/api.ts` |
| Express CRUD routes | `app/api/src/routes/meetings.ts` |
| Prisma schema | `app/api/prisma/schema.prisma` |
| Seed data | `app/api/prisma/seed.ts` |
| Shared TypeScript types | `app/web/lib/types.ts` |

## Current data model

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

## DB migration workflow (hackathon — use db push, NOT migrate)

```bash
docker compose exec api npx prisma db push --accept-data-loss
docker compose exec api npx prisma generate
docker compose restart api
```

Always run all three commands in order after editing `schema.prisma`.

## Quick verification commands

```bash
# API health
curl http://localhost:4000/health

# List meetings
curl http://localhost:4000/api/meetings | jq '.[0]'

# Direct DB query
docker compose exec db psql -U app meetings -c 'SELECT title, "meetingDate" FROM "Meeting" LIMIT 3;'
```

## Known bugs & tasks (Hackathon 2026-06)

### #1 — Date off by one day [BUG]
- **Root cause**: `formatDate()` in `app/web/lib/api.ts` calls `.toISOString().slice(0, 10)`
  which converts the timestamp to UTC before slicing, shifting dates stored in JST
  (e.g. 07:00 JST = 22:00 previous day UTC).
- **Fix**: use `toLocaleDateString` or parse the date parts directly without UTC conversion.

### #2 — Delete has no confirmation [UX]
- `handleDelete()` in `app/web/app/meetings/[id]/page.tsx` calls `deleteMeeting()` immediately.
- **Fix**: add a `window.confirm()` guard or a modal before the delete call.

### #3 — No tags [FEATURE]
- Schema has no tag field. Needs: schema change → API filter param → UI tag input + filter.
- Consider a simple `tags String[]` on the Meeting model (Prisma supports array on PostgreSQL).

### #4 — No full-text search [FEATURE — highest priority]
- `GET /api/meetings` has no query param support.
- **Fix**: add `?q=` to the route (Prisma `contains` on `title` + `body`), update `fetchMeetings`
  in `api.ts`, add search input to `app/web/app/page.tsx`.

### #5 — No Markdown export [FEATURE — low priority]
- Nice-to-have only. Skip if time is tight.

### #6 — Title overflow breaks list layout [UI]
- `app/web/app/page.tsx`: `<span className="font-medium">{m.title}</span>` has no truncation.
- **Fix**: add `truncate` and `min-w-0` Tailwind classes.

## Priority analysis & execution order

| # | Task | Impact | Effort | Why this rank |
|---|---|---|---|---|
| **#1** | Date bug | 🔴 High | ~5 min | Bug ảnh hưởng **tất cả user**, 8 support ticket, fix 1 dòng — không có lý do gì để hoãn |
| **#4** | Full-text search | 🔴 Critical | ~25 min | **Rủi ro churn trực tiếp**: Acme (gia hạn 4 tháng), BizCo (5 tháng) cả hai đang cân nhắc đổi tool. NPS #1 request 6 tháng liên tiếp. Làm khi đầu óc còn tươi |
| **#3** | Tags | 🟠 High | ~20 min | Retention/scaling risk rõ ràng — lead team cảnh báo "không scale được". Cần schema change nên để sau search |
| **#2** | Delete confirm | 🟡 Medium | ~5 min | Thỉnh thoảng xảy ra, không thể hoàn tác, nhưng không ảnh hưởng doanh thu. UI-only, nhanh |
| **#6** | Title overflow | 🟡 Medium | ~3 min | Presentation bug, không mất data, CSS one-liner. Làm cuối vì impact thấp nhất |
| **#5** | Markdown export | ⚪ Skip | — | Yêu cầu từ **1 người**, không có "+1" nào, đội sales xác nhận khách hàng chưa hỏi. Không có business case trong 1.5h |

**Execution timeline (1.5h)**:
- `0:00–0:10` — khởi động, verify docker compose lên được
- `0:10–0:15` — **#1** date bug
- `0:15–0:45` — **#4** full-text search (phức tạp nhất)
- `0:45–0:50` — buffer / `git pull upstream main` lấy specs
- `0:50–1:10` — **#3** tags (schema + API + UI)
- `1:10–1:15` — **#2** delete confirm
- `1:15–1:18` — **#6** title overflow
- `1:18–1:25` — `/submit-pr`, điền PR body, open PR trước deadline

## Skills available

- `/hackathon-task` — implement a task end-to-end by number
- `/verify-app`    — smoke test the running app
- `/db-push`       — run Prisma migration after schema changes
- `/submit-pr`     — prepare and open the submission PR
