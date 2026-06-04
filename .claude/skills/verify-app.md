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

## Core checks (run after every task)

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

# 4. Fetch by id (use id from step 3)
curl -s http://localhost:4000/api/meetings/<ID> | jq '.title'

# 5. Delete the test meeting
curl -s -X DELETE http://localhost:4000/api/meetings/<ID> -o /dev/null -w "%{http_code}"
```

## If a check fails

| Symptom | Likely cause | Fix |
|---|---|---|
| Step 1 fails (connection refused) | Container not running | `docker compose up -d` |
| Step 2 returns error JSON | DB not seeded or migration pending | Run `/db-push` |
| Step 3 returns 500 | Schema mismatch after Prisma change | Run `/db-push` |
| Frontend blank/error at :3000 | Next.js build error | `docker compose logs web` |

---

## Task-specific checks — Hackathon tasks (#1–#6)

- **#1 (date)**: Tạo meeting với ngày hôm nay → list hiển thị đúng ngày (không lệch 1 ngày)
  ```bash
  curl -s -X POST http://localhost:4000/api/meetings \
    -H "Content-Type: application/json" \
    -d '{"title":"date-test","body":"","meetingDate":"2026-06-04T07:00:00.000Z"}' | jq '.meetingDate'
  # Expected: ngày hiển thị là 2026-06-04, không phải 2026-06-03
  ```

- **#2 (delete confirm)**: Mở http://localhost:3000/meetings/<id> → click Delete → phải hiện dialog confirm

- **#3 (tags)**:
  ```bash
  # Tạo meeting có tags
  curl -s -X POST http://localhost:4000/api/meetings \
    -H "Content-Type: application/json" \
    -d '{"title":"tag-test","body":"","meetingDate":"2026-06-04T09:00:00.000Z","tags":["acme","q2"]}' | jq '.tags'
  # Filter theo tag
  curl -s "http://localhost:4000/api/meetings?tag=acme" | jq 'length'
  ```

- **#4 (search)**:
  ```bash
  curl -s "http://localhost:4000/api/meetings?q=sprint" | jq '[.[].title]'
  curl -s "http://localhost:4000/api/meetings?q=SPRINT" | jq 'length'  # case-insensitive
  curl -s "http://localhost:4000/api/meetings?q=" | jq 'length'        # empty → tất cả
  ```

- **#6 (overflow)**: Load http://localhost:3000 → row "Detailed Quarterly Business Review..." hiển thị một dòng với `...`, cột date thẳng hàng

---

## Task-specific checks — Post-hackathon tasks (#7–#13)

- **#7 (tags detail page)**: Mở meeting có tags → detail page phải hiển thị tags dạng badge (không chỉ ở list)

- **#8 (date default)**: Mở http://localhost:3000/meetings/new → trường Date phải hiển thị ngày hôm nay (`2026-06-04`), không phải ngày cũ

- **#9 (body wrap)**: Mở meeting có notes nhiều đoạn → các đoạn xuống dòng đúng, không bị dính nhau

- **#10 (empty state)**:
  - Search từ không có kết quả → hiện "No meetings found." thay vì danh sách trống
  - Filter tag không có meeting → tương tự

- **#11 (back navigation)**: Mở detail page và edit page → có link "← Back" dẫn về `/`

- **#12 (pagination)**:
  ```bash
  curl -s "http://localhost:4000/api/meetings?page=1&limit=5" | jq 'length'  # → 5
  curl -s "http://localhost:4000/api/meetings?page=2&limit=5" | jq 'length'  # → 5 hoặc ít hơn
  ```

- **#13 (attendees)**:
  ```bash
  curl -s -X POST http://localhost:4000/api/meetings \
    -H "Content-Type: application/json" \
    -d '{"title":"att-test","body":"","meetingDate":"2026-06-04T09:00:00.000Z","attendees":["alice","bob"]}' \
    | jq '.attendees'
  ```
