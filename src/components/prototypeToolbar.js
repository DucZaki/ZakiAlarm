// Top Prototype Toolbar for Easy Flow Testing & Screen Navigation

export function renderPrototypeToolbar(state) {
  const flows = [
    { id: 1, title: 'Flow 1: Bắt đầu → Báo thức đầu tiên' },
    { id: 2, title: 'Flow 2: Báo thức QR → Đổ chuông → Quét mã' },
    { id: 3, title: 'Flow 3: Đổ chuông → Hoãn (Snooze) → Reo lại' },
    { id: 4, title: 'Flow 4: Bỏ lỡ kiểm tra thức giấc → Reo lại' },
    { id: 5, title: 'Flow 5: Âm thanh thư giãn → Theo dõi → Báo cáo sáng' },
    { id: 6, title: 'Flow 6: Quyền bị từ chối → Khôi phục' },
    { id: 7, title: 'Flow 7: Nhiệm vụ lỗi → Thoát khẩn cấp' },
    { id: 8, title: 'Flow 8: Chuỗi đa nhiệm vụ (Toán + Lắc + Ảnh)' }
  ];

  const screenGroups = [
    {
      group: 'A. Bắt đầu (Onboarding)',
      screens: [
        { id: 'A1_splash', name: 'A1: Màn hình khởi động (Splash)' },
        { id: 'A2_welcome', name: 'A2: Chào mừng & Tôn chỉ miễn phí' },
        { id: 'A3_slides', name: 'A3: 3 Slide tính năng chính' },
        { id: 'A4_setup', name: 'A4: Thiết lập giờ ngủ & thức ban đầu' },
        { id: 'A5_permissions', name: 'A5: Kiểm tra danh mục cấp quyền' }
      ]
    },
    {
      group: 'B. Quản lý báo thức',
      screens: [
        { id: 'B1_home', name: 'B1: Trang chủ danh sách báo thức' },
        { id: 'B2_create_edit', name: 'B2: Tạo / Chỉnh sửa báo thức' },
        { id: 'B3_repeat', name: 'B3: Lịch lặp lại các ngày' },
        { id: 'B4_sound_picker', name: 'B4: Bộ chọn âm thanh chuông' },
        { id: 'B5_snooze_config', name: 'B5: Cài đặt hoãn báo thức' },
        { id: 'B6_quick_alarm', name: 'B6: Báo thức nhanh / Ngủ trưa' },
        { id: 'B7_actions', name: 'B7: Menu tác vụ nhanh báo thức' },
        { id: 'B8_advanced', name: 'B8: Tùy chọn nâng cao & Chống ngủ quên' }
      ]
    },
    {
      group: 'C. Thư viện & Cài đặt nhiệm vụ',
      screens: [
        { id: 'C1_mission_library', name: 'C1: Thư viện 8 nhiệm vụ thức giấc' },
        { id: 'C2_math_setup', name: 'C2: Cài đặt nhiệm vụ Tính toán' },
        { id: 'C3_memory_setup', name: 'C3: Cài đặt nhiệm vụ Ghi nhớ' },
        { id: 'C4_shake_setup', name: 'C4: Cài đặt nhiệm vụ Lắc điện thoại' },
        { id: 'C5_photo_setup', name: 'C5: Cài đặt nhiệm vụ Chụp ảnh' },
        { id: 'C6_qr_setup', name: 'C6: Cài đặt nhiệm vụ Quét mã QR/Mã vạch' },
        { id: 'C7_typing_setup', name: 'C7: Cài đặt nhiệm vụ Gõ danh ngôn' },
        { id: 'C8_walking_setup', name: 'C8: Cài đặt nhiệm vụ Bước đi rời giường' },
        { id: 'C9_squats_setup', name: 'C9: Cài đặt nhiệm vụ Squats' },
        { id: 'C10_mission_sequence', name: 'C10: Ghép chuỗi nhiều nhiệm vụ' }
      ]
    },
    {
      group: 'C (Thực thi). 8 Màn hình giải nhiệm vụ',
      screens: [
        { id: 'exec_math', name: '⚡️ Thực thi: Giải Toán học' },
        { id: 'exec_memory', name: '⚡️ Thực thi: Trò chơi Ghi nhớ' },
        { id: 'exec_shake', name: '⚡️ Thực thi: Lắc máy đánh thức' },
        { id: 'exec_photo', name: '⚡️ Thực thi: Chụp ảnh đối chiếu' },
        { id: 'exec_qr', name: '⚡️ Thực thi: Quét mã QR/Barcode' },
        { id: 'exec_typing', name: '⚡️ Thực thi: Gõ văn bản tích cực' },
        { id: 'exec_walking', name: '⚡️ Thực thi: Bước đi 30 bước' },
        { id: 'exec_squats', name: '⚡️ Thực thi: Squats 10 lần' }
      ]
    },
    {
      group: 'D. Chuông reo & Quy trình thức giấc',
      screens: [
        { id: 'D1_ringing', name: 'D1: Màn hình chuông đang reo' },
        { id: 'D2_snoozing', name: 'D2: Màn hình đếm ngược hoãn chuông' },
        { id: 'D3_mission_completed', name: 'D3: Chúc mừng hoàn thành nhiệm vụ' },
        { id: 'D4_wakeup_check', name: 'D4: Kiểm tra thức giấc sau 5 phút' },
        { id: 'D5_emergency_exit', name: 'D5: Thoát khẩn cấp an toàn' },
        { id: 'D6_morning_summary', name: 'D6: Tóm tắt buổi sáng & Nhật ký' }
      ]
    },
    {
      group: 'E. Giấc ngủ & Tiếng ngáy',
      screens: [
        { id: 'E1_sleep_overview', name: 'E1: Tổng quan giấc ngủ' },
        { id: 'E2_sleep_schedule', name: 'E2: Lịch trình & Giờ đi ngủ' },
        { id: 'E3_sleep_prep', name: 'E3: Chuẩn bị & Hướng dẫn đặt máy' },
        { id: 'E4_active_session', name: 'E4: Đang theo dõi (Màn hình tối OLED)' },
        { id: 'E5_night_report', name: 'E5: Báo cáo phân tích chu kỳ đêm' },
        { id: 'E6_history', name: 'E6: Lịch sử & Lịch nhật ký ngủ' },
        { id: 'E7_trends', name: 'E7: Xu hướng & Thống kê 30 ngày' },
        { id: 'E8_snore_recordings', name: 'E8: Bản ghi âm tiếng ngáy (Miễn phí)' }
      ]
    },
    {
      group: 'F. Thư giãn & Ngủ ngon',
      screens: [
        { id: 'F1_relax_library', name: 'F1: Kho âm thanh ru ngủ' },
        { id: 'F2_player', name: 'F2: Trình phát âm thanh thư giãn' },
        { id: 'F3_timer', name: 'F3: Hẹn giờ tắt & Nhỏ dần' },
        { id: 'F4_favorites', name: 'F4: Danh sách âm thanh yêu thích' }
      ]
    },
    {
      group: 'G. Cá nhân & Cài đặt',
      screens: [
        { id: 'G1_profile', name: 'G1: Hồ sơ cục bộ & Huy hiệu đạt được' },
        { id: 'G2_appearance', name: 'G2: Giao diện, Chế độ sáng/tối & Cỡ chữ' },
        { id: 'G3_alarm_readiness', name: 'G3: Chẩn đoán độ sẵn sàng báo thức' },
        { id: 'G4_privacy', name: 'G4: Quyền riêng tư & Quản lý dữ liệu' },
        { id: 'G5_help', name: 'G5: Trợ giúp & Mẹo thức dậy' },
        { id: 'G6_about', name: 'G6: Về ZakiAlarm & Cam kết miễn phí' }
      ]
    }
  ];

  return `
    <header class="prototype-toolbar" role="region" aria-label="Thanh điều khiển nguyên mẫu">
      <div class="prototype-logo-badge">
        <img src="/logo.svg" alt="ZakiAlarm Logo" />
        <span><strong>ZakiAlarm</strong></span>
        <span class="badge-free">100% Free</span>
      </div>

      <div class="prototype-controls-center">
        <!-- Preset Flows -->
        <select id="prototype-flow-select" class="prototype-select" title="Chọn kịch bản nguyên mẫu hoàn chỉnh">
          <option value="">🎯 Chọn luồng trải nghiệm mẫu (1 - 8)...</option>
          ${flows.map(f => `<option value="${f.id}" ${state.activeFlow?.id === f.id ? 'selected' : ''}>${f.title}</option>`).join('')}
        </select>

        <!-- Direct Screen Jumper -->
        <select id="prototype-screen-select" class="prototype-select" title="Chuyển ngay tới màn hình cụ thể">
          ${screenGroups.map(grp => `
            <optgroup label="${grp.group}">
              ${grp.screens.map(s => `
                <option value="${s.id}" ${state.currentScreen === s.id ? 'selected' : ''}>${s.name}</option>
              `).join('')}
            </optgroup>
          `).join('')}
        </select>
      </div>

      <div class="prototype-toolbar-actions">
        <!-- Theme Switcher -->
        <button id="toggle-theme-btn" class="prototype-pill-btn" title="Chuyển chế độ Sáng / Tối">
          ${state.theme === 'dark' ? '☀️ Sáng' : '🌙 Tối'}
        </button>

        <!-- View Mode: Frame vs Fullscreen -->
        <button id="toggle-viewmode-btn" class="prototype-pill-btn" title="Chuyển khung điện thoại / toàn màn hình">
          ${state.viewMode === 'frame' ? '📱 Khung' : '💻 Toàn màn hình'}
        </button>

        <!-- Stop Audio Button -->
        <button id="stop-all-audio-btn" class="prototype-pill-btn" title="Dừng toàn bộ âm thanh">
          🔇 Tắt tiếng
        </button>
      </div>
    </header>
  `;
}
