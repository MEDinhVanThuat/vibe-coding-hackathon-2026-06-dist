# Khắc phục sự cố Docker

> Ngôn ngữ: [English](docker-troubleshooting.md) | [日本語](docker-troubleshooting.ja.md) | **Tiếng Việt**

> ✅ **Đã được người bản xứ kiểm duyệt.**

Danh mục các vấn đề thường gặp trên Mac / Apple Silicon.
Mỗi mục theo cấu trúc **Triệu chứng → Nguyên nhân → Cách khắc phục**. Khi bạn bị tắc trong ngày diễn ra sự kiện, hãy nhảy thẳng đến mục tương ứng.

Nếu bạn đã chạy qua `docs/pre-event-setup.md` trước sự kiện, có lẽ bạn sẽ không gặp những vấn đề này lần đầu tiên ngay trong ngày diễn ra sự kiện.

---

## 1. `docker compose up` thoát ngay lập tức

### Triệu chứng

```
Cannot connect to the Docker daemon at unix:///var/run/docker.sock. Is the docker daemon running?
```

### Nguyên nhân

Docker Desktop chưa chạy.

### Cách khắc phục

Mở Docker Desktop từ thanh menu. Đợi đến khi biểu tượng cá voi chuyển sang trạng thái "running" ổn định (màu trắng, không còn animation).

```bash
docker info  # nên in ra info mà không có lỗi
```

---

## 2. Build thất bại với `exec format error`

### Triệu chứng

```
exec /docker-entrypoint.sh: exec format error
```

hoặc `WARNING: The requested image's platform (linux/amd64) does not match...`

### Nguyên nhân

Bạn đã pull image amd64 trên Apple Silicon. `platform: linux/arm64` trong `docker-compose.yml` đang bị override, hoặc cấu hình Docker local đang ép dùng platform khác.

### Cách khắc phục

```bash
cd app
docker compose down -v
docker compose build --no-cache
docker compose up
```

Nếu vẫn thất bại, kiểm tra Docker Desktop → Settings → Features in development. Nếu "Use Rosetta for x86/amd64 emulation on Apple Silicon" được bật, hãy tắt nó.

---

## 3. `npm install` chậm / thay đổi file không được phản ánh

### Triệu chứng

- Build mất hơn 10 phút
- Sửa `app/web/lib/api.ts` không kích hoạt hot reload

### Nguyên nhân

Volume mount của Docker trên Mac khá chậm. Mount `node_modules` từ host sẽ làm hiệu năng tệ nghiêm trọng.
Ứng dụng này giữ `node_modules` trong named volume. **Đừng đặt thư mục `node_modules` trên host.**

### Cách khắc phục

```bash
# Xóa node_modules trên host nếu có (container có riêng)
rm -rf app/web/node_modules app/api/node_modules

# Tạo lại named volume
docker compose down -v
docker compose up --build
```

Workflow: bạn sửa code trên host, container nhận thay đổi và reload. `node_modules` chỉ tồn tại bên trong container.

---

## 4. Xung đột cổng (3000 / 4000 / 5433 đang được dùng)

### Triệu chứng

```
Error response from daemon: driver failed programming external connectivity on endpoint:
listen tcp 0.0.0.0:3000: bind: address already in use
```

### Nguyên nhân

Một process khác trên host đang giữ cổng đó.

### Cách khắc phục

```bash
# Xác định process
lsof -i :3000
lsof -i :4000
lsof -i :5433

# Kill process đó, hoặc dừng app gây xung đột
kill <PID>
```

Nếu bạn cần cổng khác, sửa `ports:` trong `app/docker-compose.yml` (ví dụ `"3001:3000"`). Nếu đổi cổng API trên host, cũng cần cập nhật `NEXT_PUBLIC_API_URL` trong `.env`.

---

## 5. Reset DB / seed lại

### Triệu chứng

- Dữ liệu rơi vào trạng thái lạ, và bạn muốn quay về 12 dòng dữ liệu gốc
- Schema đã thay đổi, và bạn muốn tạo bảng mới

### Nguyên nhân

Dữ liệu cũ đang nằm trong named volume `db_data`.

### Cách khắc phục

```bash
docker compose down -v   # cờ -v rất quan trọng — nó xóa volume
docker compose up --build
```

Khi khởi động, `prisma db push` và script seed sẽ chạy lại.

**Lưu ý**: nếu không có `-v`, volume sẽ vẫn còn (dữ liệu được giữ lại). Hãy dùng cờ này một cách có chủ đích.

---

## 6. Lỗi Prisma client

### Triệu chứng

```
@prisma/client did not initialize yet. Please run "prisma generate"
```

hoặc

```
PrismaClientInitializationError: ...
```

### Nguyên nhân

Bạn thay đổi `schema.prisma` nhưng Prisma client chưa được tạo lại.

### Cách khắc phục

```bash
# Tạo lại trong container
docker compose exec api npx prisma generate

# Push schema vào DB
docker compose exec api npx prisma db push --accept-data-loss
```

Nếu không hiệu quả, build lại container:

```bash
docker compose down
docker compose up --build
```

---

## 7. "Có container nào lỗi — cái nào?"

### Triệu chứng

http://localhost:3000 không trả về gì / connection refused.

### Cách khắc phục (triage)

```bash
# 1. Trạng thái container
docker compose ps

# 2. Log của container lỗi
docker compose logs api      # API
docker compose logs web      # Web
docker compose logs db       # DB
docker compose logs -f api   # follow (Ctrl-C để thoát)

# 3. Khởi động lại một service
docker compose restart api
```

Tìm `Healthy` / `Up` trong `docker compose ps`, và dò stack trace trong log.

---

## 8. Phương án cuối

```bash
cd app
docker compose down -v
docker system prune -f
docker compose up --build
```

Nếu vẫn không được, hãy hỏi trên Slack và dán triệu chứng cùng log liên quan.

---

## Lưu ý về môi trường không phải Apple Silicon

Hackathon này được kiểm thử trên **Mac (Apple Silicon)**. Intel Mac / Linux / Windows phần lớn vẫn chạy được, nhưng `platform: linux/arm64` có thể gây lỗi thay vì giúp ích.

Nếu bạn không dùng Apple Silicon, hãy ping ban tổ chức trên Slack — chúng tôi sẽ xử lý từng trường hợp.
