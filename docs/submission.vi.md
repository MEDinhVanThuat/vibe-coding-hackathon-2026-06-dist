# Quy định nộp bài

> Ngôn ngữ: [English](submission.md) | [日本語](submission.ja.md) | **Tiếng Việt**

> ✅ **Đã được người bản xứ kiểm duyệt.**

Trước **khi hackathon kết thúc (ở mốc 1 giờ 25 phút)**, hãy nộp bài theo các bước dưới đây.

## Định dạng nộp bài

**Mở một Pull Request.**

Cách thực hiện:

1. Fork repository này về tài khoản của bạn (đã làm trong giai đoạn pre-event setup).
2. Trong fork của bạn, tạo một branch tên `submit/<tên-của-bạn>` và làm toàn bộ công việc trên branch đó.
   - Ví dụ: `submit/linh-nguyen`, `submit/hiroshi-tanaka`
3. Khi xong — hoặc khi đến deadline — mở PR từ fork của bạn vào **branch `main` của repository này**.

PR **sẽ không được merge**: chúng chỉ là snapshot phục vụ chấm điểm. Bạn có thể nộp bài chưa hoàn thiện, miễn là phần đã làm chạy được.

## Nội dung mô tả PR

Sử dụng template này — copy thẳng vào phần body của PR:

```markdown
## Các task tôi đã làm

- Liệt kê theo thứ tự bạn đã thực hiện (dùng số # từ user-stories.md).
- Ví dụ:
  1. #1 Hiển thị ngày theo UTC/JST — xong
  2. #4 tìm kiếm toàn văn — xong
  3. #3 tag — chưa xong (API xong, UI chưa bắt đầu)
  4. #6 title overflow — không làm

## Tại sao tôi chọn thứ tự này

Một đoạn ngắn hoặc bullet list:
- User story nào bạn thấy quan trọng nhất, và tại sao?
- Tại sao bạn phản biện / bỏ qua các task khác?

## Cách tôi dùng AI

- Các công cụ đã dùng (Claude Code / GitHub Copilot / Cursor / khác)
- 2-3 ví dụ cụ thể về việc bạn ủy thác cho AI so với tự quyết định
- Một hoặc hai ví dụ AI thất bại hoặc không cho ra đúng ý của bạn
- Nếu bạn đã dùng các tính năng nâng cao đặc thù của công cụ (sub-agent / custom skill / MCP server / hook / custom command / plan mode...), hãy mô tả cách dùng và kết quả thu được

## Kiểm thử

- Bạn đã thực sự kiểm tra những gì (danh sách, CRUD, tính năng mới, ...)
- Các vấn đề đã biết mà bạn không kịp sửa

## File context AI bạn tự thêm (tùy chọn)

Nếu trong sự kiện bạn tự viết các file context AI và commit vào repo, hãy liệt kê ở đây. Ví dụ những gì được tính:

- File chỉ dẫn cho công cụ (`CLAUDE.md` / `AGENTS.md` / `GEMINI.md` / `.github/copilot-instructions.md` / `.cursorrules`)
- Thư mục cấu hình đặc thù của công cụ (`.claude/skills/` / `.cursor/rules/` / `.windsurf/` / `.continue/`)
- Cấu hình MCP server (`mcp.json`)
- Tương tự cho công cụ bạn đã dùng

Bao gồm là tùy chọn, nhưng nếu có hãy mô tả ngắn nội dung (ghi chú kiến trúc, quy ước, định nghĩa skill, v.v.). Đây là dấu vết về cách bạn dùng AI — đáng để nêu rõ.

## Việc bổ sung (tùy chọn)

Nếu bạn hoàn thành cả 6 task và còn thời gian để cải thiện thêm, liệt kê ở đây:
- Ví dụ: "Thêm validation cho form tạo mới", "Tái cấu trúc xử lý lỗi trong `app/web/lib/api.ts`", "Cải thiện trải nghiệm hiển thị trạng thái loading"
- Một dòng cho mỗi mục là đủ
```

Ảnh chụp màn hình là tùy chọn. Phần body PR rõ ràng bằng chữ đã đủ.

## Deadline

| Thời gian đã trôi | Sự kiện |
|---|---|
| 0:50 | Ví dụ đặc tả cho task ưu tiên cao được push lên `upstream/main` — chạy `git pull upstream main` để lấy về `tasks/specs/` |
| **1:25** | **Deadline nộp bài — mở PR** |
| 1:25–1:30 | Điền reflection (`docs/reflection-template.md`) |

Bạn được phép tiếp tục làm sau 1:25, nhưng **bài được chấm là snapshot PR ở thời điểm 1:25**.

## Cách đánh giá

Những gì chúng tôi nhìn vào, theo thứ tự ưu tiên:

1. **Bạn chọn làm gì, bỏ qua gì** — lý do quan trọng hơn số lượng
2. **Cách bạn ủy thác cho AI so với tự xử lý** — ví dụ cụ thể, không phải khái niệm trừu tượng
3. **Chất lượng code, hành vi thực tế, và liệu bạn có lặp lại quá mức không** — thực dụng, không cần hoàn hảo
4. Mức độ hoàn thành riêng nó là thứ yếu — bạn **không** cần làm xong cả 6 task.

Đây **không phải cuộc thi**: đây là bài chẩn đoán cá nhân kết hợp với dữ liệu cấp tổ chức về hiệu quả công cụ. Mục tiêu "hoàn hảo nhưng hết giờ" tệ hơn "tôi đã đưa ra đánh đổi có chủ đích và có thể giải thích được".
