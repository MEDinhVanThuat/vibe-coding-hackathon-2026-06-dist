# User Stories

> Ngôn ngữ: [English](user-stories.md) | [日本語](user-stories.ja.md) | **Tiếng Việt**

> ✅ **Đã được người bản xứ kiểm duyệt.**

Đây là các yêu cầu và điểm đau mà người dùng của ứng dụng này (công cụ ghi chú cuộc họp) đã nêu ra.
Bạn sẽ đóng vai trò lai giữa PM và engineer. **Bạn tự quyết định việc gì sẽ làm, việc gì sẽ hoãn lại, và phân bổ thời gian như thế nào.**

Mỗi story bao gồm persona và bối cảnh đằng sau yêu cầu. Có thể bạn sẽ không hoàn thiện được cả 6 story trong 1,5 giờ. Hãy xem xét đồng thời tác động kinh doanh và chi phí triển khai, rồi sắp xếp thứ tự ưu tiên.

Ở mốc 0:50, các ví dụ spec cho một số task sẽ được công bố trong `tasks/specs/`. Cho đến lúc đó, hãy chỉ dựa trên các story này.

---

## #1 Ngày họp bị lệch một ngày

### Persona

Linh, thuộc đội customer success. Cô ghi chú hơn 20 cuộc họp với khách hàng mỗi tuần.

### Story

> Ngày hiển thị trên ghi chú cuộc họp đôi khi bị lệch sang một ngày khác so với thời điểm cuộc họp thực sự diễn ra.
> Tôi cần ngày được hiển thị chính xác. **Khi tôi chia sẻ màn hình một ghi chú trong cuộc gọi với khách hàng và nhắc đến "cuộc họp thứ Hai tuần trước", nhưng hóa ra đó lại là ghi chú của ngày hôm trước, cuộc trao đổi với khách hàng trở nên rối rắm.**

### Bối cảnh

Trong tháng vừa qua, đội support đã nhận được **8 ticket** cùng nói về một vấn đề: "Khi tôi tạo ghi chú cho cuộc họp vào sáng sớm (07:00–09:00 JST), list view hiển thị sai ngày." Nguyên nhân gốc rễ vẫn chưa được điều tra.

Bản thân dữ liệu (timestamp được lưu trong DB) là chính xác — vấn đề nằm ở đâu đó trong luồng hiển thị.

Linh chia sẻ ghi chú với khách hàng hằng ngày. **Cô ấy đã nói rõ rằng việc hiển thị sai ngày là vấn đề ảnh hưởng đến uy tín.** Đây là vấn đề về **tính toàn vẹn dữ liệu** ảnh hưởng đến mọi người dùng, và ticket support của cô ấy vẫn tiếp tục xuất hiện **tuần này qua tuần khác**.

---

## #2 Nút Delete xóa ghi chú mà không xác nhận

### Persona

Hiroshi, engineering manager. Anh tự quản lý ghi chú cho các buổi 1-on-1 hằng tuần của mình.

### Story

> Trên trang chi tiết cuộc họp, khi tôi nhấn Delete, không có bước xác nhận nào — ghi chú biến mất ngay lập tức.
> Tôi muốn có một bước xác nhận trước khi xóa. **Nút Delete nằm ngay cạnh nút Edit, và tôi đã bấm nhầm hai lần. Không có cách nào để khôi phục những gì tôi đã xóa.**

### Bối cảnh

App không có soft-delete hay tính năng restore. Một khi đã xóa, ghi chú sẽ mất hẳn.

Hiroshi đã hỏi trên Slack nội bộ hai lần: "Tôi lại làm vậy nữa rồi — có ai khôi phục ghi chú của tôi được không?" Cả hai lần chúng tôi đều phải trả lời: "Không, DB không lưu thông tin đã xóa."

Tần suất xảy ra là **thỉnh thoảng** — nhưng khi xảy ra thì rất đau, và thao tác này là **không thể đảo ngược** khi không có đường khôi phục nào.

---

## #3 Chúng tôi không thể tổ chức cuộc họp theo project / khách hàng

### Persona

Trang, lead của đội consulting. Cô xử lý song song hơn 10 project khách hàng.

### Story

> Tôi muốn gắn tag vào ghi chú cuộc họp — theo project hoặc theo khách hàng — để sau đó có thể lọc danh sách theo một tag cụ thể.
> **Chúng tôi đã có hơn 100 ghi chú**, và mỗi lần muốn tìm "chúng ta đã hứa gì với khách hàng đó trong buổi kickoff?" thì phải scroll qua tất cả mọi thứ. Việc tổ chức thông tin không còn theo kịp nữa.

### Bối cảnh

Đội của Trang đã tạo 220 ghi chú trong Q1. Với tốc độ hiện tại, họ sẽ vượt mốc **500 ghi chú** vào cuối Q2.

Một thành viên mới gia nhập gần đây nói rằng họ mất **trọn một ngày** để lần lại bối cảnh project từ các ghi chú cũ — vì danh sách theo thời gian hiện tại không có thêm cấu trúc nào bên trên.

Nếu có thể lọc theo tag, việc điều hướng lịch sử khách hàng sẽ trở nên nhanh chóng.

Trang đã nói trong cuộc họp leadership tuần trước: **"Không có tính năng này, đội không thể scale."** Đây là vấn đề về retention / scaling — các heavy user hiện tại sẽ tiếp tục cảm thấy đau hơn khi dữ liệu tăng lên.

---

## #4 Chúng tôi không thể tìm kiếm bên trong nội dung ghi chú cuộc họp

### Persona

Mai, thuộc đội corporate planning. Cô thường quay lại lịch sử cuộc họp từ 6–12 tháng trước để tái dựng cách một quyết định đã được đưa ra.

### Story

> Tôi cần tìm kiếm trong **body** của ghi chú cuộc họp, không chỉ trong title.
> Khi tôi cố tìm một quyết định cũ hoặc lý do đằng sau quyết định đó, **nếu tôi không thể tìm theo danh từ riêng hoặc con số nằm trong body của ghi chú, thì cùng một cuộc thảo luận sẽ lại bị lặp lại trong một cuộc họp khác.**

### Bối cảnh

Đây đã là **tính năng được yêu cầu nhiều nhất trong khảo sát NPS nội bộ suốt sáu tháng liên tiếp**.

Đặc biệt, **hai trong số các khách hàng lớn nhất của chúng tôi (Acme và BizCo, cả hai đều sắp đến hạn gia hạn) đã trực tiếp nói rằng "nếu không có search, họ đang cân nhắc chuyển sang đối thủ."** Hợp đồng của Acme sẽ gia hạn trong 4 tháng nữa, BizCo trong 5 tháng nữa. Đội sales nói: **"Chỉ cần search cơ bản thôi cũng đủ để chúng tôi có câu chuyện mang vào đợt gia hạn."**

Leadership đã nhiều lần yêu cầu đưa việc này lên ưu tiên cao nhất. Mọi sprint trước đó đều đã đẩy nó lùi lại. **Đây là rủi ro mất khách hàng trực tiếp, gắn với doanh thu thực.**

---

## #5 Xuất ghi chú cuộc họp dưới dạng Markdown

### Persona

Quang, frontend engineer. Anh quản lý ghi chú cá nhân bằng Obsidian, và được biết đến nội bộ như một "heavy user" của bất kỳ công cụ mới nào.

### Story

> Tôi muốn xuất ghi chú cuộc họp ra Markdown để có thể đưa chúng vào setup Obsidian của mình.
> Hiện tại tôi copy / paste giữa công cụ họp và app ghi chú cá nhân, và format luôn bị vỡ, nên tôi phải sửa tay. **Có thì rất tốt.**

### Bối cảnh

Đây là yêu cầu một lần từ Quang. **Anh ấy đã đăng nó một lần trong `#feedback` trên Slack, và không có người dùng nào khác phản hồi bằng "+1".**

Đội sales đã xác nhận: **"Khách hàng chưa hỏi chúng tôi về tính năng này."** Bản thân Quang viết: **"Nghe giống một tính năng vui — nếu có thời gian."**

---

## #6 Title dài làm vỡ layout list view

### Persona

Aiko, thuộc đội people / HR. Cô đọc lướt danh sách cuộc họp toàn công ty mỗi sáng.

### Story

> Khi một cuộc họp có title rất dài, layout của list view bị vỡ và trở nên khó đọc.
> Tôi muốn title dài được hiển thị gọn gàng, dễ đọc. **Mỗi sáng tôi quét khoảng 30 ghi chú từ trên xuống dưới, và row có title dài đẩy toàn bộ layout sang ngang, bao gồm cả cột date ở bên phải.**

### Bối cảnh

Phần trả lời tự do của khảo sát NPS nội bộ đã ghi nhận vấn đề này vài lần: **"list view thỉnh thoảng khó nhìn."**

Chúng tôi có một vài title thực sự dài — ví dụ buổi quarterly all-hands review dài hơn 130 ký tự — và Aiko phải nheo mắt mỗi lần nhìn tới một title như vậy.

Bản thân dữ liệu thì ổn. Đây là vấn đề ở lớp trình bày.

---

## Câu hỏi dành cho bạn

- **Bạn sẽ xử lý các việc này theo thứ tự nào?**
- **Nếu không thể hoàn thành cả sáu trong 1,5 giờ, bạn cam kết hoàn thiện việc nào, và bỏ lại việc nào?**
- **Nếu bạn ủy thác phần phán đoán này cho công cụ AI (Claude Code / Copilot / Cursor / v.v.), bạn sẽ ủy thác phần nào, và phần nào bạn sẽ tự quyết định?**

Thứ tự xử lý, cách bạn diễn giải spec, và cách bạn phân chia công việc giữa bản thân và AI — tất cả đều là một phần của nội dung được đánh giá.
