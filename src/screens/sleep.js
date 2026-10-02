// Screen Module: E. Sleep Tracking & Insights (E1 - E8)

export function renderSleep(state) {
  const current = state.currentScreen;
  const rep = state.latestSleepReport;

  // E1: Sleep Overview Screen
  if (current === 'E1_sleep_overview') {
    return `
      <div class="screen-viewport">
        <div class="screen-header" style="padding: 16px var(--margin-side) 8px;">
          <div class="screen-title-area">
            <span class="text-xs" style="color: var(--accent-lavender); font-weight: 700; text-transform: uppercase;">Sức khỏe</span>
            <h1>Giấc ngủ</h1>
          </div>
          <div style="display: flex; gap: 8px;">
            <button class="btn-icon" id="btn-open-snore-clips" title="Bản ghi tiếng ngáy">
              <span style="font-size: 16px;">🎙️</span>
            </button>
            <button class="btn-icon" id="btn-open-sleep-trends" title="Xu hướng giấc ngủ">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>
            </button>
          </div>
        </div>

        <div class="screen-content">
          <!-- Big Start Sleep Tracking CTA Card -->
          <div class="card card-clickable" id="btn-prep-sleep-tracking" style="background: linear-gradient(135deg, #1C1938 0%, #151F32 100%); border-color: rgba(181, 163, 255, 0.3); padding: 20px; margin-bottom: 16px;">
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <div>
                <span class="badge badge-lavender" style="font-size: 10px; margin-bottom: 6px;">LỊCH TRÌNH TỐI NAY</span>
                <h2 style="font-size: 20px; color: #FFFFFF;">Theo dõi giấc ngủ</h2>
                <p class="text-small" style="color: var(--text-secondary); margin-top: 2px;">Ngủ lúc 23:00 • Báo thức lúc 06:30</p>
              </div>
              <div style="width: 52px; height: 52px; border-radius: 50%; background: var(--accent-lavender); color: #0B1220; display: flex; align-items: center; justify-content: center; font-size: 24px; box-shadow: 0 0 20px rgba(181, 163, 255, 0.4);">
                🌙
              </div>
            </div>
            <div style="margin-top: 14px; display: flex; align-items: center; justify-content: space-between; border-top: 1px solid var(--border-subtle); padding-top: 12px;">
              <span class="text-xs" style="color: var(--accent-mint); font-weight: 600;">Bắt đầu theo dõi ngay bây giờ →</span>
              <span class="text-xs" style="color: var(--text-secondary);">Mục tiêu: 7h 30m</span>
            </div>
          </div>

          <!-- Latest Night Report Summary Card -->
          <div class="card card-clickable" id="btn-view-night-report" style="margin-bottom: 16px;">
            <div class="card-header">
              <span class="text-xs" style="font-weight: 700; color: var(--text-tertiary); text-transform: uppercase;">Đêm qua (1 tháng 10)</span>
              <span class="badge badge-mint">Xem báo cáo chi tiết →</span>
            </div>
            <div style="display: flex; align-items: center; gap: 16px; margin: 6px 0;">
              <div style="text-align: center; padding: 10px 14px; background: var(--bg-elevated); border-radius: var(--radius-md);">
                <div class="tabular-nums" style="font-size: 28px; font-weight: 800; color: var(--accent-lavender);">${rep.score}</div>
                <span class="text-xs" style="color: var(--text-secondary);">Điểm số</span>
              </div>
              <div>
                <h3 style="font-size: 16px;">${rep.ratingText}</h3>
                <p class="text-small" style="margin-top: 2px;">Ngủ ${rep.durationHours}h ${rep.durationMinutes}m • Hiệu quả ${rep.efficiencyPercent}% • ${rep.snoreEventsCount} lần ngáy</p>
              </div>
            </div>
          </div>

          <!-- 7-day Mini Trend Chart -->
          <div class="card" style="margin-bottom: 16px;">
            <div class="card-header">
              <span class="text-xs" style="font-weight: 700; color: var(--text-tertiary); text-transform: uppercase;">7 ngày vừa qua</span>
              <span class="text-small" style="color: var(--accent-mint); font-weight: 600;">TB: 7h 45m</span>
            </div>
            <div style="display: flex; align-items: flex-end; justify-content: space-between; height: 90px; padding: 10px 4px 0;">
              <div style="text-align: center; flex: 1;">
                <div style="height: 65px; width: 14px; background: var(--accent-lavender); border-radius: 4px; margin: 0 auto;"></div>
                <span class="text-xs" style="margin-top: 6px; display: block;">T6</span>
              </div>
              <div style="text-align: center; flex: 1;">
                <div style="height: 55px; width: 14px; background: var(--accent-lavender); border-radius: 4px; margin: 0 auto;"></div>
                <span class="text-xs" style="margin-top: 6px; display: block;">T7</span>
              </div>
              <div style="text-align: center; flex: 1;">
                <div style="height: 75px; width: 14px; background: var(--accent-lavender); border-radius: 4px; margin: 0 auto;"></div>
                <span class="text-xs" style="margin-top: 6px; display: block;">CN</span>
              </div>
              <div style="text-align: center; flex: 1;">
                <div style="height: 60px; width: 14px; background: var(--accent-lavender); border-radius: 4px; margin: 0 auto;"></div>
                <span class="text-xs" style="margin-top: 6px; display: block;">T2</span>
              </div>
              <div style="text-align: center; flex: 1;">
                <div style="height: 70px; width: 14px; background: var(--accent-lavender); border-radius: 4px; margin: 0 auto;"></div>
                <span class="text-xs" style="margin-top: 6px; display: block;">T3</span>
              </div>
              <div style="text-align: center; flex: 1;">
                <div style="height: 68px; width: 14px; background: var(--accent-lavender); border-radius: 4px; margin: 0 auto;"></div>
                <span class="text-xs" style="margin-top: 6px; display: block;">T4</span>
              </div>
              <div style="text-align: center; flex: 1;">
                <div style="height: 72px; width: 14px; background: var(--accent-mint); border-radius: 4px; margin: 0 auto;"></div>
                <span class="text-xs" style="margin-top: 6px; display: block; font-weight: 700; color: var(--accent-mint);">T5</span>
              </div>
            </div>
          </div>

          <!-- Free Snore Vault Card Banner -->
          <div class="card card-clickable" id="btn-open-snore-vault-card" style="display: flex; align-items: center; justify-content: space-between; border-color: rgba(94, 234, 212, 0.3);">
            <div style="display: flex; align-items: center; gap: 12px;">
              <span style="font-size: 26px;">🎙️</span>
              <div>
                <h3 style="font-size: 15px;">Bản ghi âm tiếng ngáy & âm thanh đêm</h3>
                <p class="text-small">Mở khóa 100% miễn phí • 3 đoạn ghi đêm qua</p>
              </div>
            </div>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m9 18 6-6-6-6"/></svg>
          </div>
        </div>
      </div>
    `;
  }

  // E2: Sleep Schedule Settings Screen
  if (current === 'E2_sleep_schedule') {
    return `
      <div class="screen-viewport">
        <div class="screen-header" style="padding: 16px var(--margin-side) 8px;">
          <button class="btn-ghost" id="btn-back-to-sleep" style="padding: 0;">Quay lại</button>
          <h2 style="font-size: 17px;">Lịch trình giấc ngủ</h2>
          <button class="btn-ghost text-mint" id="btn-save-sleep-schedule" style="padding: 0; font-weight: 700;">Lưu</button>
        </div>

        <div class="screen-content">
          <div class="card" style="margin-top: 12px;">
            <label class="text-xs" style="font-weight: 700; color: var(--text-tertiary); text-transform: uppercase;">Giờ đi ngủ mục tiêu</label>
            <div style="font-size: 32px; font-weight: 800; color: var(--accent-lavender); margin: 6px 0;" class="tabular-nums">23:00</div>
            <p class="text-small">Lời nhắc sẽ gửi trước 30 phút (lúc 22:30)</p>
          </div>

          <div class="card" style="margin-top: 8px;">
            <label class="text-xs" style="font-weight: 700; color: var(--text-tertiary); text-transform: uppercase;">Giờ thức dậy</label>
            <div style="font-size: 32px; font-weight: 800; color: var(--accent-mint); margin: 6px 0;" class="tabular-nums">06:30</div>
            <p class="text-small">Thời lượng ngủ dự kiến: 7 giờ 30 phút</p>
          </div>

          <div class="card" style="display: flex; align-items: center; justify-content: space-between; margin-top: 8px;">
            <div>
              <h3 style="font-size: 15px;">Thông báo nhắc nhở đi ngủ</h3>
              <p class="text-small">Nhắc uống nước, rời màn hình và thư giãn</p>
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

  // E3: Sleep Preparation Guide Screen
  if (current === 'E3_sleep_prep') {
    return `
      <div class="screen-viewport">
        <div class="screen-header" style="padding: 16px var(--margin-side) 8px;">
          <button class="btn-ghost" id="btn-back-to-sleep" style="padding: 0;">Hủy</button>
          <h2 style="font-size: 17px;">Chuẩn bị theo dõi</h2>
          <div style="width: 30px;"></div>
        </div>

        <div class="screen-content">
          <div class="slide-illustration" style="width: 140px; height: 140px; margin: 16px auto;">
            <span style="font-size: 56px;">🛌</span>
          </div>

          <h2 style="text-align: center;">Vị trí đặt điện thoại</h2>
          <p class="text-small" style="text-align: center; margin-top: 4px;">Để phân tích chính xác nhất chu kỳ ngủ và tiếng ngáy của bạn.</p>

          <div style="margin-top: 20px; display: flex; flex-direction: column; gap: 10px;">
            <div class="card" style="display: flex; align-items: center; gap: 12px; margin-bottom: 0;">
              <span style="font-size: 22px;">📱</span>
              <div>
                <h3 style="font-size: 14px;">Úp màn hình xuống</h3>
                <p class="text-small">Màn hình sẽ tự động chuyển sang chế độ tiết kiệm pin OLED.</p>
              </div>
            </div>

            <div class="card" style="display: flex; align-items: center; gap: 12px; margin-bottom: 0;">
              <span style="font-size: 22px;">🛏️</span>
              <div>
                <h3 style="font-size: 14px;">Đặt trên đệm cạnh gối</h3>
                <p class="text-small">Khoảng cách lý tưởng từ 30cm đến 50cm so với đầu bạn.</p>
              </div>
            </div>

            <div class="card" style="display: flex; align-items: center; gap: 12px; margin-bottom: 0;">
              <span style="font-size: 22px;">🔋</span>
              <div>
                <h3 style="font-size: 14px;">Khuyến khích cắm sạc</h3>
                <p class="text-small">Đảm bảo thiết bị đủ năng lượng đến sáng.</p>
              </div>
            </div>
          </div>

          <div class="card" style="display: flex; align-items: center; justify-content: space-between; margin-top: 14px;">
            <div>
              <h3 style="font-size: 14px;">Ghi nhận tiếng ngáy đêm</h3>
              <p class="text-small">Xử lý 100% trên máy • Không tải lên máy chủ</p>
            </div>
            <label class="toggle-switch">
              <input type="checkbox" checked />
              <span class="toggle-slider"></span>
            </label>
          </div>

          <div style="margin-top: 24px; margin-bottom: 16px;">
            <button class="btn-primary w-full" id="btn-start-active-sleep" style="background: var(--accent-lavender); color: #0B1220; min-height: 52px; font-size: 15px;">
              Bắt đầu theo dõi ngay bây giờ
            </button>
          </div>
        </div>
      </div>
    `;
  }

  // E4: Active Sleep Session Screen (Ultra-dim OLED Black)
  if (current === 'E4_active_session') {
    return `
      <div class="active-sleep-screen">
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <span class="badge badge-lavender" style="font-size: 11px;">ĐANG THEO DÕI GIẤC NGỦ</span>
          <button class="btn-icon" id="btn-ambient-in-sleep" style="width: 36px; height: 36px;" title="Bật âm thanh ru ngủ">
            <span style="font-size: 16px;">🌧️</span>
          </button>
        </div>

        <div>
          <div style="font-size: 72px; font-weight: 800; color: #FFFFFF; letter-spacing: -0.04em;" class="tabular-nums" id="sleep-clock-digits">
            23:18
          </div>
          <p class="text-small" style="color: var(--text-secondary); margin-top: 4px;">
            Báo thức tiếp theo: <strong>06:30 SA</strong>
          </p>
          <div style="margin-top: 16px; display: inline-flex; align-items: center; gap: 8px; padding: 6px 14px; background: rgba(255,255,255,0.06); border-radius: 99px;">
            <span style="width: 8px; height: 8px; border-radius: 50%; background: var(--accent-lavender); animation: pulseGlow 2s infinite;"></span>
            <span class="text-xs" style="color: var(--accent-lavender);">Micro đang lắng nghe tiếng thở</span>
          </div>
        </div>

        <!-- Deliberate Hold-to-Stop Component -->
        <div class="hold-to-stop-container">
          <div class="hold-to-stop-btn" id="btn-hold-to-stop-sleep">
            <div class="hold-progress-fill" id="hold-stop-progress"></div>
            <span style="position: relative; z-index: 2;">Nhấn & Giữ 3 giây để thức dậy</span>
          </div>
          <p class="text-xs" style="color: var(--text-tertiary); margin-top: 8px;">
            Giữ nút để tránh vô tình dừng theo dõi khi bạn đang trở mình trong đêm.
          </p>
        </div>
      </div>
    `;
  }

  // E5: Detailed Night Sleep Report
  if (current === 'E5_night_report') {
    return `
      <div class="screen-viewport">
        <div class="screen-header" style="padding: 16px var(--margin-side) 8px;">
          <button class="btn-ghost" id="btn-back-to-sleep" style="padding: 0;">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="m15 18-6-6 6-6"/></svg>
            Quay lại
          </button>
          <h2 style="font-size: 17px;">Báo cáo đêm qua</h2>
          <button class="btn-ghost" id="btn-share-report" style="padding: 0;">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" y1="2" x2="12" y2="15"/></svg>
          </button>
        </div>

        <div class="screen-content">
          <!-- Score Ring -->
          <div class="card" style="text-align: center; padding: 20px;">
            <span class="text-xs" style="font-weight: 700; color: var(--text-tertiary); text-transform: uppercase;">Điểm số phục hồi</span>
            <div class="sleep-score-ring">
              <span class="sleep-score-val tabular-nums">${rep.score}</span>
            </div>
            <h3 style="font-size: 18px; color: var(--accent-lavender);">${rep.ratingText}</h3>
            <p class="text-small" style="margin-top: 4px;">Chất lượng giấc ngủ cao hơn 85% người dùng thông thường.</p>
          </div>

          <!-- Hypnogram / Sleep Stages -->
          <div class="hypnogram-chart">
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <span class="text-xs" style="font-weight: 700; color: var(--text-tertiary); text-transform: uppercase;">Chu kỳ các giai đoạn ngủ</span>
              <span class="badge badge-lavender">Hypnogram</span>
            </div>

            <div class="hypno-bar-col">
              <div class="hypno-bar deep" style="height: 80%;" title="Ngủ sâu"></div>
              <div class="hypno-bar deep" style="height: 75%;"></div>
              <div class="hypno-bar light" style="height: 50%;"></div>
              <div class="hypno-bar rem" style="height: 60%;"></div>
              <div class="hypno-bar light" style="height: 45%;"></div>
              <div class="hypno-bar deep" style="height: 85%;"></div>
              <div class="hypno-bar deep" style="height: 70%;"></div>
              <div class="hypno-bar rem" style="height: 65%;"></div>
              <div class="hypno-bar light" style="height: 40%;"></div>
              <div class="hypno-bar awake" style="height: 20%;"></div>
              <div class="hypno-bar rem" style="height: 70%;"></div>
              <div class="hypno-bar light" style="height: 35%;"></div>
            </div>

            <div style="display: flex; justify-content: space-between; margin-top: 8px; font-size: 11px; color: var(--text-secondary);">
              <span>23:14 (Vào giấc)</span>
              <span>03:00 (Nửa đêm)</span>
              <span>06:56 (Thức dậy)</span>
            </div>

            <div style="display: flex; gap: 12px; margin-top: 12px; justify-content: center;">
              <span class="text-xs" style="color: #6366F1;">■ Ngủ sâu (1h 52m)</span>
              <span class="text-xs" style="color: #A855F7;">■ Ngủ nông (4h 08m)</span>
              <span class="text-xs" style="color: #EC4899;">■ REM (1h 32m)</span>
              <span class="text-xs" style="color: #F59E0B;">■ Thức (10m)</span>
            </div>
          </div>

          <!-- Metrics Grid -->
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 16px;">
            <div class="card" style="margin-bottom: 0; padding: 14px;">
              <span class="text-xs" style="color: var(--text-secondary);">Thời gian vào giấc</span>
              <div class="tabular-nums" style="font-size: 18px; font-weight: 700; color: var(--text-primary); margin-top: 2px;">${rep.latencyMinutes} phút</div>
              <span class="text-xs" style="color: var(--accent-mint);">Rất nhanh</span>
            </div>
            <div class="card" style="margin-bottom: 0; padding: 14px;">
              <span class="text-xs" style="color: var(--text-secondary);">Hiệu suất giấc ngủ</span>
              <div class="tabular-nums" style="font-size: 18px; font-weight: 700; color: var(--text-primary); margin-top: 2px;">${rep.efficiencyPercent}%</div>
              <span class="text-xs" style="color: var(--accent-mint);">Lý tưởng</span>
            </div>
            <div class="card" style="margin-bottom: 0; padding: 14px;">
              <span class="text-xs" style="color: var(--text-secondary);">Sự kiện ngáy</span>
              <div class="tabular-nums" style="font-size: 18px; font-weight: 700; color: var(--text-primary); margin-top: 2px;">${rep.snoreEventsCount} lần</div>
              <span class="text-xs" style="color: var(--text-secondary);">${rep.snoreTotalDuration}</span>
            </div>
            <div class="card" style="margin-bottom: 0; padding: 14px;">
              <span class="text-xs" style="color: var(--text-secondary);">Nhịp tim trung bình</span>
              <div class="tabular-nums" style="font-size: 18px; font-weight: 700; color: var(--text-primary); margin-top: 2px;">${rep.heartRateAvg} bpm</div>
              <span class="text-xs" style="color: var(--accent-lavender);">Nghỉ ngơi sâu</span>
            </div>
          </div>

          <!-- Scientific Disclaimer -->
          <div class="card" style="background: var(--bg-elevated); margin-bottom: 20px;">
            <p class="text-xs" style="color: var(--text-tertiary); line-height: 1.5;">
              🔬 <strong>Cơ sở ước tính:</strong> Dữ liệu được tính toán dựa trên phân tích âm thanh thở và cảm biến chuyển động vi mô trên đệm. Kết quả mang tính chất tham khảo sức khỏe và không thay thế chẩn đoán y tế chuyên sâu.
            </p>
          </div>
        </div>
      </div>
    `;
  }

  // E6: History & Interactive Calendar
  if (current === 'E6_history') {
    return `
      <div class="screen-viewport">
        <div class="screen-header" style="padding: 16px var(--margin-side) 8px;">
          <button class="btn-ghost" id="btn-back-to-sleep" style="padding: 0;">Quay lại</button>
          <h2 style="font-size: 17px;">Lịch sử giấc ngủ</h2>
          <div style="width: 40px;"></div>
        </div>

        <div class="screen-content">
          <!-- Calendar Card -->
          <div class="card" style="padding: 16px; margin-top: 10px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
              <h3 style="font-size: 15px;">Tháng 10, 2026</h3>
              <span class="text-small" style="color: var(--accent-mint); font-weight: 600;">28/30 ngày đủ mục tiêu</span>
            </div>

            <div style="display: grid; grid-template-columns: repeat(7, 1fr); gap: 6px; text-align: center;">
              <span class="text-xs" style="font-weight: 700; color: var(--text-tertiary);">T2</span>
              <span class="text-xs" style="font-weight: 700; color: var(--text-tertiary);">T3</span>
              <span class="text-xs" style="font-weight: 700; color: var(--text-tertiary);">T4</span>
              <span class="text-xs" style="font-weight: 700; color: var(--text-tertiary);">T5</span>
              <span class="text-xs" style="font-weight: 700; color: var(--text-tertiary);">T6</span>
              <span class="text-xs" style="font-weight: 700; color: var(--text-tertiary);">T7</span>
              <span class="text-xs" style="font-weight: 700; color: var(--text-tertiary);">CN</span>

              ${[28,29,30,1,2,3,4,5,6,7,8,9,10,11,12,13,14].map((d, i) => `
                <div style="height: 34px; border-radius: 8px; background: ${i === 4 ? 'var(--accent-mint)' : 'var(--bg-elevated)'}; color: ${i === 4 ? '#0B1220' : 'var(--text-primary)'}; display: flex; align-items: center; justify-content: center; font-size: 13px; font-weight: 700; cursor: pointer;">
                  ${d}
                </div>
              `).join('')}
            </div>
          </div>

          <!-- Session List -->
          <span class="text-xs" style="font-weight: 700; color: var(--text-tertiary); text-transform: uppercase; margin-top: 14px; display: block;">Các đêm gần nhất</span>
          <div style="margin-top: 8px; display: flex; flex-direction: column; gap: 8px; margin-bottom: 20px;">
            <div class="card card-clickable" id="btn-view-night-report" style="display: flex; justify-content: space-between; align-items: center; padding: 14px 16px;">
              <div>
                <h3 style="font-size: 15px;">Đêm qua (1/10)</h3>
                <p class="text-small">23:14 - 06:56 • 7h 42m</p>
              </div>
              <div style="text-align: right;">
                <span class="tabular-nums" style="font-size: 18px; font-weight: 800; color: var(--accent-lavender);">88</span>
                <span class="text-xs" style="display: block; color: var(--accent-mint);">Rất tốt</span>
              </div>
            </div>

            <div class="card card-clickable" style="display: flex; justify-content: space-between; align-items: center; padding: 14px 16px;">
              <div>
                <h3 style="font-size: 15px;">Đêm 30/9</h3>
                <p class="text-small">23:30 - 06:45 • 7h 15m</p>
              </div>
              <div style="text-align: right;">
                <span class="tabular-nums" style="font-size: 18px; font-weight: 800; color: var(--accent-lavender);">84</span>
                <span class="text-xs" style="display: block; color: var(--accent-mint);">Tốt</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  // E7: Trends & Consistency Screen
  if (current === 'E7_trends') {
    return `
      <div class="screen-viewport">
        <div class="screen-header" style="padding: 16px var(--margin-side) 8px;">
          <button class="btn-ghost" id="btn-back-to-sleep" style="padding: 0;">Quay lại</button>
          <h2 style="font-size: 17px;">Xu hướng 30 ngày</h2>
          <div style="width: 40px;"></div>
        </div>

        <div class="screen-content">
          <div class="segmented-control" style="margin: 10px 0 16px;">
            <div class="segment-item">7 ngày</div>
            <div class="segment-item active">30 ngày</div>
            <div class="segment-item">3 tháng</div>
          </div>

          <div class="card" style="padding: 16px;">
            <div class="card-header">
              <span class="text-xs" style="font-weight: 700; color: var(--text-tertiary); text-transform: uppercase;">Độ đều đặn của giờ ngủ</span>
              <span class="badge badge-mint">92% Đều đặn</span>
            </div>
            <p class="text-small" style="margin-top: 4px;">Bạn thường đi ngủ trong khoảng 23:00 - 23:20. Đây là nhịp sinh học rất ổn định.</p>
          </div>

          <div class="card" style="padding: 16px; margin-top: 10px;">
            <div class="card-header">
              <span class="text-xs" style="font-weight: 700; color: var(--text-tertiary); text-transform: uppercase;">Mối tương quan với tâm trạng sáng</span>
              <span class="badge badge-lavender">Tích cực</span>
            </div>
            <p class="text-small" style="margin-top: 4px;">Những ngày ngủ trên 7h30m, bạn có 94% khả năng đánh giá tâm trạng là "Tuyệt vời" hoặc "Tràn đầy năng lượng".</p>
          </div>
        </div>
      </div>
    `;
  }

  // E8: Snore Audio Recordings (100% Free & Unlocked)
  if (current === 'E8_snore_recordings') {
    return `
      <div class="screen-viewport">
        <div class="screen-header" style="padding: 16px var(--margin-side) 8px;">
          <button class="btn-ghost" id="btn-back-to-sleep" style="padding: 0;">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="m15 18-6-6 6-6"/></svg>
            Quay lại
          </button>
          <h2 style="font-size: 17px;">Bản ghi âm tiếng ngáy</h2>
          <div style="width: 40px;"></div>
        </div>

        <div class="screen-content">
          <div class="card" style="background: var(--bg-elevated); margin: 10px 0 16px;">
            <div style="display: flex; align-items: center; gap: 8px;">
              <span style="font-size: 20px;">🛡️</span>
              <h3 style="font-size: 14px;">100% Miễn phí & Riêng tư</h3>
            </div>
            <p class="text-xs" style="margin-top: 4px; color: var(--text-secondary); line-height: 1.5;">
              ZakiAlarm không thu phí bản ghi âm. Toàn bộ file âm thanh lưu trữ cục bộ trên máy và tự động xóa sau 7 ngày để tiết kiệm dung lượng.
            </p>
          </div>

          <span class="text-xs" style="font-weight: 700; color: var(--text-tertiary); text-transform: uppercase;">Các đoạn ghi đêm qua (1/10)</span>
          <div style="margin-top: 8px; display: flex; flex-direction: column; gap: 8px; margin-bottom: 20px;">
            ${state.snoreClips.map(clip => `
              <div class="snore-clip-card">
                <div style="display: flex; align-items: center; gap: 12px; flex: 1;">
                  <button class="btn-icon btn-play-snore" data-clip-id="${clip.id}" style="width: 40px; height: 40px; background: var(--accent-mint); color: #0B1220;" title="Phát đoạn ghi">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                  </button>
                  <div style="flex: 1;">
                    <div style="display: flex; align-items: center; justify-content: space-between;">
                      <h3 style="font-size: 14px;">${clip.time}</h3>
                      <span class="text-xs tabular-nums" style="color: var(--text-secondary);">${clip.duration}</span>
                    </div>
                    <!-- Audio Waveform Visualization -->
                    <div class="waveform-bars" style="margin-top: 6px;">
                      <div class="waveform-bar" style="height: 35%;"></div>
                      <div class="waveform-bar" style="height: 65%;"></div>
                      <div class="waveform-bar active" style="height: 100%;"></div>
                      <div class="waveform-bar" style="height: 75%;"></div>
                      <div class="waveform-bar" style="height: 45%;"></div>
                      <div class="waveform-bar" style="height: 90%;"></div>
                      <div class="waveform-bar" style="height: 60%;"></div>
                      <div class="waveform-bar" style="height: 30%;"></div>
                      <div class="waveform-bar" style="height: 80%;"></div>
                      <div class="waveform-bar" style="height: 50%;"></div>
                    </div>
                    <span class="text-xs" style="color: var(--accent-lavender); margin-top: 4px; display: block;">${clip.intensity}</span>
                  </div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;
  }

  return '';
}
