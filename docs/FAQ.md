# Câu hỏi thường gặp (FAQ)

## Vì sao chuông không reo?

Kiểm tra lần lượt:

1. Tab ZakiAlarm còn mở không? Trang web không reo được khi tab đã đóng.
2. Máy có đang ngủ sâu/chế độ tiết kiệm pin mạnh không? Hãy giữ máy thức khi cần báo thức.
3. Âm thanh có bị chặn không? Vào Cài đặt, chạy bài kiểm tra âm thanh 5 giây.
4. Báo thức có đang bật và đúng ngày lặp lại không? Kiểm tra lại giờ và các ngày đã chọn.
5. Lần reo đó có bị "bỏ qua lần tiếp theo" (skip) không?

## Báo thức có reo khi đóng tab hoặc khóa máy không?

Không đảm bảo. Đây là giới hạn chung của trang web, không phải lỗi riêng của app.
Muốn reo đáng tin cậy khi khóa máy cần ứng dụng iOS/Android native dùng API báo thức
của hệ điều hành.

## Tôi dùng nhạc của mình làm chuông được không?

Được. Mở mục chọn âm thanh và import file của bạn, tối đa 20 MB. File được lưu
ngay trên thiết bị bằng IndexedDB. Chỉ import nhạc bạn có quyền sử dụng.

## Dữ liệu của tôi có bị gửi đi đâu không?

Không. ZakiAlarm không có tài khoản, không có máy chủ thu dữ liệu. Cài đặt,
lịch sử ngủ và nhạc đã import đều lưu cục bộ trên trình duyệt của bạn.
Bạn có thể xuất dữ liệu hoặc xóa toàn bộ dữ liệu đã lưu trong mục Cài đặt.

## Vì sao nhiệm vụ lắc máy/quét QR không chạy?

Trình duyệt cần bạn cấp quyền cảm biến chuyển động hoặc camera. Nếu thiết bị
không hỗ trợ, app sẽ gợi ý nhiệm vụ toán để thay thế.

## Tôi lỡ tay cần tắt chuông ngay thì sao?

Dùng lối thoát khẩn cấp: chạm 15 lần theo hướng dẫn trên màn hình reo.
