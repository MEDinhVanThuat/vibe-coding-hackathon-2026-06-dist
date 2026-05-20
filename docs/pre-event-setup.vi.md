# Cài đặt trước sự kiện (một tuần trước hackathon)

> Ngôn ngữ: [English](pre-event-setup.md) | [日本語](pre-event-setup.ja.md) | **Tiếng Việt**

> ✅ **Đã được người bản xứ kiểm duyệt.**

Để không phải tốn thời gian hackathon cho việc cài đặt môi trường, **hãy hoàn tất các bước dưới đây trước sự kiện**.
Dự kiến mất khoảng 30 đến 60 phút (lần build đầu tiên bằng `docker compose up` mất 5–10 phút).

Nếu bị tắc, hãy hỏi ở kênh Slack `#vibe-coding-hackathon` — ban tổ chức sẽ phản hồi.

---

## 1. Cài Docker Desktop / kiểm tra hoạt động

- Docker Desktop for Mac (bản Apple Silicon) đã được cài.
  - Tải về: https://www.docker.com/products/docker-desktop/
- Docker Desktop đang chạy (biểu tượng cá voi trên thanh menu).
- Các lệnh sau chạy được trong terminal:

```bash
docker --version          # ví dụ: Docker version 28.x.x
docker compose version    # ví dụ: Docker Compose version v2.x.x
```

`docker info` nên chạy không lỗi.

## 2. Fork và clone repo

1. Mở https://github.com/marketenterprise/vibe-coding-hackathon-2026-06-dist.
2. Nhấn **Fork** ở góc trên bên phải để fork về tài khoản của bạn.
3. Clone fork về máy và thêm repo của ban tổ chức làm remote `upstream` (các lượt push nội dung task sẽ đi đến `upstream/main`, không đến fork của bạn):

```bash
git clone https://github.com/<tài-khoản-của-bạn>/vibe-coding-hackathon-2026-06-dist.git
cd vibe-coding-hackathon-2026-06-dist
git remote add upstream https://github.com/marketenterprise/vibe-coding-hackathon-2026-06-dist.git
git remote -v   # xác nhận: origin → fork của bạn / upstream → marketenterprise
git fetch upstream
```

## 3. Khởi động app

```bash
cd app
docker compose up --build
```

Lần build đầu tiên mất 5–10 phút. Khi hoàn tất, ba container sẽ chạy:

- `api-1`: log hiển thị `API listening on port 4000`
- `web-1`: log hiển thị `Ready in <time>`
- `db-1`: `database system is ready to accept connections`

## 4. Xác minh hoạt động

Mở http://localhost:3000 trên trình duyệt. Bạn sẽ thấy danh sách 12 cuộc họp.

Cũng thử:

- Click một cuộc họp để mở chi tiết
- Click "New" để mở trang tạo mới
- Trên trang chi tiết, thử Edit và Delete

Nếu tất cả đều hoạt động, bạn đã sẵn sàng cho ngày diễn ra sự kiện.

## 5. Nếu có gì không hoạt động

- Đọc `docs/docker-troubleshooting.md` trước — nó bao quát các vấn đề phổ biến nhất.
- Nếu vẫn không giải quyết được, hãy hỏi trên Slack `#vibe-coding-hackathon`.
- **Đừng để đến sáng ngày diễn ra sự kiện.** Hãy chạy thử ngay bây giờ.

---

## Nội dung task

- **`tasks/user-stories.vi.md` đã có sẵn trong repo** — bạn có thể đọc bất cứ lúc nào; nạp vào AI tool trong giai đoạn chuẩn bị là khuyến khích. Bản tóm tắt tương tự cũng có trong `tasks/README.vi.md`
- **`tasks/specs/` (các ví dụ spec cho task ưu tiên cao) chưa có trong repo** — sẽ được push lên `upstream/main` vào **mốc 0:50** trong ngày sự kiện. Khi đó hãy chạy `git pull upstream main` để lấy về (fork của bạn ở `origin/main` không nhận lượt push này — hãy dùng remote `upstream` đã thêm ở bước 2). Phase B (0:50-1:25) mở thêm các spec này

Phase A (0:10-0:50) được thiết kế để giải chỉ từ user story, còn Phase B mở thêm các ví dụ spec cho các task ưu tiên cao.

## Các file bạn *có thể* đọc trước

- `README.md`
- `docs/codebase-tour.md` ← tổng quan codebase, hữu ích làm context cho AI
- `docs/submission.md` ← quy trình nộp bài
- `docs/reflection-template.md` ← template reflection
- `docs/ai-tools-guide.md` ← hướng dẫn dùng AI
- `docs/docker-troubleshooting.md` ← bạn đồng hành của tài liệu cài đặt này
- `app/README.md` ← hướng dẫn cài đặt chi tiết cho developer của ứng dụng khởi đầu
- Các file source (`app/api/prisma/schema.prisma`, v.v.) — luyện tập "cho công cụ AI đọc codebase này" trước sự kiện sẽ giúp ngày diễn ra sự kiện trôi chảy hơn

## Cần chuẩn bị gì cho ngày diễn ra sự kiện

- Công cụ lập trình AI thường dùng (Claude Code / Copilot / Cursor / v.v.) đã hoạt động trong môi trường của bạn.
- Toàn bộ phần authentication / API key / login đã được xử lý xong từ trước — đừng tốn thời gian sự kiện vào việc này.
- Chọn công cụ tùy ý — xem `docs/ai-tools-guide.md`.
