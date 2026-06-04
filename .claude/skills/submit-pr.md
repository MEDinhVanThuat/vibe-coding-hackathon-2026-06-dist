---
name: submit-pr
description: >
  Prepare and open the hackathon submission PR from the current branch.
  Generates a PR body from the tasks completed in this session, following
  the template in docs/submission.vi.md. Use at the 1:20 mark (5 min before deadline).
---

# submit-pr

## Before running this skill

Make sure:
1. All changes are committed: `git status` should be clean
2. You are on branch `submit/<your-name>` (not `main`)
3. The app still passes `/verify-app`

## Steps

### 1. Check current state
```bash
git status
git log --oneline -10
git branch --show-current
```

### 2. Push the branch
```bash
git push origin HEAD
```

### 3. Collect what was done

Look at the git diff from the branch start and list:
- Which task numbers were implemented (check CLAUDE.md "Known bugs & tasks")
- What files changed per task
- Execution order

### 4. Open the PR

```bash
gh pr create \
  --repo <upstream-repo> \
  --base main \
  --title "submit/<your-name> — Hackathon 2026-06" \
  --body "$(cat <<'EOF'
## Các task tôi đã làm

<!-- List in execution order, e.g.: -->
1. #1 Date off by one — xong
2. #4 Full-text search — xong
3. #3 Tags — xong (API + UI cơ bản)
4. #2 Delete confirm — xong
5. #6 Title overflow — xong
6. #5 Markdown export — bỏ qua

## Tại sao tôi chọn thứ tự này

- #1 trước: bug ảnh hưởng tất cả user, fix nhanh (<10 phút), không có lý do gì để trì hoãn.
- #4 sau: rủi ro mất khách hàng trực tiếp (Acme + BizCo sắp gia hạn), NPS #1 liên tiếp 6 tháng.
  Dù phức tạp nhất, impact cao nhất nên làm khi còn đầu óc tươi.
- #3 sau #4: scaling risk rõ ràng nhưng không cấp bách bằng churn.
- #2, #6: UI-only, nhanh, làm sau khi phần phức tạp xong.
- Bỏ #5: yêu cầu từ 1 người, không có validation từ khách hàng, đội sales xác nhận
  không ai hỏi về tính năng này — không đủ business case trong khung thời gian.

## Cách tôi dùng AI

- Công cụ: Claude Code (CLI)
- Ủy thác cho AI: implement #6 (CSS one-liner) và #2 (boilerplate confirm dialog) hoàn toàn
- Tự quyết định: schema design cho #3 (cân nhắc `String[]` vs bảng Tag riêng),
  query strategy cho #4 (full-text Prisma `contains` vs PostgreSQL `tsvector`)
- AI thất bại: lần đầu #4, Claude đề xuất thêm full-text index PostgreSQL —
  đúng về dài hạn nhưng quá phức tạp cho hackathon; tôi redirect sang `contains` đơn giản hơn

## Kiểm thử

- Chạy /verify-app sau mỗi task
- Test thủ công trên browser: list, create, delete, search, tag filter
- Vấn đề đã biết: search chưa có debounce — mỗi keystroke gọi API

## File context AI tự thêm

- `CLAUDE.md` — codebase map, task hints, execution order
- `.claude/skills/hackathon-task.md` — task execution skill
- `.claude/skills/verify-app.md` — smoke test skill
- `.claude/skills/db-push.md` — Prisma migration shortcut
- `.claude/skills/submit-pr.md` — PR submission skill (file này)
EOF
)"
```

## If gh CLI is not available

Open a PR manually at GitHub. Copy the body template from `docs/submission.vi.md`
and fill it in based on the git log.

## Deadline reminder

**PR must be open by 1:25.** You can keep committing after, but the snapshot
at 1:25 is what gets evaluated. Open the PR early (1:20) to be safe.
