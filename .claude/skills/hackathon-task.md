---
name: hackathon-task
description: >
  Implement a hackathon task end-to-end by task number (#1–#13).
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

1. **Identify the task** from the argument (e.g. `#1`, `#7`).
   Re-read the relevant section in CLAUDE.md "Known bugs & tasks".

2. **Read the affected files** before writing anything.
   Use the file map in CLAUDE.md — open every file you will touch.

3. **Plan briefly** (3–5 bullet points):
   - What changes, in what order (schema first if DB change needed)
   - What must NOT break (existing CRUD)

4. **Implement** the minimal change that satisfies the task.
   - For schema changes: edit `schema.prisma`, then run `/db-push`
   - For API changes: edit `app/api/src/routes/meetings.ts` and `app/web/lib/api.ts` together
   - For UI changes: edit the relevant `page.tsx`

5. **Verify** immediately after implementing:
   - API: `curl http://localhost:4000/api/meetings | jq 'length'`
   - UI-only tasks: describe what to check in the browser

6. **Report** in one short paragraph:
   - Which files changed
   - What the fix / feature does
   - How you verified it
   - Any known edge case left unhandled

---

## Task-specific hints — Hackathon tasks (#1–#6)

### #1 — Date off by one
Fix is in `app/web/lib/api.ts` → `formatDate()`.
Current broken code: `new Date(isoString).toISOString().slice(0, 10)`
Correct fix:
```ts
export function formatDate(isoString: string): string {
  const d = new Date(isoString)
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}
```

### #2 — Delete confirmation
In `app/web/app/meetings/[id]/page.tsx`, add before `deleteMeeting(id)`:
```ts
if (!window.confirm('Delete this meeting? This cannot be undone.')) return
```
No schema or API change needed.

### #3 — Tags
Schema: add `tags String[] @default([])` to the Meeting model. Run `/db-push`.
API: add `?tag=` query param to `GET /api/meetings`:
```ts
const tag = req.query.tag as string | undefined
const where = tag ? { tags: { has: tag } } : {}
```
Update `fetchMeetings` in `api.ts` to accept optional tag string.
UI: add tag input to create/edit forms; add filter input to list page.
Types: add `tags: string[]` to `Meeting` in `app/web/lib/types.ts`.

### #4 — Full-text search
API in `meetings.ts`:
```ts
const q = req.query.q as string | undefined
const where = q ? {
  OR: [
    { title: { contains: q, mode: 'insensitive' as const } },
    { body:  { contains: q, mode: 'insensitive' as const } },
  ]
} : {}
```
Frontend: update `fetchMeetings(q?: string)` in `api.ts`. Add search `<input>` to `app/web/app/page.tsx`.

### #5 — Markdown export
Low priority — skip if time is tight.
Add "Export MD" button to detail page, build Markdown string from title/date/body,
trigger download via `URL.createObjectURL(new Blob([md], { type: 'text/markdown' }))`.
No API or schema change needed.

### #6 — Title overflow
One-liner in `app/web/app/page.tsx`:
```tsx
<span className="font-medium truncate min-w-0">{m.title}</span>
```
Ensure parent flex container has `min-w-0` or `overflow-hidden`.

---

## Task-specific hints — Post-hackathon tasks (#7–#13)

### #7 — Tags ẩn trên detail page
File: `app/web/app/meetings/[id]/page.tsx`
Sau phần render date, thêm:
```tsx
{meeting.tags && meeting.tags.length > 0 && (
  <div className="flex gap-2 flex-wrap mt-2">
    {meeting.tags.map(tag => (
      <span key={tag} className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">
        {tag}
      </span>
    ))}
  </div>
)}
```
Không cần thay đổi API hay schema.

### #8 — Date mặc định sai trong form
File: `app/web/app/meetings/new/page.tsx`
Tìm chỗ khởi tạo state `meetingDate`, sửa thành:
```ts
const [meetingDate, setMeetingDate] = useState(new Date().toISOString().slice(0, 10))
```
Không cần thay đổi API hay schema.

### #9 — Body không giữ line break
File: `app/web/app/meetings/[id]/page.tsx`
Tìm element render `body`, thêm class `whitespace-pre-wrap`:
```tsx
<p className="whitespace-pre-wrap">{meeting.body}</p>
```
Không cần thay đổi API hay schema.

### #10 — Empty state khi search/filter rỗng
File: `app/web/app/page.tsx`
Sau khi render list, thêm điều kiện:
```tsx
{meetings.length === 0 && (query || tagFilter) && (
  <p className="text-center text-gray-500 py-8">No meetings found.</p>
)}
```
`query` và `tagFilter` là tên state tương ứng với search input và tag filter.

### #11 — Thiếu nút Back
Files: `app/web/app/meetings/[id]/page.tsx`, `app/web/app/meetings/[id]/edit/page.tsx`
Thêm ở đầu mỗi page, sau phần import:
```tsx
import Link from 'next/link'
// ...
<Link href="/" className="text-sm text-gray-500 hover:text-gray-700">← Back</Link>
```

### #12 — Pagination
API: thêm `?page=` và `?limit=` vào `GET /api/meetings` trong `meetings.ts`:
```ts
const page  = parseInt(req.query.page  as string) || 1
const limit = parseInt(req.query.limit as string) || 20
const meetings = await prisma.meeting.findMany({
  where, orderBy: { meetingDate: 'desc' },
  skip: (page - 1) * limit, take: limit,
})
```
Frontend: thêm state `page`, nút Prev/Next, cập nhật `fetchMeetings` nhận `page`.

### #13 — Attendees field
Schema: thêm `attendees String[] @default([])` vào Meeting model. Run `/db-push`.
Types: thêm `attendees: string[]` vào `Meeting` trong `app/web/lib/types.ts`.
UI: thêm input attendees (comma-separated) vào create/edit form, tương tự Tags.
Hiển thị attendees trên detail page.
