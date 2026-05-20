# Vibe Coding Hackathon 2026-06

> Ngôn ngữ: [English](README.md) | [日本語](README.ja.md) | **Tiếng Việt** (tệp này)

> ✅ **Đã được người bản xứ kiểm duyệt.**

![Vibe Coding Hackathon 2026-06 — Áp phích thông báo sự kiện](assets/poster-2026-06.png)

Repository khởi đầu cho hackathon chẩn đoán Vibe Coding nội bộ (tổ chức vào tháng 6 năm 2026, dành cho đội ngũ kỹ sư tại Việt Nam).

Đây là một bài tập chẩn đoán — một cách có cấu trúc để đo năng lực sử dụng AI tool của từng người. Bạn sẽ dành **1,5 giờ để cải thiện một ứng dụng ghi chú cuộc họp đã có sẵn** dựa trên một tập user story. **Điều được đánh giá là *cách bạn sử dụng AI*, không phải bạn hoàn thành được bao nhiêu.**

## Timeline trong ngày

| Khi nào | Bạn làm gì | Tham chiếu |
|---|---|---|
| **T-1 tuần** | Cài đặt môi trường; nạp repo (gồm `tasks/user-stories.vi.md`) vào AI tool của bạn | [docs/pre-event-setup.vi.md](docs/pre-event-setup.vi.md) |
| **0:00** | Bắt đầu sự kiện | — |
| **0:00 – 0:10** | Kiểm tra môi trường lần cuối / AI warmup; nếu chưa đọc thì đọc [`docs/codebase-tour.vi.md`](docs/codebase-tour.vi.md) | — |
| **0:10 – 0:50** | **Phase A** — làm chỉ từ `tasks/user-stories.vi.md` | [tasks/user-stories.vi.md](tasks/user-stories.vi.md) |
| **0:50** | `tasks/specs/` được push lên `upstream/main`. Chạy `git pull upstream main` | [tasks/README.vi.md](tasks/README.vi.md) |
| **0:50 – 1:25** | **Phase B** — đã có thể xem các ví dụ spec cho task ưu tiên cao | tasks/specs/ |
| **1:25** | **Hạn nộp bài** — mở PR từ fork của bạn vào `main` của repo này | [docs/submission.vi.md](docs/submission.vi.md) |
| **1:25 – 1:30** | Điền reflection | [docs/reflection-template.vi.md](docs/reflection-template.vi.md) |

`tasks/user-stories.vi.md` đã có sẵn trong repo từ đầu — bạn có thể đọc bất cứ lúc nào trước sự kiện. Lượt push duy nhất trong sự kiện là **`tasks/specs/` ở mốc 0:50**. Remote `upstream` được thiết lập trong giai đoạn chuẩn bị.

## Nếu bạn hoàn thành cả 6 task sớm

Với một AI tool hiện đại, việc hoàn thành cả 6 task trong khung 1.5h là khả thi. Khi đó **hãy dùng thời gian còn lại để cải thiện thêm những chỗ bạn thấy trong code**.

- Xem gợi ý ở [docs/codebase-tour.vi.md](docs/codebase-tour.vi.md) — "Nếu bạn hoàn thành cả 6 task sớm"
- Ghi lại trong phần **"Việc bổ sung (tùy chọn)"** của body PR ([docs/submission.vi.md](docs/submission.vi.md))
- Không có thang điểm riêng, nhưng giúp ích cho phần phản tư sau sự kiện

## Câu hỏi / hỗ trợ trong ngày sự kiện

- **Mọi câu hỏi và báo cáo bug đều gửi vào Slack `#vibe-coding-hackathon`** — ban tổ chức theo dõi ở đó
- **Không tạo GitHub issue** trên repo này trong sự kiện (sẽ làm bẩn bề mặt đánh giá)
- Nếu phát hiện bug thực sự trong app khởi đầu mà bạn không kịp sửa, hãy ghi vào reflection ([docs/reflection-template.vi.md](docs/reflection-template.vi.md))

## Về việc đánh giá

Sự kiện này là **chẩn đoán, không phải cuộc thi**. Chúng tôi không xếp hạng người tham gia theo tỷ lệ hoàn thành. Chúng tôi quan sát cách mỗi người làm việc với công cụ AI.

Quan trọng hơn việc triển khai cuối cùng là **bạn chọn làm gì, bỏ qua gì, và cộng tác với AI như thế nào**. Hướng dẫn thực dụng: [docs/ai-tools-guide.vi.md](docs/ai-tools-guide.vi.md).

Đầu ra: báo cáo chẩn đoán cá nhân cho từng người + báo cáo hiệu quả công cụ ở cấp tổ chức.

## Thiết kế tổng thể

| Mục | Chi tiết |
|---|---|
| Định dạng | Chỉ Phase 2 — cải thiện ứng dụng có sẵn, không làm mới từ đầu |
| Thời lượng | 1,5 giờ, cố định |
| Đề tài | Ứng dụng ghi chú cuộc họp (Next.js + Express + PostgreSQL) |
| Môi trường | Docker Compose (giả định Mac / Apple Silicon) |
| Số task | 6 user story |
| Đầu ra | Báo cáo chẩn đoán cá nhân + báo cáo hiệu quả công cụ ở cấp tổ chức |

## Cấu trúc repository

```
vibe-coding-hackathon-2026-06/
├── app/                # ứng dụng khởi đầu (meeting notes)
│   ├── web/            # Next.js (frontend)
│   ├── api/            # Express (backend)
│   └── docker-compose.yml
├── tasks/              # tài liệu task dành cho người tham gia
│   ├── README.md       # lịch phát hành
│   ├── user-stories.md # ← có sẵn trong repo (đọc bất cứ lúc nào)
│   └── specs/          # ← push lên upstream/main ở mốc 0:50
├── docs/               # hướng dẫn dành cho người tham gia
│   ├── pre-event-setup.md
│   ├── ai-tools-guide.md
│   ├── codebase-tour.md
│   ├── submission.md
│   ├── reflection-template.md
│   └── docker-troubleshooting.md
```

## Trạng thái

🚧 Đang phát triển (giai đoạn triển khai starter).
