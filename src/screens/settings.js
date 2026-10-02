// Screen Module: G. Personal & Settings (G1 - G6)

export function renderSettings(state) {
  const current = state.currentScreen;

  // G1: Personal Profile Screen
  if (current === 'G1_profile') {
    return `
      <div class="screen-viewport">
        <div class="screen-header" style="padding: 16px var(--margin-side) 8px;">
          <div class="screen-title-area">
            <span class="text-xs" style="color: var(--accent-mint); font-weight: 700; text-transform: uppercase;">Cá nhân hóa</span>
            <h1>Cá nhân</h1>
          </div>
          <button class="btn-icon" id="btn-open-settings-appearance" title="Cài đặt giao diện">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
          </button>
        </div>

        <div class="screen-content">
          <!-- Profile Card (Local Only - No Account Needed) -->
          <div class="card" style="padding: 18px; margin-top: 6px;">
            <div style="display: flex; align-items: center; gap: 14px;">
              <div style="width: 56px; height: 56px; border-radius: 50%; background: linear-gradient(135deg, var(--accent-mint) 0%, var(--accent-lavender) 100%); display: flex; align-items: center; justify-content: center; font-size: 26px; color: #0B1220; font-weight: 800;">
                M
              </div>
              <div style="flex: 1;">
                <div style="display: flex; align-items: center; justify-content: space-between;">
                  <h2 style="font-size: 18px;">Minh Đức</h2>
                  <span class="badge badge-mint">Hồ sơ máy</span>
                </div>
                <p class="text-xs" style="margin-top: 2px;">Không cần tài khoản • Dữ liệu lưu 100% trên thiết bị</p>
              </div>
            </div>

            <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 8px; margin-top: 16px; border-top: 1px solid var(--border-subtle); padding-top: 14px; text-align: center;">
              <div>
                <span class="text-xs" style="color: var(--text-secondary);">Chuỗi ngày</span>
                <div class="tabular-nums" style="font-size: 18px; font-weight: 800; color: var(--accent-peach); margin-top: 2px;">🔥 14 ngày</div>
              </div>
              <div>
                <span class="text-xs" style="color: var(--text-secondary);">Tổng giờ ngủ</span>
                <div class="tabular-nums" style="font-size: 18px; font-weight: 800; color: var(--accent-lavender); margin-top: 2px;">128 giờ</div>
              </div>
              <div>
                <span class="text-xs" style="color: var(--text-secondary);">Điểm TB</span>
                <div class="tabular-nums" style="font-size: 18px; font-weight: 800; color: var(--accent-mint); margin-top: 2px;">86/100</div>
              </div>
            </div>
          </div>

          <!-- Unlocked Badges (100% Free) -->
          <span class="text-xs" style="font-weight: 700; color: var(--text-tertiary); text-transform: uppercase; margin-top: 14px; display: block;">Huy hiệu đã đạt (Mở khóa miễn phí)</span>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-top: 8px;">
            <div class="card" style="padding: 12px; margin-bottom: 0;">
              <span style="font-size: 24px;">🏆</span>
              <h3 style="font-size: 13px; margin-top: 4px;">Thần tốc rời giường</h3>
              <p class="text-xs" style="color: var(--accent-mint);">Hoàn thành dưới 60s</p>
            </div>
            <div class="card" style="padding: 12px; margin-bottom: 0;">
              <span style="font-size: 24px;">🧠</span>
              <h3 style="font-size: 13px; margin-top: 4px;">Bậc thầy tính nhẩm</h3>
              <p class="text-xs" style="color: var(--accent-lavender);">Giải 50 phép toán</p>
            </div>
            <div class="card" style="padding: 12px; margin-bottom: 0;">
              <span style="font-size: 24px;">🌅</span>
              <h3 style="font-size: 13px; margin-top: 4px;">Đón ánh bình minh</h3>
              <p class="text-xs" style="color: var(--accent-peach);">Dậy trước 06:30 10 ngày</p>
            </div>
            <div class="card" style="padding: 12px; margin-bottom: 0;">
              <span style="font-size: 24px;">🧘</span>
              <h3 style="font-size: 13px; margin-top: 4px;">Giấc ngủ sâu</h3>
              <p class="text-xs" style="color: var(--accent-mint);">Điểm số trên 90</p>
            </div>
          </div>

          <!-- Settings Menu Navigation Rows -->
          <div style="margin-top: 16px; display: flex; flex-direction: column; gap: 8px; margin-bottom: 24px;">
            <div class="card card-clickable" id="menu-appearance" style="display: flex; align-items: center; justify-content: space-between; padding: 14px 16px;">
              <div style="display: flex; align-items: center; gap: 12px;">
                <span style="font-size: 20px;">🎨</span>
                <div>
                  <h3 style="font-size: 15px;">Giao diện & Chế độ hiển thị</h3>
                  <p class="text-small">Tối / Sáng, kích thước chữ hệ thống</p>
                </div>
              </div>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m9 18 6-6-6-6"/></svg>
            </div>

            <div class="card card-clickable" id="menu-readiness" style="display: flex; align-items: center; justify-content: space-between; padding: 14px 16px;">
              <div style="display: flex; align-items: center; gap: 12px;">
                <span style="font-size: 20px;">⚡️</span>
                <div>
                  <h3 style="font-size: 15px;">Độ sẵn sàng của báo thức</h3>
                  <p class="text-small">Chẩn đoán pin, quyền toàn màn hình & chuông</p>
                </div>
              </div>
              <span class="badge badge-mint">100% Sẵn sàng</span>
            </div>

            <div class="card card-clickable" id="menu-privacy" style="display: flex; align-items: center; justify-content: space-between; padding: 14px 16px;">
              <div style="display: flex; align-items: center; gap: 12px;">
                <span style="font-size: 20px;">🔒</span>
                <div>
                  <h3 style="font-size: 15px;">Quyền riêng tư & Dữ liệu</h3>
                  <p class="text-small">Quản lý file âm thanh, xuất/xóa dữ liệu</p>
                </div>
              </div>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m9 18 6-6-6-6"/></svg>
            </div>

            <div class="card card-clickable" id="menu-help" style="display: flex; align-items: center; justify-content: space-between; padding: 14px 16px;">
              <div style="display: flex; align-items: center; gap: 12px;">
                <span style="font-size: 20px;">❓</span>
                <div>
                  <h3 style="font-size: 15px;">Hướng dẫn & Mẹo thức dậy</h3>
                  <p class="text-small">Khắc phục sự cố không đổ chuông, góp ý</p>
                </div>
              </div>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m9 18 6-6-6-6"/></svg>
            </div>

            <div class="card card-clickable" id="menu-about" style="display: flex; align-items: center; justify-content: space-between; padding: 14px 16px;">
              <div style="display: flex; align-items: center; gap: 12px;">
                <span style="font-size: 20px;">ℹ️</span>
                <div>
                  <h3 style="font-size: 15px;">Về ZakiAlarm</h3>
                  <p class="text-small">Phiên bản 1.0.0 • Cam kết miễn phí trọn đời</p>
                </div>
              </div>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m9 18 6-6-6-6"/></svg>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  // G2: Appearance Screen
  if (current === 'G2_appearance') {
    return `
      <div class="screen-viewport">
        <div class="screen-header" style="padding: 16px var(--margin-side) 8px;">
          <button class="btn-ghost" id="btn-back-to-profile" style="padding: 0;">Quay lại</button>
          <h2 style="font-size: 17px;">Giao diện & Hiển thị</h2>
          <div style="width: 40px;"></div>
        </div>

        <div class="screen-content">
          <span class="text-xs" style="font-weight: 700; color: var(--text-tertiary); text-transform: uppercase;">Chế độ màu sắc</span>
          <div class="segmented-control" style="margin: 8px 0 16px;">
            <div class="segment-item ${state.theme === 'dark' ? 'active' : ''}" id="btn-set-dark">🌙 Tối (Mặc định)</div>
            <div class="segment-item ${state.theme === 'light' ? 'active' : ''}" id="btn-set-light">☀️ Sáng</div>
          </div>

          <span class="text-xs" style="font-weight: 700; color: var(--text-tertiary); text-transform: uppercase;">Kích thước chữ hệ thống</span>
          <div class="segmented-control" style="margin: 8px 0 16px;">
            <div class="segment-item active" id="btn-scale-normal">Chuẩn</div>
            <div class="segment-item" id="btn-scale-large">Lớn (Dễ đọc)</div>
            <div class="segment-item" id="btn-scale-xlarge">Rất lớn</div>
          </div>
          <p class="text-xs" style="color: var(--text-secondary); margin-bottom: 16px;">
            Cỡ chữ lớn giúp đọc rõ giờ reo và hướng dẫn khi mắt còn ngái ngủ buổi sáng.
          </p>

          <div class="card" style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px;">
            <div>
              <h3 style="font-size: 15px;">Định dạng 24 giờ</h3>
              <p class="text-small">Hiển thị 06:30 thay vì 6:30 SA</p>
            </div>
            <label class="toggle-switch">
              <input type="checkbox" checked />
              <span class="toggle-slider"></span>
            </label>
          </div>

          <div class="card" style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px;">
            <div>
              <h3 style="font-size: 15px;">Rung phản hồi (Haptic)</h3>
              <p class="text-small">Rung nhẹ khi chạm bàn phím và hoàn thành nhiệm vụ</p>
            </div>
            <label class="toggle-switch">
              <input type="checkbox" checked />
              <span class="toggle-slider"></span>
            </label>
          </div>
        </div>
      </div>
    `;
  }

  // G3: Alarm Readiness Diagnostics Tool
  if (current === 'G3_alarm_readiness') {
    return `
      <div class="screen-viewport">
        <div class="screen-header" style="padding: 16px var(--margin-side) 8px;">
          <button class="btn-ghost" id="btn-back-to-profile" style="padding: 0;">Quay lại</button>
          <h2 style="font-size: 17px;">Chẩn đoán báo thức</h2>
          <div style="width: 40px;"></div>
        </div>

        <div class="screen-content">
          <div class="card" style="background: linear-gradient(135deg, #132E27 0%, #151F32 100%); border-color: rgba(94, 234, 212, 0.3); padding: 18px; margin-top: 10px;">
            <div style="display: flex; align-items: center; gap: 12px;">
              <span style="font-size: 32px;">🛡️</span>
              <div>
                <h3 style="font-size: 16px; color: var(--accent-mint);">Báo thức sẵn sàng 100%</h3>
                <p class="text-small" style="color: var(--text-secondary); margin-top: 2px;">Mọi điều kiện kỹ thuật để chuông reo chuẩn xác đã được đáp ứng.</p>
              </div>
            </div>
          </div>

          <span class="text-xs" style="font-weight: 700; color: var(--text-tertiary); text-transform: uppercase; margin-top: 16px; display: block;">5 Yếu tố quan trọng</span>
          <div style="margin-top: 8px; display: flex; flex-direction: column; gap: 8px;">
            <div class="diagnostic-item">
              <span>1. Quyền thông báo ưu tiên cao</span>
              <span class="badge badge-mint">✅ Đạt</span>
            </div>
            <div class="diagnostic-item">
              <span>2. Quyền hiển thị toàn màn hình</span>
              <span class="badge badge-mint">✅ Đạt</span>
            </div>
            <div class="diagnostic-item">
              <span>3. Bỏ qua tối ưu hóa pin (Doze Mode)</span>
              <span class="badge badge-mint">✅ Đạt</span>
            </div>
            <div class="diagnostic-item">
              <span>4. Âm lượng chuông hệ thống (85%)</span>
              <span class="badge badge-mint">✅ Đạt</span>
            </div>
            <div class="diagnostic-item">
              <span>5. Tự kích hoạt khi máy khởi động lại</span>
              <span class="badge badge-mint">✅ Đạt</span>
            </div>
          </div>

          <div style="margin-top: 24px;">
            <button class="btn-primary w-full" id="btn-test-alarm-5s">
              🔔 Thử nghiệm chuông sau 5 giây
            </button>
            <p class="text-xs" style="color: var(--text-secondary); text-align: center; margin-top: 8px;">
              Nhấn nút và khóa màn hình để trải nghiệm cách chuông reo trong thực tế.
            </p>
          </div>
        </div>
      </div>
    `;
  }

  // G4: Privacy & Local Data Management
  if (current === 'G4_privacy') {
    return `
      <div class="screen-viewport">
        <div class="screen-header" style="padding: 16px var(--margin-side) 8px;">
          <button class="btn-ghost" id="btn-back-to-profile" style="padding: 0;">Quay lại</button>
          <h2 style="font-size: 17px;">Quyền riêng tư & Dữ liệu</h2>
          <div style="width: 40px;"></div>
        </div>

        <div class="screen-content">
          <div class="card" style="margin-top: 10px;">
            <span class="text-xs" style="color: var(--text-secondary);">Dung lượng bộ nhớ ứng dụng</span>
            <div class="tabular-nums" style="font-size: 26px; font-weight: 800; color: var(--accent-mint); margin: 4px 0;">14.8 MB</div>
            <p class="text-xs">Bao gồm 3 file âm thanh ngáy (8.2 MB) và dữ liệu lịch sử giấc ngủ (6.6 MB).</p>
          </div>

          <div class="card" style="margin-top: 10px;">
            <h3 style="font-size: 15px;">Cam kết minh bạch dữ liệu</h3>
            <p class="text-small" style="margin-top: 6px; line-height: 1.5;">
              • ZakiAlarm không yêu cầu email, số điện thoại hay tài khoản mạng xã hội.<br>
              • File âm thanh tiếng ngáy chỉ xử lý trên chip AI của máy bạn.<br>
              • Không chứa mã theo dõi quảng cáo (No Ad Trackers).
            </p>
          </div>

          <div style="margin-top: 16px; display: flex; flex-direction: column; gap: 10px;">
            <button class="btn-secondary w-full" id="btn-export-data">
              📥 Xuất dữ liệu giấc ngủ (JSON)
            </button>
            <button class="btn-danger w-full" id="btn-delete-all-data">
              🗑️ Xóa toàn bộ dữ liệu máy & Đặt lại
            </button>
          </div>
        </div>
      </div>
    `;
  }

  // G5: Help & Guides Screen
  if (current === 'G5_help') {
    return `
      <div class="screen-viewport">
        <div class="screen-header" style="padding: 16px var(--margin-side) 8px;">
          <button class="btn-ghost" id="btn-back-to-profile" style="padding: 0;">Quay lại</button>
          <h2 style="font-size: 17px;">Trợ giúp & Hướng dẫn</h2>
          <div style="width: 40px;"></div>
        </div>

        <div class="screen-content">
          <span class="text-xs" style="font-weight: 700; color: var(--text-tertiary); text-transform: uppercase; margin-top: 10px; display: block;">Câu hỏi thường gặp</span>
          <div style="margin-top: 8px; display: flex; flex-direction: column; gap: 8px;">
            <div class="card" style="padding: 14px 16px;">
              <h3 style="font-size: 15px;">Làm sao đảm bảo báo thức luôn kêu?</h3>
              <p class="text-small" style="margin-top: 4px;">Hãy kiểm tra mục "Độ sẵn sàng của báo thức", đảm bảo đã tắt Tối ưu hóa pin đối với ZakiAlarm và để âm lượng chuông ở mức nghe rõ.</p>
            </div>

            <div class="card" style="padding: 14px 16px;">
              <h3 style="font-size: 15px;">Nhiệm vụ Chụp ảnh báo lỗi mờ?</h3>
              <p class="text-small" style="margin-top: 4px;">Buổi sáng ánh sáng yếu có thể làm giảm độ tương phản. Hãy bật đèn nhà tắm hoặc chụp các vật thể có đường nét tương phản rõ ràng.</p>
            </div>

            <div class="card" style="padding: 14px 16px;">
              <h3 style="font-size: 15px;">Nếu gặp chấn thương không làm được nhiệm vụ?</h3>
              <p class="text-small" style="margin-top: 4px;">Bạn có thể chọn nút "Thoát khẩn cấp" trên màn hình nhiệm vụ và chạm 15 lần để tắt chuông an toàn.</p>
            </div>
          </div>

          <div style="margin-top: 20px; margin-bottom: 20px;">
            <button class="btn-secondary w-full" id="btn-send-feedback">
              ✉️ Gửi góp ý cho đội ngũ ZakiAlarm
            </button>
          </div>
        </div>
      </div>
    `;
  }

  // G6: About Screen
  if (current === 'G6_about') {
    return `
      <div class="screen-viewport">
        <div class="screen-header" style="padding: 16px var(--margin-side) 8px;">
          <button class="btn-ghost" id="btn-back-to-profile" style="padding: 0;">Quay lại</button>
          <h2 style="font-size: 17px;">Về ZakiAlarm</h2>
          <div style="width: 40px;"></div>
        </div>

        <div class="screen-content" style="text-align: center;">
          <div style="width: 80px; height: 80px; margin: 24px auto 12px; border-radius: 22px; background: var(--bg-surface); display: flex; align-items: center; justify-content: center; border: 1px solid var(--border-medium); box-shadow: var(--shadow-sm);">
            <img src="/logo.svg" style="width: 58px; height: 58px;" alt="Logo" />
          </div>

          <h1 style="font-size: 24px;">ZakiAlarm</h1>
          <p class="text-small" style="color: var(--accent-mint); font-weight: 700;">Phiên bản 1.0.0 (Bản phát hành chính thức)</p>

          <div class="card" style="margin-top: 24px; text-align: left; background: var(--bg-surface);">
            <h3 style="font-size: 15px;">Tôn chỉ phát triển</h3>
            <p class="text-small" style="margin-top: 6px; line-height: 1.6;">
              ZakiAlarm được xây dựng với mục tiêu mang đến cho cộng đồng một ứng dụng báo thức và giấc ngủ thuần khiết, tôn trọng người dùng:
              <br><br>
              • <strong>Hoàn toàn miễn phí:</strong> Không có bản trả phí, không thu tiền gói năm hay ẩn phí.<br>
              • <strong>Không quảng cáo:</strong> Không làm phiền buổi sáng của bạn bằng video quảng cáo.<br>
              • <strong>Độc lập & Riêng tư:</strong> Mọi thuật toán phân tích thực thi trên thiết bị.
            </p>
          </div>

          <div style="margin-top: 24px; display: flex; justify-content: center; gap: 16px;">
            <a href="#" class="text-xs" style="color: var(--text-secondary); text-decoration: underline;">Chính sách bảo mật</a>
            <span class="text-xs" style="color: var(--text-tertiary);">•</span>
            <a href="#" class="text-xs" style="color: var(--text-secondary); text-decoration: underline;">Điều khoản dịch vụ</a>
          </div>
        </div>
      </div>
    `;
  }

  return '';
}
