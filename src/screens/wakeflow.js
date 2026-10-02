// Screen Module: D. Wake-up Flow (D1 - D6)

export function renderWakeflow(state) {
  const current = state.currentScreen;
  const ringingAlarm = state.ringingAlarm || state.alarms[0];

  // D1: Ringing Screen
  if (current === 'D1_ringing') {
    return `
      <div class="ringing-screen">
        <div>
          <span class="badge badge-mint" style="font-size: 12px; padding: 4px 12px;">ĐANG ĐỔ CHUÔNG BÁO THỨC</span>
          <div class="ringing-time-large tabular-nums">${ringingAlarm.time}</div>
          <h2 style="color: var(--text-primary); font-size: 20px;">${ringingAlarm.label}</h2>
          <p class="text-small" style="color: var(--text-secondary); margin-top: 4px;">Chuông: ${ringingAlarm.sound}</p>
        </div>

        <div>
          <div class="pulsing-wake-ring">
            <img src="/logo.svg" style="width: 72px; height: 72px;" alt="ZakiAlarm" />
          </div>
          <p class="text-small" style="color: var(--accent-mint); font-weight: 600;">
            ${ringingAlarm.missions.length > 0 ? '⚠️ Cần hoàn thành nhiệm vụ để tắt chuông hoàn toàn' : 'Vuốt hoặc chạm để tắt chuông'}
          </p>
        </div>

        <div style="display: flex; flex-direction: column; gap: 10px;">
          ${ringingAlarm.missions.length > 0 ? `
            <button class="btn-primary w-full" id="btn-start-mission-ringing" style="min-height: 54px; font-size: 16px;">
              🚀 Bắt đầu giải nhiệm vụ (${ringingAlarm.missions.length})
            </button>
          ` : `
            <button class="btn-primary w-full" id="btn-dismiss-ringing-simple" style="min-height: 54px; font-size: 16px;">
              Tắt chuông báo thức
            </button>
          `}

          ${ringingAlarm.snoozeEnabled && ringingAlarm.snoozeRemaining > 0 ? `
            <button class="btn-secondary w-full" id="btn-snooze-alarm">
              Hoãn ${ringingAlarm.snoozeDuration} phút (Còn ${ringingAlarm.snoozeRemaining} lần)
            </button>
          ` : ''}

          <button class="btn-ghost" id="btn-trigger-emergency" style="font-size: 12px; color: var(--text-tertiary);">
            Khẩn cấp? Thoát an toàn
          </button>
        </div>
      </div>
    `;
  }

  // D2: Snoozing Screen
  if (current === 'D2_snoozing') {
    const mins = Math.floor(state.snoozeCountdown / 60);
    const secs = state.snoozeCountdown % 60;
    const timeFormatted = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;

    return `
      <div class="screen-viewport" style="background: radial-gradient(circle at 50% 30%, #151F32 0%, #0B1220 100%);">
        <div class="screen-content" style="justify-content: space-between; text-align: center; padding: 40px var(--margin-side) 32px;">
          <div>
            <span class="badge badge-lavender" style="font-size: 12px; padding: 4px 12px;">ĐANG HOÃN BÁO THỨC</span>
            <h2 style="margin-top: 14px; font-size: 24px;">Ngủ thêm một chút...</h2>
            <p class="text-small" style="margin-top: 4px;">Chuông sẽ tự động đổ lại khi hết thời gian đếm ngược.</p>
          </div>

          <div>
            <div style="font-size: 64px; font-weight: 900; color: var(--accent-lavender); letter-spacing: -0.04em;" class="tabular-nums" id="snooze-timer-digits">
              ${timeFormatted}
            </div>
            <p class="text-xs" style="color: var(--text-secondary); margin-top: 6px;">Thời gian hoãn còn lại</p>
          </div>

          <div style="display: flex; flex-direction: column; gap: 10px;">
            <button class="btn-primary w-full" id="btn-wake-up-now" style="background: var(--accent-lavender); color: #0B1220; min-height: 52px; font-size: 15px;">
              ☀️ Tôi đã tỉnh táo, dậy ngay bây giờ!
            </button>
            <button class="btn-secondary w-full" id="btn-simulate-snooze-timeout">
              Mô phỏng: Hết giờ hoãn -> Đổ chuông lại
            </button>
          </div>
        </div>
      </div>
    `;
  }

  // D3: Mission Completed Screen
  if (current === 'D3_mission_completed') {
    const hasNext = state.currentMissionStep < state.currentMissionSequence.length - 1;

    return `
      <div class="screen-viewport" style="background: radial-gradient(circle at 50% 30%, #152A36 0%, #0B1220 100%);">
        <div class="screen-content" style="justify-content: space-between; text-align: center; padding: 40px var(--margin-side) 32px;">
          <div>
            <span class="badge badge-mint" style="font-size: 12px; padding: 4px 12px;">XUẤT SẮC!</span>
            <div style="width: 100px; height: 100px; border-radius: 50%; background: var(--accent-mint-dim); margin: 24px auto 12px; display: flex; align-items: center; justify-content: center; box-shadow: 0 0 30px var(--accent-mint-dim);">
              <span style="font-size: 48px;">🏆</span>
            </div>
            <h1 style="font-size: 26px; color: var(--accent-mint);">Nhiệm vụ hoàn thành!</h1>
            <p class="text-small" style="margin-top: 6px;">Bộ não và cơ thể của bạn đã sẵn sàng cho ngày mới.</p>
          </div>

          <div class="card" style="text-align: left; padding: 18px; background: var(--bg-surface);">
            <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
              <span class="text-small" style="color: var(--text-secondary);">Thời gian giải quyết:</span>
              <span class="text-small tabular-nums" style="font-weight: 700; color: var(--text-primary);">42 giây</span>
            </div>
            <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
              <span class="text-small" style="color: var(--text-secondary);">Độ chính xác:</span>
              <span class="text-small" style="font-weight: 700; color: var(--accent-mint);">100% Tuyệt đối</span>
            </div>
            <div style="display: flex; justify-content: space-between;">
              <span class="text-small" style="color: var(--text-secondary);">Huy hiệu đạt được:</span>
              <span class="text-small" style="font-weight: 700; color: var(--accent-peach);">🌟 Thần tốc rời giường</span>
            </div>
          </div>

          <div>
            ${hasNext ? `
              <button class="btn-primary w-full" id="btn-next-mission-in-seq" style="min-height: 52px; font-size: 15px;">
                Tiếp tục nhiệm vụ tiếp theo (${state.currentMissionStep + 2}/${state.currentMissionSequence.length})
              </button>
            ` : `
              <button class="btn-primary w-full" id="btn-goto-morning-summary" style="min-height: 52px; font-size: 15px;">
                Xem tóm tắt buổi sáng
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="m9 18 6-6-6-6"/></svg>
              </button>
            `}
          </div>
        </div>
      </div>
    `;
  }

  // D4: Wake-up Check Screen (Anti-oversleep 5m safety check)
  if (current === 'D4_wakeup_check') {
    return `
      <div class="screen-viewport" style="background: radial-gradient(circle at 50% 30%, #2A1D15 0%, #0B1220 100%);">
        <div class="screen-content" style="justify-content: space-between; text-align: center; padding: 40px var(--margin-side) 32px;">
          <div>
            <span class="badge badge-peach" style="font-size: 12px; padding: 4px 12px;">KIỂM TRA THỨC GIẤC SAU 5 PHÚT</span>
            <div style="font-size: 48px; margin: 20px 0 10px;">⏰</div>
            <h1 style="font-size: 24px; color: var(--accent-peach);">Bạn có còn thức không?</h1>
            <p class="text-small" style="margin-top: 6px; max-width: 300px; margin-left: auto; margin-right: auto;">
              ZakiAlarm đang kiểm tra để đảm bảo bạn không vô tình ngủ lại trên giường.
            </p>
          </div>

          <div class="card" style="padding: 24px; background: var(--bg-surface); text-align: center;">
            <span class="text-xs" style="color: var(--text-secondary); text-transform: uppercase; font-weight: 700;">Thời gian xác nhận còn lại</span>
            <div class="time-display tabular-nums" style="font-size: 48px; font-weight: 900; color: var(--accent-peach); margin: 8px 0;">
              02:45
            </div>
            <p class="text-xs" style="color: var(--status-danger);">
              ⚠️ Nếu không xác nhận, chuông báo thức sẽ reo to trở lại ngay!
            </p>
          </div>

          <div style="display: flex; flex-direction: column; gap: 10px;">
            <button class="btn-primary w-full" id="btn-confirm-wakeup-awake" style="background: var(--accent-mint); color: #0B1220; min-height: 52px; font-size: 15px;">
              ✅ Tôi đã tỉnh táo hoàn toàn!
            </button>
            <button class="btn-secondary w-full" id="btn-simulate-missed-check" style="border-color: rgba(255,100,100,0.3); color: var(--status-danger);">
              Mô phỏng: Bỏ lỡ kiểm tra -> Đổ chuông lại
            </button>
          </div>
        </div>
      </div>
    `;
  }

  // D5: Emergency Exit Flow
  if (current === 'D5_emergency_exit') {
    const tapCount = state.emergencyTapCount || 0;
    const requiredTaps = 15;

    return `
      <div class="screen-viewport" style="background: #080505;">
        <div class="screen-content" style="justify-content: space-between; text-align: center; padding: 36px var(--margin-side) 28px;">
          <div>
            <span class="badge badge-danger" style="font-size: 12px; padding: 4px 12px;">CHẾ ĐỘ THOÁT KHẨN CẤP</span>
            <div style="font-size: 44px; margin: 16px 0 8px;">🛡️</div>
            <h1 style="font-size: 22px; color: var(--status-danger);">Thoát nhiệm vụ an toàn</h1>
            <p class="text-small" style="margin-top: 6px;">
              Dành riêng cho trường hợp phòng tối không nhận ảnh, camera hỏng, chấn thương hoặc tình huống cấp bách.
            </p>
          </div>

          <div class="card" style="padding: 20px; background: var(--bg-surface); text-align: center; border-color: rgba(255,100,100,0.3);">
            <p class="text-small" style="color: var(--text-primary); font-weight: 600;">
              Để tránh vô tình bấm trong lúc ngủ mê, hãy chạm liên tục nút bên dưới:
            </p>
            <div style="font-size: 38px; font-weight: 800; color: var(--status-danger); margin: 12px 0;" class="tabular-nums">
              ${tapCount} / ${requiredTaps}
            </div>
            <div class="mission-progress-bar">
              <div class="mission-progress-fill" style="width: ${(tapCount / requiredTaps) * 100}%; background: var(--status-danger);"></div>
            </div>
          </div>

          <div style="display: flex; flex-direction: column; gap: 10px;">
            <button class="btn-danger w-full" id="btn-emergency-tap" style="min-height: 52px; font-size: 15px;">
              🚨 Chạm để xác nhận thoát (${tapCount}/${requiredTaps})
            </button>
            <button class="btn-ghost" id="btn-emergency-cancel" style="color: var(--text-secondary);">
              Quay lại tiếp tục giải nhiệm vụ
            </button>
          </div>
        </div>
      </div>
    `;
  }

  // D6: Morning Summary Screen
  if (current === 'D6_morning_summary') {
    return `
      <div class="screen-viewport">
        <div class="screen-header" style="padding: 16px var(--margin-side) 8px;">
          <div class="screen-title-area">
            <span class="text-xs" style="color: var(--accent-mint); font-weight: 700; text-transform: uppercase;">Khởi đầu tuyệt vời</span>
            <h1>Chào buổi sáng!</h1>
          </div>
        </div>

        <div class="screen-content">
          <!-- Summary Metrics Card -->
          <div class="morning-summary-card">
            <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--border-subtle); padding-bottom: 12px; margin-bottom: 12px;">
              <div>
                <span class="text-xs" style="color: var(--text-secondary);">Thời gian thức dậy</span>
                <div class="tabular-nums" style="font-size: 24px; font-weight: 800; color: var(--text-primary); margin-top: 2px;">06:31 SA</div>
              </div>
              <span class="badge badge-mint">Sớm hơn 15p</span>
            </div>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
              <div>
                <span class="text-xs" style="color: var(--text-secondary);">Thời gian ngủ</span>
                <div class="tabular-nums" style="font-size: 16px; font-weight: 700; color: var(--text-primary); margin-top: 2px;">7h 42m</div>
              </div>
              <div>
                <span class="text-xs" style="color: var(--text-secondary);">Số lần hoãn chuông</span>
                <div class="tabular-nums" style="font-size: 16px; font-weight: 700; color: var(--accent-mint); margin-top: 2px;">0 lần (Tuyệt vời)</div>
              </div>
              <div>
                <span class="text-xs" style="color: var(--text-secondary);">Nhiệm vụ giải quyết</span>
                <div style="font-size: 14px; font-weight: 700; color: var(--text-primary); margin-top: 2px;">2/2 Nhiệm vụ</div>
              </div>
              <div>
                <span class="text-xs" style="color: var(--text-secondary);">Chuỗi dậy đúng giờ</span>
                <div class="tabular-nums" style="font-size: 14px; font-weight: 700; color: var(--accent-peach); margin-top: 2px;">🔥 14 ngày liên tiếp</div>
              </div>
            </div>
          </div>

          <!-- Morning Mood Selector -->
          <div class="card">
            <span class="text-xs" style="font-weight: 700; color: var(--text-tertiary); text-transform: uppercase;">Bạn cảm thấy thế nào sáng nay?</span>
            <div class="mood-selector-row">
              <button class="mood-btn active" title="Tuyệt vời">🤩</button>
              <button class="mood-btn" title="Tràn đầy năng lượng">⚡️</button>
              <button class="mood-btn" title="Bình thường">😌</button>
              <button class="mood-btn" title="Hơi ngái ngủ">🥱</button>
              <button class="mood-btn" title="Mệt mỏi">😴</button>
            </div>
            <input type="text" placeholder="Ghi chú buổi sáng (tùy chọn)..." style="width: 100%; background: var(--bg-elevated); border: 1px solid var(--border-subtle); padding: 10px 12px; border-radius: var(--radius-sm); font-size: 13px; color: var(--text-primary); outline: none;" />
          </div>

          <div style="margin-top: 20px; margin-bottom: 20px;">
            <button class="btn-primary w-full" id="btn-finish-morning-summary" style="min-height: 52px; font-size: 15px;">
              Bắt đầu ngày mới đầy hứng khởi!
            </button>
          </div>
        </div>
      </div>
    `;
  }

  return '';
}
