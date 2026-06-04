# Improvement Wishlist

## 🔴 Bugs

### [BUG-1] Tags không hiển thị trên detail page
- **File**: `app/web/app/meetings/[id]/page.tsx`
- **Mô tả**: Tags lưu và hiển thị đúng ở list view, nhưng bị ẩn hoàn toàn khi vào `/meetings/[id]`.
- **Fix**: Render tags array từ meeting object, tương tự cách làm ở `page.tsx` list.
- **Effort**: ~5 min
- **Impact**: 🔴 Cao — feature Tags bị broken với mọi user đã dùng

---

## 🟠 UX Improvements

### [UX-1] Date mặc định trong form không phải hôm nay
- **File**: `app/web/app/meetings/new/page.tsx`
- **Mô tả**: Form "New Meeting" set date mặc định sai, user phải tự sửa ngày mỗi lần tạo.
- **Fix**: Set default value bằng `new Date().toISOString().slice(0, 10)`.
- **Effort**: ~2 min
- **Impact**: 🟠 Trung bình — friction trên core user flow

### [UX-2] Body/Notes không render line break đúng
- **File**: `app/web/app/meetings/[id]/page.tsx`
- **Mô tả**: Nội dung meeting hiển thị dạng plain text, không giữ xuống dòng. Khó đọc với notes nhiều đoạn.
- **Fix**: Thêm class `whitespace-pre-wrap` vào element hiển thị body.
- **Effort**: ~2 min
- **Impact**: 🟠 Trung bình — readability của core content

### [UX-3] Không có empty state khi search/filter trả về rỗng
- **File**: `app/web/app/page.tsx`
- **Mô tả**: Danh sách trống hoàn toàn khi không có kết quả — user không biết là "không có dữ liệu" hay app bị lỗi.
- **Fix**: Thêm message "No meetings found" khi list rỗng và có filter/search đang active.
- **Effort**: ~10 min
- **Impact**: 🟠 Trung bình — giảm confusion, giảm support ticket

### [UX-4] Không có nút Back trên detail và edit page
- **File**: `app/web/app/meetings/[id]/page.tsx`, `app/web/app/meetings/[id]/edit/page.tsx`
- **Mô tả**: User phải dùng browser back button để quay lại list. Không có navigation rõ ràng trong app.
- **Fix**: Thêm link "← Back to list" dẫn về `/`.
- **Effort**: ~10 min
- **Impact**: 🟡 Thấp — UX polish, đặc biệt với user không quen browser back

---

## 🟡 Nice-to-have

### [FEAT-1] Pagination hoặc infinite scroll
- **File**: `app/web/app/page.tsx`, `app/api/src/routes/meetings.ts`
- **Mô tả**: Hiện tại load tất cả meetings cùng lúc. Sẽ chậm khi data lớn.
- **Fix**: Thêm `?page=` param ở API, render theo trang ở frontend.
- **Effort**: ~30 min
- **Impact**: 🟡 Thấp — chỉ cần thiết khi >200 meetings

### [FEAT-2] Attendees / Participants field
- **Mô tả**: Meeting notes thường gắn với người tham gia. Thiếu field này giảm giá trị khi team lớn hơn.
- **Fix**: Thêm `attendees String[]` vào Prisma schema, UI input tương tự Tags.
- **Effort**: ~45 min
- **Impact**: 🟡 Thấp — feature mới, không urgent

---

## Tóm tắt ưu tiên

| ID | Vấn đề | Effort | Impact |
|---|---|---|---|
| BUG-1 | Tags ẩn trên detail page | ~5 min | 🔴 Cao |
| UX-1 | Date mặc định sai | ~2 min | 🟠 Trung bình |
| UX-2 | Body không wrap đúng | ~2 min | 🟠 Trung bình |
| UX-3 | Empty state khi no results | ~10 min | 🟠 Trung bình |
| UX-4 | Thiếu Back navigation | ~10 min | 🟡 Thấp |
| FEAT-1 | Pagination | ~30 min | 🟡 Thấp |
| FEAT-2 | Attendees field | ~45 min | 🟡 Thấp |
