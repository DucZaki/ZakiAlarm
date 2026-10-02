// Screen Module: A. Onboarding (A1 - A5)

export function renderOnboarding(state) {
  const current = state.currentScreen;

  if (current === 'A1_splash') {
    return `
      <div class="onboarding-screen">
        <div style="flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center;">
          <img src="/logo.svg" alt="ZakiAlarm" class="onboarding-logo-center" />
          <h1 style="font-size: 32px; font-weight: 800; letter-spacing: -0.02em;">ZakiAlarm</h1>
          <p style="font-size: 15px; color: var(--accent-mint); font-weight: 600; margin-top: 6px;">
            Thức giấc tự do • Ngủ trọn an nhiên
          </p>
          <div style="margin-top: 24px; display: inline-flex; align-items: center; gap: 6px; padding: 6px 14px; background: var(--bg-surface); border-radius: var(--radius-full); border: 1px solid var(--border-subtle);">
            <span style="width: 8px; height: 8px; border-radius: 50%; background: var(--accent-mint);"></span>
            <span style="font-size: 12px; font-weight: 700; color: var(--text-secondary);">100% MIỄN PHÍ • KHÔNG QUẢNG CÁO</span>
          </div>
        </div>

        <div style="padding: 0 var(--margin-side) 20px;">
          <button class="btn-primary w-full" id="btn-splash-start">
            Khám phá ngay
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="m9 18 6-6-6-6"/></svg>
          </button>
        </div>
      </div>
    `;
  }

  if (current === 'A2_welcome') {
    return `
      <div class="onboarding-screen">
        <div class="screen-content" style="padding-top: 20px;">
          <div style="width: 72px; height: 72px; margin: 12px auto; border-radius: 20px; background: var(--bg-surface); display: flex; align-items: center; justify-content: center; border: 1px solid var(--border-medium); box-shadow: var(--shadow-sm);">
            <img src="/logo.svg" style="width: 52px; height: 52px;" alt="Logo" />
          </div>

          <h1 style="margin-top: 12px;">Chào mừng bạn đến với ZakiAlarm</h1>
          <p style="margin-top: 6px; font-size: 14px;">Ứng dụng đồng hành cùng giấc ngủ chất lượng và buổi sáng tràn đầy năng lượng của bạn.</p>

          <div style="margin-top: 24px; display: flex; flex-direction: column; gap: 12px; text-align: left;">
            <div class="card" style="margin-bottom: 0;">
              <div style="display: flex; gap: 14px; align-items: center;">
                <div style="width: 40px; height: 40px; border-radius: 12px; background: var(--accent-mint-dim); color: var(--accent-mint); display: flex; align-items: center; justify-content: center; font-size: 20px;">✨</div>
                <div>
                  <h3 style="font-size: 15px;">Mọi tính năng đều mở khóa</h3>
                  <p class="text-small">Nhiệm vụ, âm thanh và nhật ký giấc ngủ đều miễn phí, không quảng cáo, không cần tài khoản.</p>
                </div>
              </div>
            </div>

            <div class="card" style="margin-bottom: 0;">
              <div style="display: flex; gap: 14px; align-items: center;">
                <div style="width: 40px; height: 40px; border-radius: 12px; background: var(--accent-lavender-dim); color: var(--accent-lavender); display: flex; align-items: center; justify-content: center; font-size: 20px;">🛡️</div>
                <div>
                  <h3 style="font-size: 15px;">Không quảng cáo • Không tài khoản</h3>
                  <p class="text-small">Không phiền hà bởi video quảng cáo hay bắt buộc đăng ký. Dữ liệu lưu 100% trên máy bạn.</p>
                </div>
              </div>
            </div>

            <div class="card" style="margin-bottom: 0;">
              <div style="display: flex; gap: 14px; align-items: center;">
                <div style="width: 40px; height: 40px; border-radius: 12px; background: var(--accent-peach-dim); color: var(--accent-peach); display: flex; align-items: center; justify-content: center; font-size: 20px;">⏰</div>
                <div>
                  <h3 style="font-size: 15px;">Báo thức siêu tin cậy</h3>
                  <p class="text-small">Nhiệm vụ thức giác buộc não bộ và cơ thể hoạt động, ngăn chặn tình trạng ngủ quên.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div style="padding: 16px var(--margin-side) 20px; display: flex; flex-direction: column; gap: 10px;">
          <button class="btn-primary w-full" id="btn-welcome-next">
            Bắt đầu thiết lập
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="m9 18 6-6-6-6"/></svg>
          </button>
          <button class="btn-ghost" id="btn-welcome-skip">Bỏ qua giới thiệu</button>
        </div>
      </div>
    `;
  }

  if (current === 'A3_slides') {
    const slideIdx = state.onboardingSlide || 0;
    const slides = [
      {
        emoji: '🧠',
        color: 'mint',
        title: 'Nhiệm vụ thức giấc độc đáo',
        desc: 'Giải toán, lắc máy, chụp ảnh bồn rửa mặt hay quét mã QR trong nhà tắm. Bạn chỉ có thể tắt chuông khi đã thực sự tỉnh táo!'
      },
      {
        emoji: '🌙',
        color: 'lavender',
        title: 'Thấu hiểu giấc ngủ sâu',
        desc: 'Ghi lại thời gian nghỉ, xem lịch sử và xu hướng từ các phiên bạn đã lưu. Không tự đo giai đoạn ngủ hoặc chẩn đoán sức khỏe.'
      },
      {
        emoji: '🌧️',
        color: 'peach',
        title: 'Thư giãn & Dễ dàng vào giấc',
        desc: 'Kho âm thanh tự nhiên như tiếng mưa rơi, sóng biển và tiếng ồn trắng êm dịu giúp bạn thư thái chìm vào giấc ngủ ngon.'
      }
    ];

    const slide = slides[slideIdx];

    return `
      <div class="onboarding-screen">
        <div style="display: flex; justify-content: flex-end; padding: 0 var(--margin-side);">
          <button class="btn-ghost" id="btn-slides-skip" style="font-size: 13px;">Bỏ qua</button>
        </div>

        <div class="screen-content" style="justify-content: center; align-items: center;">
          <div class="slide-illustration">
            <span style="font-size: 72px;">${slide.emoji}</span>
          </div>

          <div class="carousel-indicators">
            <div class="carousel-dot ${slideIdx === 0 ? 'active' : ''}"></div>
            <div class="carousel-dot ${slideIdx === 1 ? 'active' : ''}"></div>
            <div class="carousel-dot ${slideIdx === 2 ? 'active' : ''}"></div>
          </div>

          <h2 style="margin-top: 14px; font-size: 22px;">${slide.title}</h2>
          <p style="margin-top: 8px; max-width: 300px; font-size: 14px;">${slide.desc}</p>
        </div>

        <div style="padding: 16px var(--margin-side) 20px;">
          <button class="btn-primary w-full" id="btn-slides-next">
            ${slideIdx === 2 ? 'Tiếp tục thiết lập' : 'Tiếp tục'}
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="m9 18 6-6-6-6"/></svg>
          </button>
        </div>
      </div>
    `;
  }

  if (current === 'A4_setup') {
    return `
      <div class="onboarding-screen">
        <div class="screen-content" style="text-align: left; padding-top: 12px;">
          <h2>Thiết lập thói quen của bạn</h2>
          <p style="margin-top: 4px;">ZakiAlarm sẽ tối ưu giờ ngủ và chuông báo phù hợp với nhịp sinh học của bạn.</p>

          <div style="margin-top: 20px;">
            <label style="font-size: 13px; font-weight: 700; color: var(--text-secondary); text-transform: uppercase; letter-spacing: 0.05em;">
              Giờ thức dậy mong muốn
            </label>
            <div class="time-picker-display" style="margin: 8px 0 16px;">
              <span class="time-picker-digit tabular-nums">06</span>
              <span class="time-picker-colon">:</span>
              <span class="time-picker-digit tabular-nums">30</span>
              <div class="time-picker-period-col">
                <span class="period-pill active">SA</span>
                <span class="period-pill">CH</span>
              </div>
            </div>

            <label style="font-size: 13px; font-weight: 700; color: var(--text-secondary); text-transform: uppercase; letter-spacing: 0.05em;">
              Giờ đi ngủ khuyến nghị
            </label>
            <div class="card" style="display: flex; align-items: center; justify-content: space-between; margin-top: 6px;">
              <div style="display: flex; align-items: center; gap: 10px;">
                <span style="font-size: 20px;">🛌</span>
                <div>
                  <h3 style="font-size: 15px;">23:00 mỗi đêm</h3>
                  <p class="text-small">Đảm bảo ngủ đủ 7 giờ 30 phút</p>
                </div>
              </div>
              <span class="badge badge-mint">Khuyên dùng</span>
            </div>

            <label style="font-size: 13px; font-weight: 700; color: var(--text-secondary); text-transform: uppercase; letter-spacing: 0.05em; margin-top: 12px; display: block;">
              Mức độ khó thức dậy
            </label>
            <div class="segmented-control" style="margin-top: 6px;">
              <div class="segment-item">Dễ</div>
              <div class="segment-item active">Bình thường</div>
              <div class="segment-item">Khó dậy</div>
              <div class="segment-item">Cực khó</div>
            </div>
            <p class="text-xs" style="margin-top: 4px;">Mức "Khó dậy" sẽ gợi ý các nhiệm vụ vận động hoặc rời giường.</p>
          </div>
        </div>

        <div style="padding: 16px var(--margin-side) 20px;">
          <button class="btn-primary w-full" id="btn-setup-next">
            Tiếp tục đến Cấp quyền
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="m9 18 6-6-6-6"/></svg>
          </button>
        </div>
      </div>
    `;
  }

  if (current === 'A5_permissions') {
    const perms = state.permissions;
    return `
      <div class="onboarding-screen">
        <div class="screen-content" style="text-align: left; padding-top: 12px;">
          <h2>Kiểm tra quyền ứng dụng</h2>
          <p style="margin-top: 4px;">Để đảm bảo chuông báo reo đúng giờ và các nhiệm vụ hoạt động chuẩn xác.</p>

          <div style="margin-top: 20px;">
            <!-- Permission 1: Notifications -->
            <div class="permission-item">
              <div style="display: flex; align-items: center;">
                <div class="permission-icon">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>
                </div>
                <div>
                  <h3 style="font-size: 14px;">Thông báo & Báo thức</h3>
                  <p class="text-small">Cần thiết để reo chuông khi màn hình khóa</p>
                </div>
              </div>
              <label class="toggle-switch">
                <input type="checkbox" id="perm-toggle-notifications" ${perms.notifications === 'granted' ? 'checked' : ''} />
                <span class="toggle-slider"></span>
              </label>
            </div>

            <!-- Permission 2: Camera -->
            <div class="permission-item">
              <div style="display: flex; align-items: center;">
                <div class="permission-icon" style="color: var(--accent-lavender);">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/></svg>
                </div>
                <div>
                  <h3 style="font-size: 14px;">Camera</h3>
                  <p class="text-small">Dành riêng cho nhiệm vụ Chụp ảnh & Quét mã</p>
                </div>
              </div>
              <label class="toggle-switch">
                <input type="checkbox" id="perm-toggle-camera" ${perms.camera === 'granted' ? 'checked' : ''} />
                <span class="toggle-slider"></span>
              </label>
            </div>

            <!-- Permission 3: Microphone -->
            <div class="permission-item">
              <div style="display: flex; align-items: center;">
                <div class="permission-icon" style="color: var(--accent-peach);">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" x2="12" y1="19" y2="22"/></svg>
                </div>
                <div>
                  <h3 style="font-size: 14px;">Microphone</h3>
                  <p class="text-small">Ghi mẫu âm thanh trên máy khi bạn chủ động bật microphone</p>
                </div>
              </div>
              <label class="toggle-switch">
                <input type="checkbox" id="perm-toggle-mic" ${perms.microphone === 'granted' ? 'checked' : ''} />
                <span class="toggle-slider"></span>
              </label>
            </div>

            <!-- Permission 4: Motion Sensor -->
            <div class="permission-item">
              <div style="display: flex; align-items: center;">
                <div class="permission-icon" style="color: var(--accent-mint);">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m4 16 4-4 4 4 4-4 4 4"/></svg>
                </div>
                <div>
                  <h3 style="font-size: 14px;">Cảm biến chuyển động</h3>
                  <p class="text-small">Đo bước đi, đếm số lần lắc và squats</p>
                </div>
              </div>
              <label class="toggle-switch">
                <input type="checkbox" id="perm-toggle-motion" ${perms.motion === 'granted' ? 'checked' : ''} />
                <span class="toggle-slider"></span>
              </label>
            </div>

            <div class="card" style="background: var(--bg-elevated); margin-top: 14px;">
              <p class="text-xs" style="color: var(--text-secondary); line-height: 1.5;">
                🔒 <strong>Cam kết minh bạch:</strong> Bạn có thể từ chối các quyền tùy chọn (Camera, Micro, Chuyển động) mà vẫn sử dụng ứng dụng bình thường với các nhiệm vụ trí tuệ như Giải toán hoặc Ghi nhớ.
              </p>
            </div>
          </div>
        </div>

        <div style="padding: 16px var(--margin-side) 20px;">
          <button class="btn-primary w-full" id="btn-permissions-finish">
            Hoàn tất & Vào trang chủ
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="m9 18 6-6-6-6"/></svg>
          </button>
        </div>
      </div>
    `;
  }

  return '';
}
