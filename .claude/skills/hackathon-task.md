---
name: hackathon-task
description: >
  Implement a hackathon task end-to-end by task number (#1–#6).
  Reads the user story, identifies relevant files from CLAUDE.md,
  implements the change (schema → API → frontend in order if needed),
  runs verification, and reports what was done.
  Use when the user says "do task #N", "/hackathon-task #N", or similar.
---

# hackathon-task

You are implementing one task from the Hackathon 2026-06 meeting-notes app.
CLAUDE.md (already loaded) has the full context: file map, known bugs, and
the current data model.

## Steps

1. **Identify the task** from the argument (e.g. `#1`, `#4`).
   Re-read the relevant section in CLAUDE.md "Known bugs & tasks".

2. **Read the affected files** before writing anything.
   Use the file map in CLAUDE.md — open every file you will touch.

3. **Plan briefly** (3–5 bullet points in your head, not on screen):
   - What changes, in what order (schema first if DB change needed)
   - What must NOT break (existing CRUD)

4. **Implement** the minimal change that satisfies the user story.
   - For schema changes: edit `schema.prisma`, then run `/db-push`
     (or inline: `docker compose exec api npx prisma db push --accept-data-loss &&
     docker compose exec api npx prisma generate && docker compose restart api`)
   - For API changes: edit `app/api/src/routes/meetings.ts` and
     `app/web/lib/api.ts` together
   - For UI changes: edit the relevant `page.tsx`

5. **Verify** immediately after implementing:
   - API: `curl http://localhost:4000/api/meetings | jq 'length'`
   - If the task is UI-only, describe what to check in the browser

6. **Report** in one short paragraph:
   - Which files changed
   - What the fix / feature does
   - How you verified it
   - Any known edge case left unhandled

## Task-specific hints

### #1 — Date off by one
Fix is in `app/web/lib/api.ts` → `formatDate()`.
Current broken code: `new Date(isoString).toISOString().slice(0, 10)`
Correct: parse date parts from the ISO string without converting to UTC.
Example fix:
```ts
export function formatDate(isoString: string): string {
  const d = new Date(isoString)
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}
```
Also check `app/web/app/meetings/new/page.tsx` — `meetingDate` initial value
uses `.toISOString().slice(0, 10)` too; fix that the same way.

### #2 — Delete confirmation
In `app/web/app/meetings/[id]/page.tsx`, `handleDelete()` has no guard.
Add before `deleteMeeting(id)`:
```ts
if (!window.confirm('Delete this meeting? This cannot be undone.')) return
```
No schema or API change needed.

### #3 — Tags
Schema: add `tags String[] @default([])` to the Meeting model.
Run db-push workflow after.
API: add optional `?tag=` query param to `GET /api/meetings` using
`prisma.meeting.findMany({ where: { tags: { has: tag } } })`.
Update `fetchMeetings` in `api.ts` to accept an optional tag string.
UI: add tag input to create/edit forms; add a filter dropdown/select to the
list page that calls `fetchMeetings(tag)`.
Update `app/web/lib/types.ts`: add `tags: string[]` to the `Meeting` type.

### #4 — Full-text search
API: add `?q=` param to `GET /api/meetings` in `meetings.ts`:
```ts
const q = req.query.q as string | undefined
const where = q ? {
  OR: [
    { title: { contains: q, mode: 'insensitive' as const } },
    { body:  { contains: q, mode: 'insensitive' as const } },
  ]
} : {}
const meetings = await prisma.meeting.findMany({ where, orderBy: { meetingDate: 'desc' } })
```
Frontend: update `fetchMeetings(q?: string)` in `api.ts` to append `?q=`.
UI: add a search `<input>` to `app/web/app/page.tsx` with `useState` +
`useEffect` debounce (or simple onChange re-fetch).

### #5 — Markdown export
Low priority — skip if time is tight.
If implementing: add an "Export MD" button to detail page that builds a
Markdown string from title, date, and body, then triggers a download via
`URL.createObjectURL(new Blob([md], { type: 'text/markdown' }))`.
No API or schema change needed.

### #6 — Title overflow
One-liner in `app/web/app/page.tsx`.
Change the title `<span>`:
```tsx
<span className="font-medium truncate min-w-0">{m.title}</span>
```
Also ensure the parent flex container has `min-w-0` or `overflow-hidden`
so truncation actually takes effect.
