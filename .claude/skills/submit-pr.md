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

## Các task đã hoàn thành

### Hackathon tasks (#1–#6)
| # | Task | Status |
|---|---|---|
| #1 | Date off by one | ✅ commit `73ba2d3` |
| #2 | Delete confirmation | ✅ commit `8620272` |
| #3 | Tags (schema + API + UI) | ✅ commit `8e31a32` |
| #4 | Full-text search | ✅ commit `ba87c96` |
| #5 | Markdown export | ⏭ bỏ qua |
| #6 | Title overflow | ✅ (trong codebase) |

### Post-hackathon tasks (#7–#11)
| # | Task | Status |
|---|---|---|
| #7 | Tags hiển thị trên detail page | ✅ commit `8e536f3` |
| #8 | Date mặc định là hôm nay | ✅ (trong codebase) |
| #9 | Body giữ line break | ✅ (trong codebase) |
| #10 | Empty state khi no results | ✅ commit `3441d40` |
| #11 | Back navigation trên detail/edit | ✅ commit `3441d40` |
| #12 | Pagination | ⏭ chưa làm |
| #13 | Attendees field | ⏭ chưa làm |

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

### 3. Open the PR (from fork → upstream)

```bash
gh pr create \
  --repo marketenterprise/vibe-coding-hackathon-2026-06-dist \
  --base main \
  --head MEDinhVanThuat:submit/dinh-van-thuat \
  --title "submit/dinh-van-thuat — Hackathon 2026-06" \
  --body "$(cat <<'EOF'
## Các task tôi đã làm

### Hackathon tasks
1. #1 Date off by one — xong
2. #4 Full-text search — xong
3. #3 Tags — xong (schema + API + UI)
4. #2 Delete confirm — xong
5. #6 Title overflow — xong
6. #5 Markdown export — bỏ qua

### Post-hackathon improvements (phát hiện qua browser review)
7. #7 Tags hiển thị trên detail page — xong
8. #8 Date mặc định là hôm nay — xong
9. #9 Body giữ line break — xong
10. #10 Empty state khi search/filter rỗng — xong
11. #11 Back navigation trên detail và edit page — xong

## Tại sao tôi chọn thứ tự này

- #1 trước: bug ảnh hưởng tất cả user, fix nhanh, không có lý do gì để trì hoãn.
- #4 sau: rủi ro mất khách hàng trực tiếp (Acme + BizCo sắp gia hạn), NPS #1 liên tiếp 6 tháng.
  Impact cao nhất nên làm khi còn đầu óc tươi.
- #3 sau #4: scaling risk rõ ràng nhưng không cấp bách bằng churn.
- #2, #6: UI-only, nhanh, làm sau khi phần phức tạp xong.
- Bỏ #5: yêu cầu từ 1 người, không có validation từ khách hàng, không đủ business case.
- Post-hackathon #7–#11: phát hiện qua browser review với Claude Cowork sau khi hoàn thành hackathon tasks.
  Ưu tiên #7 trước vì Tags feature bị broken ngay sau khi ship.

## Cách tôi dùng AI

- **Claude Code (CLI)**: implement từng task, test bằng curl sau mỗi bước
- **Claude Cowork (browser automation)**: smoke test UI trực tiếp trên browser sau mỗi task —
  verify list view, search, tag filter, delete confirm, date display, back navigation, empty state
- **Claude Cowork (product review)**: duyệt toàn bộ app sau khi xong hackathon tasks, phát hiện
  thêm 7 bugs/improvements và đánh giá business value để ưu tiên backlog

- Tự quyết định: schema design cho #3 (String[] vs bảng Tag riêng),
  query strategy cho #4 (contains vs PostgreSQL tsvector)
- Redirect AI khi cần: lần đầu #4, Claude đề xuất full-text index PostgreSQL —
  đúng về dài hạn nhưng quá phức tạp cho hackathon; đã redirect sang contains đơn giản hơn

## Kiểm thử

- Claude Code: test curl sau mỗi task
- Claude Cowork: browser test toàn bộ flow sau mỗi task
- Vấn đề đã biết: search chưa có debounce — mỗi keystroke gọi API

## Backlog còn lại

Xem `tasks/improvement-wishlist.md` trong repo:
- #12 Pagination (khi >200 meetings)
- #13 Attendees field
EOF
)"
```

## If gh CLI is not available

Mở PR thủ công tại:
`https://github.com/marketenterprise/vibe-coding-hackathon-2026-06-dist/compare/main...MEDinhVanThuat:submit/dinh-van-thuat`

## Deadline reminder

**PR must be open by 1:25.** You can keep committing after, but the snapshot
at 1:25 is what gets evaluated. Open the PR early (1:20) to be safe.
