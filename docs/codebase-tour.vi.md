# Tham quan codebase

> Ngôn ngữ: [English](codebase-tour.md) | [日本語](codebase-tour.ja.md) | **Tiếng Việt**

> ✅ **Đã được người bản xứ kiểm duyệt.**

Ứng dụng này là một bản triển khai tối thiểu của công cụ ghi chú cuộc họp. Tài liệu này là một **bản đồ**, không phải phần mô tả chuyên sâu — hãy đọc trực tiếp mã nguồn, hoặc đưa nó cho công cụ lập trình AI, để nắm chi tiết.

> **Mẹo dùng AI**: đưa tài liệu này cùng với `app/README.md` cho công cụ AI và yêu cầu nó tóm tắt cấu trúc. Thường thì như vậy là đủ để nắm nhanh codebase.

## Cấu trúc thư mục

```
app/
├── docker-compose.yml       # 3 container (web / api / db)
├── .env.example             # mẫu biến môi trường
├── README.md                # hướng dẫn cài đặt cho developer
├── web/                     # Next.js (App Router) frontend
│   ├── app/                 # các page component (theo quy ước App Router)
│   │   ├── page.tsx         # danh sách (/)
│   │   └── meetings/
│   │       ├── new/         # tạo mới
│   │       └── [id]/        # chi tiết / chỉnh sửa
│   └── lib/
│       ├── api.ts           # các hàm gọi API
│       └── types.ts         # type dùng chung
└── api/                     # Express + TypeScript API
    ├── src/
    │   ├── index.ts         # điểm vào của server
    │   └── routes/
    │       └── meetings.ts  # các route CRUD
    └── prisma/
        ├── schema.prisma    # schema DB
        └── seed.ts          # script seed
```

## Cách chạy

```bash
cd app
docker compose up --build
```

- web: http://localhost:3000
- api: http://localhost:4000 (thử `/health` để kiểm tra service đang chạy)
- db: PostgreSQL ở host port 5433

Lần chạy đầu sẽ seed 12 cuộc họp vào DB.

## Các API endpoint

| Method | Path | Mục đích |
|---|---|---|
| GET | `/health` | Kiểm tra liveness |
| GET | `/api/meetings` | Danh sách cuộc họp (sắp xếp `meetingDate` giảm dần) |
| GET | `/api/meetings/:id` | Lấy một cuộc họp |
| POST | `/api/meetings` | Tạo mới |
| PUT | `/api/meetings/:id` | Cập nhật |
| DELETE | `/api/meetings/:id` | Xóa |

## Mô hình dữ liệu

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

## Bản đồ "bắt đầu từ đâu"

Khi bạn muốn thay đổi điều gì đó, đây là nơi cần xem trước:

| Mục tiêu | Bắt đầu tại |
|---|---|
| Đổi giao diện danh sách | `app/web/app/page.tsx` |
| Hành vi chi tiết / chỉnh sửa / xóa | `app/web/app/meetings/[id]/page.tsx`, `[id]/edit/page.tsx` |
| Hành vi form tạo mới | `app/web/app/meetings/new/page.tsx` |
| Cách gửi / nhận request API | `app/web/lib/api.ts` |
| Logic API (CRUD) | `app/api/src/routes/meetings.ts` |
| Thay đổi schema DB | `app/api/prisma/schema.prisma` |
| Thêm dữ liệu seed | `app/api/prisma/seed.ts` |
| Định dạng hiển thị ngày | `formatDate` trong `app/web/lib/api.ts` |

## Thay đổi schema DB

```bash
# 1. Sửa schema.prisma
# 2. Trong container:
docker compose exec api npx prisma db push --accept-data-loss
docker compose exec api npx prisma generate
```

Đây là môi trường hackathon, nên chúng ta dùng `db push` thay vì commit migration.

## Mẹo kiểm tra thay đổi

- Chỉ API: `curl http://localhost:4000/api/meetings | jq`
- Trực tiếp DB: `docker compose exec db psql -U app meetings -c "SELECT title, \"meetingDate\" FROM \"Meeting\";"`
- Frontend: mở http://localhost:3000 trên trình duyệt

## Tài liệu này KHÔNG bao gồm

- Chi tiết triển khai của mã hiện có (đọc source, hoặc hỏi AI)
- Pattern triển khai được khuyến nghị (cách tiếp cận là tùy bạn)
- Gợi ý giải các task cụ thể (dùng `tasks/user-stories.md` làm điểm xuất phát)

## Nếu bạn hoàn thành cả 6 task sớm

Với một công cụ AI hiện đại, việc hoàn thành cả 6 task trong khung 1.5h là khả thi. Khi đó hãy **dùng thời gian còn lại để cải thiện thêm những chỗ bạn nhận thấy trong code**. Một số gợi ý:

- Tìm các comment `TODO` trong codebase và xử lý 1-2 cái
- Xem xét xử lý lỗi ở `app/api/src/routes/meetings.ts` và `app/web/lib/api.ts` — có chỗ nào nuốt lỗi hoặc thông báo không hữu ích không?
- Kiểm tra form tạo / chỉnh sửa (`app/web/app/meetings/new/page.tsx`, `app/web/app/meetings/[id]/edit/page.tsx`) xem thiếu validation ở đâu
- Trạng thái loading và empty — có hỗ trợ người dùng tốt không?
- Cơ bản về accessibility (label, keyboard focus, contrast)
- Các vấn đề về hiệu năng ở trang danh sách khi có nhiều dòng

Ghi lại những gì bạn đã làm trong phần **"Việc bổ sung (tùy chọn)"** của body PR (template `docs/submission.vi.md`). Không có thang điểm riêng cho phần này, nhưng giúp ích cho phần phản tư sau sự kiện.
