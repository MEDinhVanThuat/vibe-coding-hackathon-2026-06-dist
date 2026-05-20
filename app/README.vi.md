# Meeting Notes App

> Ngôn ngữ: [English](README.md) | [日本語](README.ja.md) | **Tiếng Việt**

> ✅ **Đã được người bản xứ kiểm duyệt.**

Ứng dụng ghi chú cuộc họp: Next.js + Express + PostgreSQL, được điều phối bằng Docker Compose.

## Cài đặt

### Yêu cầu

- Docker Desktop (Mac)
- Khuyến nghị 16 GB RAM trở lên

### Khởi chạy

```bash
cd app
docker compose up
```

Lần chạy đầu tiên mất vài phút để build image và chạy `npm install`. Các lần sau nhanh hơn vì named volume cache `node_modules`.

Sau khi khởi động:

- Web UI: http://localhost:3000
- API: http://localhost:4000/api/meetings
- Health check: http://localhost:4000/health

### Dừng

```bash
docker compose down
```

Dữ liệu DB được giữ lại trong named volume qua các lần khởi động lại. Để xóa toàn bộ và bắt đầu sạch:

```bash
docker compose down -v
```

## Cấu trúc

```
app/
├── docker-compose.yml
├── api/                 # Express + TypeScript + Prisma
│   ├── prisma/          # schema.prisma + seed.ts
│   └── src/
│       ├── index.ts     # Express entry
│       ├── lib/db.ts    # Prisma client
│       └── routes/
│           └── meetings.ts
└── web/                 # Next.js App Router
    ├── app/
    │   ├── page.tsx                 # danh sách cuộc họp
    │   ├── meetings/
    │   │   ├── new/page.tsx         # tạo mới
    │   │   └── [id]/
    │   │       ├── page.tsx         # chi tiết
    │   │       └── edit/page.tsx    # chỉnh sửa
    │   └── layout.tsx
    └── lib/
        ├── api.ts       # API client
        └── types.ts
```

## API

| Method | Path | Mô tả |
|---|---|---|
| GET | `/api/meetings` | Danh sách (sắp xếp theo `meetingDate` giảm dần) |
| GET | `/api/meetings/:id` | Lấy một cuộc họp |
| POST | `/api/meetings` | Tạo mới |
| PUT | `/api/meetings/:id` | Cập nhật |
| DELETE | `/api/meetings/:id` | Xóa |

## Khắc phục sự cố

### `docker compose up` chậm hoặc treo

- Lần chạy đầu mất vài phút để build image và chạy `npm install` (đặc biệt khi pull image arm64 trên Apple Silicon).
- Phụ thuộc vào băng thông mạng.

### Không kết nối được Postgres

- Service `api` chỉ khởi động sau khi `db` ở trạng thái healthy.
- Nếu `pg_isready` liên tục thất bại, chạy `docker compose down -v` để xóa volume rồi thử lại.

### Xung đột cổng

- Stack này dùng các cổng 3000, 4000 và 5433.
- Nếu một process khác đã giữ các cổng đó, sửa `ports:` trong `docker-compose.yml`.
