---
name: submit-pr
description: >
  Prepare and open the hackathon submission PR from the current branch.
  Generates a PR body from the tasks completed in this session, following
  the template in docs/submission.vi.md. Use at the 1:20 mark (5 min before deadline).
---

# submit-pr

## Git context

- **Upstream repo** (nơi mở PR): `https://github.com/marketenterprise/vibe-coding-hackathon-2026-06-dist`
- **Fork của tôi**: `https://github.com/MEDinhVanThuat/vibe-coding-hackathon-2026-06-dist`
- **Branch**: `submit/dinh-van-thuat`

## Cách tôi dùng AI trong hackathon này

- **Claude Code (CLI)**: implement từng task và test dạng `curl`
- **Claude Cowork (browser)**: truy cập browser để smoke test UI sau mỗi task
- **Claude Cowork (review)**: duyệt toàn bộ ứng dụng, phát hiện bug, đề xuất cải thiện với business value

## Before running this skill

Make sure:
1. All changes are committed: `git status` should be clean
2. You are on branch `submit/dinh-van-thuat`
3. The app still passes `/verify-app`

## Steps

### 1. Check current state
```bash
git status
git log --oneline -10
git branch --show-current
```

### 2. Push the branch to fork
```bash
git push origin submit/dinh-van-thuat
```

### 3. Collect what was done

Look at the git diff from the branch start and list:
- Which task numbers were implemented (check CLAUDE.md "Known bugs & tasks")
- What files changed per task
- Execution order

### 4. Open the PR (from fork → upstream)

```bash
gh pr create \
  --repo marketenterprise/vibe-coding-hackathon-2026-06-dist \
  --base main \
  --head MEDinhVanThuat:submit/dinh-van-thuat \
  --title "submit/dinh-van-thuat — Hackathon 2026-06" \
  --body "$(cat <<'EOF'
## Các task tôi đã làm

1. #1 Date off by one — xong
2. #4 Full-text search — xong
3. #3 Tags — xong (schema + API + UI)
4. #2 Delete confirm — xong
5. #6 Title overflow — xong
6. #5 Markdown export — bỏ qua

## Tại sao tôi chọn thứ tự này

- #1 trước: bug ảnh hưởng tất cả user, fix nhanh, không có lý do gì để trì hoãn.
- #4 sau: rủi ro mất khách hàng trực tiếp (Acme + BizCo sắp gia hạn), NPS #1 liên tiếp 6 tháng.
  Impact cao nhất nên làm khi còn đầu óc tươi.
- #3 sau #4: scaling risk rõ ràng nhưng không cấp bách bằng churn.
- #2, #6: UI-only, nhanh, làm sau khi phần phức tạp xong.
- Bỏ #5: yêu cầu từ 1 người, không có validation từ khách hàng, không đủ business case.

## Cách tôi dùng AI

- **Claude Code (CLI)**: implement từng task, test bằng curl sau mỗi bước
- **Claude Cowork (browser automation)**: smoke test UI trực tiếp trên browser sau mỗi task —
  verify list view, search, tag filter, delete confirm, date display
- **Claude Cowork (product review)**: duyệt toàn bộ app sau khi xong, phát hiện thêm bugs
  (tags ẩn trên detail page, body không wrap, thiếu empty state...) và đánh giá business value
  từng cải tiến để ưu tiên backlog

- Tự quyết định: schema design cho #3 (String[] vs bảng Tag riêng),
  query strategy cho #4 (contains vs PostgreSQL tsvector)
- Redirect AI khi cần: lần đầu #4, Claude đề xuất full-text index PostgreSQL —
  đúng về dài hạn nhưng quá phức tạp cho hackathon; đã redirect sang contains đơn giản hơn

## Kiểm thử

- Claude Code: test curl sau mỗi task
- Claude Cowork: browser test — list, create, search, tag filter, delete confirm, date display
- Vấn đề đã biết: search chưa có debounce — mỗi keystroke gọi API

## Backlog phát hiện thêm

Xem tasks/improvement-wishlist.md trong repo để biết danh sách đầy đủ.
EOF
)"
```

## If gh CLI is not available

Mở PR thủ công tại:
`https://github.com/marketenterprise/vibe-coding-hackathon-2026-06-dist/compare/main...MEDinhVanThuat:submit/dinh-van-thuat`

Copy body template từ `docs/submission.vi.md` và điền dựa trên git log.

## Deadline reminder

**PR must be open by 1:25.** You can keep committing after, but the snapshot
at 1:25 is what gets evaluated. Open the PR early (1:20) to be safe.
