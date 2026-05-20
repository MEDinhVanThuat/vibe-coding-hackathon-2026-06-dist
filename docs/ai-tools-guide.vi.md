# Hướng dẫn dùng công cụ lập trình AI

> Ngôn ngữ: [English](ai-tools-guide.md) | [日本語](ai-tools-guide.ja.md) | **Tiếng Việt**

Trong hackathon này, dùng công cụ lập trình AI là **được phép tự do** và **được khuyến khích**. Không có công cụ bắt buộc, cũng không có workflow bắt buộc. Dùng cái phù hợp với bạn.

## Các công cụ có thể dùng (ví dụ)

Bất kỳ công cụ nào dưới đây đều ổn. Dùng cái bạn quen thuộc, hoặc tận dụng cơ hội này thử cái mới.

| Công cụ | Hình thái | Đặc trưng |
|---|---|---|
| Claude Code | CLI / tích hợp IDE | Agentic, sub-agent song song, task chạy lâu |
| GitHub Copilot | IDE inline + Chat | Inline completion, hỗ trợ PR |
| Cursor | IDE | Completion + chat, composer mode |
| Windsurf | IDE | Tính năng agent, thao tác file tự động |
| Aider | CLI | Tích hợp git workflow |
| Gemini Code Assist | IDE | Context lớn, hệ sinh thái Google |
| ChatGPT / Claude.ai | Web | Chỉ hội thoại — code phải copy/paste |

Sự khác biệt giữa các công cụ là chuyện bình thường trong các team thực tế. Mang cái nào giúp bạn làm việc tốt nhất.

---

## Các pattern thực dụng

Đây là những thói quen thường hoạt động tốt với công cụ lập trình AI. Không phải là quy tắc — chọn cái phù hợp với từng task.

### Đầu tư công sức tương xứng với độ phức tạp của task

Mức độ lập kế hoạch và review nên thay đổi theo task.

- Đổi một dòng label thường không cần lập kế hoạch.
- Một feature trải nhiều file thì thường nên có kế hoạch.

Quá lập kế hoạch cho thay đổi nhỏ thì tốn thời gian. Không lập kế hoạch cho thay đổi lớn thì tạo bug bạn phải truy về sau.

### Đưa context vào, đừng giả định AI đã biết

Hầu hết các công cụ AI mặc định chỉ thấy một phần rất nhỏ của repo. Trước khi yêu cầu thay đổi, chỉ rõ các file liên quan: schema hiện có, trang đang edit, route API liên quan.

Một prompt ngắn + đính kèm đúng file thường tốt hơn một prompt dài + không có context.

### Đọc output của AI trước khi chạy

"Compile được" khác với "chạy được". "Chạy được 1 lần" khác với "xử lý các edge case". Lướt qua diff. Chạy các case rõ ràng. Chạy 1 case không rõ ràng.

### Quyết định làm gì trước, bỏ gì lại

Có 6 user story và 1.5 giờ. Có lẽ bạn không thể làm tất cả một cách hoàn hảo. Đọc các story, quyết định thứ tự, quyết định bỏ cái nào, và ghi lý do vào commit message hoặc PR body.

Lý do của bạn có giá trị hơn số lượng feature làm được.

### Khi AI liên tục thất bại, dừng lại và reset

Nếu 3 prompt liên tiếp tạo ra output sai, đó là một tín hiệu — hoặc prompt thiếu context, hoặc task chưa được định nghĩa rõ, hoặc AI không có thông tin cần thiết. Lùi lại, làm rõ, hoặc tự viết code.

---

## Trong ngày

- **Đừng cố hoàn hảo.** Bạn không cần xong cả 6 story. Tập trung vào đâu là quyết định của bạn.
- **Đừng quá tin AI.** Tự kiểm tra hành vi. "AI nói xong" không bằng "tôi đã xác nhận chạy được".
- **Đừng giao toàn bộ phán đoán.** Các quyết định lớn — thứ tự, thiết kế, đánh giá chất lượng cuối cùng — là của bạn.
- **Dừng lại và reset khi bị tắc.** Nếu 3 prompt liên tiếp không có hiệu quả, đổi cách tiếp cận hoặc tự viết.

Chúc vui.
