# Mẫu reflection (5 phút)

> Ngôn ngữ: [English](reflection-template.md) | [日本語](reflection-template.ja.md) | **Tiếng Việt**

> ✅ **Đã được người bản xứ kiểm duyệt.**

Sau hackathon, hãy dành 5 phút để điền mẫu này.
**Vui lòng đính kèm vào cuối phần mô tả PR — đây là mục bắt buộc nộp** (xem mục "Cách nộp" ở dưới). Nếu bạn không kịp mở PR, Slack DM là kênh dự phòng.

Không cần trình bày đầy đủ. **Hãy cụ thể về những gì bạn còn nhớ**: đó chính là dữ liệu cho phân tích cấp tổ chức.

---

## 1. Thứ tự task và thời gian

| Thứ tự | Task | Thời gian xấp xỉ | Trạng thái |
|---|---|---|---|
| 1 | task-1 Date off by one | ~9 phút (09:24 → 09:33) | xong |
| 2 | task-4 Full-text search | ~5 phút (09:33 → 09:38) | xong |
| 3 | task-3 Tags | ~7 phút (09:38 → 09:45) | xong |
| 4 | task-2 Delete confirm | ~5 phút (09:45 → 09:50) | xong |
| 5 | task-6 Title overflow | (trong cùng phiên) | xong |
| 6 | task-5 Markdown export | — | không làm |

## 2. Ủy thác cho AI so với tự quyết định

**Nơi tôi ủy thác:**

- Để Claude Code viết toàn bộ API search cho task-4 — tôi chỉ cần chỉ định "dùng Prisma `contains` thay vì `tsvector`", Claude tự viết query, update `api.ts`, và thêm search input vào `page.tsx`.
- Để Claude Code xử lý boilerplate cho task-2 (dialog confirm) và task-6 (CSS truncate) hoàn toàn — đây là những thay đổi 1–2 dòng, không cần suy nghĩ.
- Dùng Claude Cowork tự động chạy browser test sau mỗi task thay vì tự mở browser kiểm tra thủ công.

**Nơi tôi tự quyết định:**

- Schema design cho task-3: chọn `String[]` thay vì bảng `Tag` riêng. Claude ban đầu đề xuất quan hệ nhiều-nhiều — tôi override vì với 100–500 rows, `String[]` đủ dùng và nhanh hơn nhiều trong hackathon.
- Query strategy cho task-4: Claude đề xuất full-text index PostgreSQL (`tsvector`) — đúng về dài hạn nhưng quá phức tạp. Tôi redirect sang `ILIKE` / `contains` ngay lập tức.
- Thứ tự ưu tiên task: tôi tự phân tích business impact từ user stories (churn risk Acme/BizCo cho task-4, 8 support tickets cho task-1) trước khi bắt đầu — không để AI quyết định thứ tự này.

## 3. Điểm bị mắc

- **task-3 (Tags)**: Claude Code implement xong phần tạo và filter tags, nhưng bỏ sót không render tags trên detail page. Tôi phát hiện ra sau khi dùng Claude Cowork browser review — không phải qua curl test. Fix nhanh nhưng đây là lỗi do thiếu acceptance criteria rõ ràng khi giao việc cho AI.
- **Thứ tự ưu tiên lúc đầu**: tôi mất vài phút đọc lại tất cả user stories để phân tích business impact trước khi bắt đầu code — thời gian này đáng, nhưng có thể rút ngắn nếu đã có framework phân tích sẵn.

## 4. Bạn sẽ thay đổi gì nếu làm lại

- Viết acceptance criteria cụ thể hơn khi giao task cho Claude Code — đặc biệt là "hiển thị ở đâu, trên page nào" thay vì chỉ nói "implement tags".
- Setup Claude Cowork browser test sớm hơn ngay từ task đầu tiên, không chờ đến khi có nhiều task xong.
- Dành ít thời gian hơn cho việc viết skills và context files trong lúc thi — tuy có giá trị nhưng chiếm thời gian implement thực tế.

## 5. Phản hồi về công cụ

### Claude Code (CLI)

- **Điểm tốt**: Implement nhanh, hiểu context từ `CLAUDE.md` tốt, không cần giải thích lại codebase mỗi lần. Custom skills (`hackathon-task.md`) giúp AI biết chính xác file nào cần sửa và code snippet nào phù hợp.
- **Điểm chưa tốt**: Đôi khi đề xuất over-engineering (tsvector, quan hệ nhiều-nhiều) — cần người dùng có đủ context kỹ thuật để redirect. Không tự biết test UI, chỉ test được qua curl.
- **Nếu không có**: mất thêm khoảng 40–50 phút cho phần implement thuần túy.

### Claude Cowork (browser automation + product review)

- **Điểm tốt**: Test UI thực tế trên browser — phát hiện được bug tags ẩn trên detail page mà curl test bỏ sót. Vai trò "product reviewer" giúp phát hiện thêm 7 issues với business value rõ ràng, tạo ra backlog có cơ sở.
- **Điểm chưa tốt**: Không thể tương tác với `window.confirm` dialog qua CDP (bị timeout) — cần workaround khi test delete confirmation.
- **Nếu không có**: bỏ sót bug task-7, không có improvement wishlist có structured business value.

## 6. Tự đánh giá tier

- [x] **T2 — Iterative (Lặp lại)**: Tôi đã chủ động chạy vòng lặp spec → triển khai → kiểm chứng.

Lý do:

> Tôi chạy vòng lặp implement → curl test → browser verify sau mỗi task một cách có chủ đích. Tuy nhiên phần lớn quyết định kỹ thuật vẫn dựa vào gợi ý của AI, và việc kết hợp nhiều tool (Claude Code + Cowork) chưa thực sự có chiến lược rõ ràng từ đầu — nhiều phần diễn ra tự nhiên hơn là được điều phối chủ động.

## 7. Tự do

- Bộ 6 task có độ khó phân bổ hợp lý: task-1 và task-6 là warm-up, task-4 và task-3 là meaty. Tỷ lệ này tốt cho 1.5h.
- Việc giữ `tasks/specs/` đến mốc 0:50 tạo ra áp lực thú vị — buộc phải đọc user story kỹ thay vì chỉ đọc spec.
- Trục đánh giá "ủy thác vs tự quyết định" rất có giá trị — đây là điểm phân biệt rõ nhất giữa người dùng AI có hiệu quả và không có hiệu quả.

---

## Cách nộp

Hãy điền vào template này và **bắt buộc đính kèm vào cuối phần mô tả PR**. PR là nguồn dữ liệu chính cho phân tích cấp tổ chức, và phần phản ánh chứa thông tin không thể suy ra từ code (cảm nhận về tool, ranh giới giao phó / tự quyết, chỗ bị mắc kẹt), vì vậy đây là mục bắt buộc.

**Bạn có thể viết bằng tiếng mẹ đẻ của mình (tiếng Nhật / tiếng Anh / tiếng Việt) — hãy chọn ngôn ngữ bạn viết nhanh nhất.** Không cần hoàn hảo; ưu tiên cụ thể trong phạm vi bạn nhớ được.

Nếu bạn không thể mở PR trong thời gian giới hạn, hãy gửi nội dung tương tự cho đội điều hành qua Slack DM như một phương án dự phòng.
