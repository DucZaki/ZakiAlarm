// Screen Module: B. Alarm Management (B1 - B8)

export function renderAlarms(state) {
  const current = state.currentScreen;

  // B1: Main Alarms Home Screen
  if (current === 'B1_home') {
    const activeAlarms = state.alarms.filter(a => a.enabled);
    const hasActive = activeAlarms.length > 0;
    const nextAlarm = hasActive ? activeAlarms[0] : null;

    return `
      <div class="screen-viewport">
        <div class="screen-content" style="padding-top: 8px;">
          <!-- Screen Header -->
          <div class="screen-header">
            <div class="screen-title-area">
              <span class="text-xs" style="color: var(--accent-mint); font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em;">Hôm nay</span>
              <h1>Báo thức</h1>
            </div>
            <div style="display: flex; gap: 8px;">
              <button class="btn-icon" id="btn-quick-alarm-modal" title="Báo thức nhanh / Ngủ trưa">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              </button>
              <button class="btn-icon" id="btn-add-alarm" style="background: var(--accent-mint); color: #0B1220;" title="Thêm báo thức mới">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
              </button>
            </div>
          </div>

          <!-- Quick Nap Chips Row -->
          <div class="nap-chips-row">
            <button class="nap-chip" data-quick-minutes="15">⚡️ Chợp mắt 15p</button>
            <button class="nap-chip" data-quick-minutes="20">☕️ Ngủ trưa 20p</button>
            <button class="nap-chip" data-quick-minutes="30">🔋 Hồi phục 30p</button>
            <button class="nap-chip" data-quick-minutes="60">💤 Chu kỳ 60p</button>
          </div>

          <!-- Next Alarm Countdown Banner -->
          ${hasActive ? `
            <div class="next-alarm-banner" id="banner-next-alarm">
              <span class="text-small" style="color: var(--text-secondary);">Chuông báo tiếp theo</span>
              <div class="banner-countdown tabular-nums">Còn 7 giờ 42 phút nữa</div>
              <div style="display: flex; align-items: center; justify-content: space-between; margin-top: 6px;">
                <span class="text-small" style="font-weight: 600; color: var(--text-primary);">${nextAlarm.time} ${nextAlarm.period} — ${nextAlarm.label}</span>
                <span class="badge badge-mint">${nextAlarm.missions.length} nhiệm vụ</span>
              </div>
            </div>
          ` : `
            <div class="card" style="text-align: center; padding: 20px; margin-bottom: 20px; background: var(--bg-surface);">
              <span style="font-size: 32px;">🔕</span>
              <h3 style="margin-top: 6px; font-size: 15px;">Tất cả báo thức đang tắt</h3>
              <p class="text-small">Bật một báo thức hoặc tạo mới để đón bình minh đúng giờ.</p>
            </div>
          `}

          <!-- Main Alarm Cards List -->
          <div style="display: flex; flex-direction: column;">
            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 10px;">
              <span class="text-xs" style="font-weight: 700; color: var(--text-tertiary); text-transform: uppercase;">Danh sách báo thức</span>
              <span class="text-xs" style="color: var(--text-tertiary);">${state.alarms.length} báo thức</span>
            </div>

            ${state.alarms.map(alarm => {
              const missionIcons = {
                math: '🧠 Toán',
                memory: '🧩 Ghi nhớ',
                shake: '📱 Lắc',
                photo: '📷 Chụp ảnh',
                qr: '🏁 Quét mã',
                typing: '⌨️ Gõ chữ',
                walking: '👟 Đi bộ',
                squats: '🏋️ Squats'
              };

              return `
                <div class="alarm-card ${!alarm.enabled ? 'disabled' : ''}" data-alarm-id="${alarm.id}">
                  <div class="alarm-card-clickable-area" style="flex: 1; cursor: pointer;">
                    <div style="display: flex; align-items: baseline;">
                      <span class="alarm-card-time tabular-nums">${alarm.time}</span>
                      <span class="alarm-card-period">${alarm.period}</span>
                    </div>
                    <div class="alarm-card-label">
                      ${alarm.label}
                    </div>
                    <div class="alarm-card-schedule">
                      ${alarm.days.length === 0 ? 'Một lần' : alarm.days.length === 7 ? 'Mỗi ngày' : alarm.days.join(', ')}
                    </div>
                    <div class="alarm-card-badges">
                      ${alarm.missions.map(m => `
                        <span class="badge badge-lavender" style="font-size: 10px;">${missionIcons[m] || m}</span>
                      `).join('')}
                      ${alarm.wakeupCheck ? `<span class="badge badge-peach" style="font-size: 10px;">Kiểm tra 5p</span>` : ''}
                    </div>
                  </div>

                  <div style="display: flex; align-items: center; gap: 10px;">
                    <button class="btn-icon" data-action="alarm-menu" data-alarm-id="${alarm.id}" style="width: 36px; height: 36px; background: transparent;" title="Tác vụ">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="1"/><circle cx="12" cy="5" r="1"/><circle cx="12" cy="19" r="1"/></svg>
                    </button>
                    <label class="toggle-switch">
                      <input type="checkbox" class="alarm-toggle" data-alarm-id="${alarm.id}" ${alarm.enabled ? 'checked' : ''} />
                      <span class="toggle-slider"></span>
                    </label>
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </div>
      </div>
    `;
  }

  // B2: Create / Edit Alarm Screen
  if (current === 'B2_create_edit') {
    const draft = state.editingAlarm || {
      id: 'alarm_' + Date.now(),
      time: '06:30',
      period: 'SA',
      label: 'Thức dậy buổi sáng',
      days: ['T2', 'T3', 'T4', 'T5', 'T6'],
      sound: 'Bình minh dịu êm',
      volume: 0.85,
      vibrate: true,
      snoozeEnabled: true,
      snoozeDuration: 10,
      snoozeMax: 3,
      missions: ['math'],
      wakeupCheck: true,
      boostSound: false,
      preventEarlyEdit: false
    };

    const [hours, minutes] = draft.time.split(':');

    return `
      <div class="screen-viewport">
        <!-- Header -->
        <div class="screen-header" style="padding: 16px var(--margin-side) 8px;">
          <button class="btn-ghost" id="btn-cancel-edit" style="padding: 0;">Hủy</button>
          <h2 style="font-size: 17px;">${state.editingAlarm ? 'Sửa báo thức' : 'Tạo báo thức'}</h2>
          <button class="btn-ghost text-mint" id="btn-save-alarm" style="padding: 0; font-weight: 700;">Lưu</button>
        </div>

        <div class="screen-content">
          <!-- Time Picker Display -->
          <div class="time-picker-display">
            <span class="time-picker-digit tabular-nums" id="time-picker-hours">${hours}</span>
            <span class="time-picker-colon">:</span>
            <span class="time-picker-digit tabular-nums" id="time-picker-minutes">${minutes}</span>
            <div class="time-picker-period-col">
              <span class="period-pill ${draft.period === 'SA' ? 'active' : ''}" id="pill-period-am">SA</span>
              <span class="period-pill ${draft.period === 'CH' ? 'active' : ''}" id="pill-period-pm">CH</span>
            </div>
          </div>

          <!-- Label Input -->
          <div class="card" style="margin-bottom: 12px;">
            <label class="text-xs" style="font-weight: 700; color: var(--text-tertiary); text-transform: uppercase;">Tên nhãn báo thức</label>
            <input type="text" id="alarm-input-label" value="${draft.label}" placeholder="Ví dụ: Thức dậy đi làm" style="width: 100%; background: none; border: none; font-size: 16px; font-weight: 600; color: var(--text-primary); margin-top: 6px; outline: none;" />
          </div>

          <!-- Repeat Schedule Row -->
          <div class="card card-clickable" id="row-repeat-schedule" style="margin-bottom: 12px;">
            <div class="card-header" style="margin-bottom: 0;">
              <div>
                <h3 style="font-size: 15px;">Lặp lại các ngày</h3>
                <p class="text-small" id="repeat-summary-text">${draft.days.length === 0 ? 'Chỉ một lần' : draft.days.length === 7 ? 'Mỗi ngày' : draft.days.join(', ')}</p>
              </div>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m9 18 6-6-6-6"/></svg>
            </div>
          </div>

          <!-- Missions Row -->
          <div class="card card-clickable" id="row-select-missions" style="margin-bottom: 12px;">
            <div class="card-header" style="margin-bottom: 0;">
              <div>
                <div style="display: flex; align-items: center; gap: 6px;">
                  <h3 style="font-size: 15px;">Nhiệm vụ thức giấc</h3>
                  <span class="badge badge-mint">${draft.missions.length} nhiệm vụ</span>
                </div>
                <p class="text-small">Bắt buộc hoàn thành để tắt chuông</p>
              </div>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m9 18 6-6-6-6"/></svg>
            </div>
          </div>

          <!-- Sound Picker Row -->
          <div class="card card-clickable" id="row-select-sound" style="margin-bottom: 12px;">
            <div class="card-header" style="margin-bottom: 0;">
              <div>
                <h3 style="font-size: 15px;">Âm thanh chuông</h3>
                <p class="text-small">${draft.sound} • Âm lượng ${Math.round(draft.volume * 100)}%</p>
              </div>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m9 18 6-6-6-6"/></svg>
            </div>
          </div>

          <!-- Snooze Row -->
          <div class="card card-clickable" id="row-select-snooze" style="margin-bottom: 12px;">
            <div class="card-header" style="margin-bottom: 0;">
              <div>
                <h3 style="font-size: 15px;">Hoãn báo thức (Snooze)</h3>
                <p class="text-small">${draft.snoozeEnabled ? `${draft.snoozeDuration} phút • Tối đa ${draft.snoozeMax} lần` : 'Đã tắt'}</p>
              </div>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m9 18 6-6-6-6"/></svg>
            </div>
          </div>

          <!-- Advanced Options Row -->
          <div class="card card-clickable" id="row-select-advanced" style="margin-bottom: 20px;">
            <div class="card-header" style="margin-bottom: 0;">
              <div>
                <h3 style="font-size: 15px;">Tùy chọn nâng cao</h3>
                <p class="text-small">Kiểm tra thức giấc 5p, âm lượng tăng dần...</p>
              </div>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m9 18 6-6-6-6"/></svg>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  // B3: Repeat Schedule Dedicated Screen
  if (current === 'B3_repeat') {
    const draft = state.editingAlarm || state.alarms[0];
    const days = ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'];

    return `
      <div class="screen-viewport">
        <div class="screen-header" style="padding: 16px var(--margin-side) 8px;">
          <button class="btn-ghost" id="btn-back-to-edit" style="padding: 0;">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="m15 18-6-6 6-6"/></svg>
            Quay lại
          </button>
          <h2 style="font-size: 17px;">Lịch lặp lại</h2>
          <button class="btn-ghost text-mint" id="btn-confirm-repeat" style="padding: 0; font-weight: 700;">Xong</button>
        </div>

        <div class="screen-content">
          <div style="margin: 12px 0 20px;">
            <span class="text-xs" style="font-weight: 700; color: var(--text-tertiary); text-transform: uppercase;">Chọn nhanh</span>
            <div style="display: flex; gap: 8px; margin-top: 8px;">
              <button class="btn-secondary" id="preset-weekdays" style="flex: 1; font-size: 13px; min-height: 40px;">T2 - T6</button>
              <button class="btn-secondary" id="preset-weekend" style="flex: 1; font-size: 13px; min-height: 40px;">T7, CN</button>
              <button class="btn-secondary" id="preset-everyday" style="flex: 1; font-size: 13px; min-height: 40px;">Mỗi ngày</button>
            </div>
          </div>

          <span class="text-xs" style="font-weight: 700; color: var(--text-tertiary); text-transform: uppercase;">Từng ngày trong tuần</span>
          <div style="margin-top: 8px;">
            ${days.map(d => {
              const dayNames = {
                'T2': 'Thứ Hai',
                'T3': 'Thứ Ba',
                'T4': 'Thứ Tư',
                'T5': 'Thứ Năm',
                'T6': 'Thứ Sáu',
                'T7': 'Thứ Bảy',
                'CN': 'Chủ Nhật'
              };
              const isSelected = draft.days.includes(d);
              return `
                <div class="card card-clickable repeat-day-row" data-day="${d}" style="display: flex; align-items: center; justify-content: space-between; padding: 14px 16px; margin-bottom: 8px;">
                  <span style="font-weight: 600; font-size: 15px;">${dayNames[d]} (${d})</span>
                  <div style="width: 22px; height: 22px; border-radius: 50%; border: 2px solid ${isSelected ? 'var(--accent-mint)' : 'var(--border-medium)'}; background: ${isSelected ? 'var(--accent-mint)' : 'transparent'}; display: flex; align-items: center; justify-content: center;">
                    ${isSelected ? `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#0B1220" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>` : ''}
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </div>
      </div>
    `;
  }

  // B4: Sound Picker Screen (With Web Audio preview)
  if (current === 'B4_sound_picker') {
    const sounds = [
      { id: 'gentle', name: 'Bình minh dịu êm', cat: 'Dịu êm', icon: '🌅', desc: 'Chuông đa âm ấm áp, đánh thức nhẹ nhàng' },
      { id: 'birds', name: 'Chim hót sớm mai', cat: 'Thiên nhiên', icon: '🐦', desc: 'Tiếng chim rừng tự nhiên, mang lại cảm giác an bình' },
      { id: 'radar', name: 'Báo thức Radar năng động', cat: 'Mạnh mẽ', icon: '⚡️', desc: 'Tiết tấu dứt khoát, chống ngủ gật hiệu quả cao' },
      { id: 'bell', name: 'Chuông cơ cổ điển', cat: 'Cổ điển', icon: '🔔', desc: 'Chuông reo cơ học vang to, dành cho người khó dậy' }
    ];

    return `
      <div class="screen-viewport">
        <div class="screen-header" style="padding: 16px var(--margin-side) 8px;">
          <button class="btn-ghost" id="btn-back-to-edit" style="padding: 0;">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="m15 18-6-6 6-6"/></svg>
            Quay lại
          </button>
          <h2 style="font-size: 17px;">Âm thanh báo thức</h2>
          <button class="btn-ghost text-mint" id="btn-confirm-sound" style="padding: 0; font-weight: 700;">Chọn</button>
        </div>

        <div class="screen-content">
          <!-- Master Volume Slider -->
          <div class="card" style="margin: 12px 0 16px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
              <span class="text-xs" style="font-weight: 700; color: var(--text-tertiary); text-transform: uppercase;">Âm lượng chuông</span>
              <span class="text-small tabular-nums" id="sound-vol-label" style="font-weight: 700; color: var(--accent-mint);">85%</span>
            </div>
            <div class="slider-container">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/></svg>
              <input type="range" class="slider-input" id="sound-volume-slider" min="0.1" max="1" step="0.05" value="0.85" />
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>
            </div>
          </div>

          <span class="text-xs" style="font-weight: 700; color: var(--text-tertiary); text-transform: uppercase;">Bộ sưu tập chuông (100% Miễn phí)</span>
          <div style="margin-top: 8px; display: flex; flex-direction: column; gap: 8px;">
            ${sounds.map(s => `
              <div class="card card-clickable sound-select-item" data-sound-id="${s.id}" data-sound-name="${s.name}" style="display: flex; align-items: center; justify-content: space-between;">
                <div style="display: flex; align-items: center; gap: 12px;">
                  <span style="font-size: 24px;">${s.icon}</span>
                  <div>
                    <h3 style="font-size: 15px;">${s.name}</h3>
                    <p class="text-small">${s.desc}</p>
                  </div>
                </div>
                <button class="btn-icon btn-preview-sound" data-sound-id="${s.id}" style="width: 38px; height: 38px; background: var(--bg-elevated);" title="Nghe thử">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                </button>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;
  }

  // B5: Snooze Configuration Screen
  if (current === 'B5_snooze_config') {
    return `
      <div class="screen-viewport">
        <div class="screen-header" style="padding: 16px var(--margin-side) 8px;">
          <button class="btn-ghost" id="btn-back-to-edit" style="padding: 0;">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="m15 18-6-6 6-6"/></svg>
            Quay lại
          </button>
          <h2 style="font-size: 17px;">Cài đặt hoãn chuông</h2>
          <button class="btn-ghost text-mint" id="btn-confirm-snooze" style="padding: 0; font-weight: 700;">Lưu</button>
        </div>

        <div class="screen-content">
          <div class="card" style="display: flex; align-items: center; justify-content: space-between; margin-top: 12px;">
            <div>
              <h3 style="font-size: 15px;">Bật hoãn báo thức</h3>
              <p class="text-small">Cho phép ngủ thêm một khoảng thời gian ngắn</p>
            </div>
            <label class="toggle-switch">
              <input type="checkbox" id="toggle-snooze-active" checked />
              <span class="toggle-slider"></span>
            </label>
          </div>

          <span class="text-xs" style="font-weight: 700; color: var(--text-tertiary); text-transform: uppercase; margin-top: 16px; display: block;">Thời gian hoãn mỗi lần</span>
          <div class="segmented-control" style="margin-top: 6px;">
            <div class="segment-item">5 phút</div>
            <div class="segment-item active">10 phút</div>
            <div class="segment-item">15 phút</div>
            <div class="segment-item">20 phút</div>
          </div>

          <span class="text-xs" style="font-weight: 700; color: var(--text-tertiary); text-transform: uppercase; margin-top: 16px; display: block;">Số lần hoãn tối đa</span>
          <div class="segmented-control" style="margin-top: 6px;">
            <div class="segment-item">1 lần</div>
            <div class="segment-item active">3 lần</div>
            <div class="segment-item">5 lần</div>
            <div class="segment-item">Vô hạn</div>
          </div>
          <p class="text-xs" style="margin-top: 6px; color: var(--text-secondary);">
            💡 <strong>Mẹo chuyên gia:</strong> Giới hạn 2-3 lần hoãn giúp hạn chế hội chứng quán tính giấc ngủ (sleep inertia) và tránh trễ giờ làm việc.
          </p>
        </div>
      </div>
    `;
  }

  // B6: Quick Alarm / Nap Sheet
  if (current === 'B6_quick_alarm') {
    return `
      <div class="screen-viewport">
        <div class="screen-header" style="padding: 16px var(--margin-side) 8px;">
          <button class="btn-ghost" id="btn-back-to-home" style="padding: 0;">Đóng</button>
          <h2 style="font-size: 17px;">Báo thức nhanh / Chợp mắt</h2>
          <div style="width: 40px;"></div>
        </div>

        <div class="screen-content">
          <p style="margin-top: 4px;">Đặt chuông tức thì mà không cần chỉnh sửa báo thức hàng ngày.</p>

          <div style="margin-top: 16px; display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
            <div class="card card-clickable quick-nap-card" data-nap-duration="15" style="text-align: center; padding: 20px 10px;">
              <span style="font-size: 28px;">⚡️</span>
              <h3 style="margin-top: 8px;">15 phút</h3>
              <p class="text-xs">Chớp mắt tái tạo tỉnh táo</p>
            </div>
            <div class="card card-clickable quick-nap-card" data-nap-duration="20" style="text-align: center; padding: 20px 10px; border-color: var(--accent-mint);">
              <span style="font-size: 28px;">☕️</span>
              <h3 style="margin-top: 8px; color: var(--accent-mint);">20 phút</h3>
              <p class="text-xs">Giấc ngủ trưa lý tưởng</p>
            </div>
            <div class="card card-clickable quick-nap-card" data-nap-duration="30" style="text-align: center; padding: 20px 10px;">
              <span style="font-size: 28px;">🔋</span>
              <h3 style="margin-top: 8px;">30 phút</h3>
              <p class="text-xs">Nạp lại năng lượng sâu</p>
            </div>
            <div class="card card-clickable quick-nap-card" data-nap-duration="60" style="text-align: center; padding: 20px 10px;">
              <span style="font-size: 28px;">💤</span>
              <h3 style="margin-top: 8px;">60 phút</h3>
              <p class="text-xs">Chu kỳ giấc ngủ hoàn chỉnh</p>
            </div>
          </div>

          <div class="card" style="margin-top: 16px; text-align: center; background: var(--bg-elevated);">
            <span class="text-small">Chuông sẽ reo lúc</span>
            <div class="time-display tabular-nums" style="font-size: 32px; font-weight: 800; color: var(--accent-mint); margin: 4px 0;">12:45</div>
            <span class="text-xs">Nhiệm vụ: Lắc máy 20 lần</span>
          </div>

          <div style="margin-top: 16px;">
            <button class="btn-primary w-full" id="btn-start-quick-nap">
              Kích hoạt chợp mắt 20 phút
            </button>
          </div>
        </div>
      </div>
    `;
  }

  // B7: Action Sheet for an Alarm
  if (current === 'B7_actions') {
    const selectedAlarm = state.selectedAlarmForAction || state.alarms[0];
    return `
      <div class="screen-viewport">
        <div class="screen-content" style="padding-top: 20px;">
          <h2>Tác vụ báo thức</h2>
          <p style="margin-top: 4px;">Đang chọn: <strong>${selectedAlarm.time} — ${selectedAlarm.label}</strong></p>

          <div style="margin-top: 20px; display: flex; flex-direction: column; gap: 8px;">
            <button class="card card-clickable" id="action-edit-alarm" style="display: flex; align-items: center; gap: 14px; text-align: left; padding: 16px;">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
              <div>
                <h3 style="font-size: 15px;">Chỉnh sửa báo thức</h3>
                <p class="text-small">Thay đổi giờ reo, nhiệm vụ và chuông</p>
              </div>
            </button>

            <button class="card card-clickable" id="action-duplicate-alarm" style="display: flex; align-items: center; gap: 14px; text-align: left; padding: 16px;">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
              <div>
                <h3 style="font-size: 15px;">Nhân bản báo thức</h3>
                <p class="text-small">Tạo bản sao với đầy đủ nhiệm vụ đã cài đặt</p>
              </div>
            </button>

            <button class="card card-clickable" id="action-skip-next" style="display: flex; align-items: center; gap: 14px; text-align: left; padding: 16px;">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="5 4 15 12 5 20 5 4"/><line x1="19" y1="5" x2="19" y2="19"/></svg>
              <div>
                <h3 style="font-size: 15px;">Bỏ qua lần reo tiếp theo</h3>
                <p class="text-small">Không reo vào ngày mai, tự động bật lại ngày kế tiếp</p>
              </div>
            </button>

            <button class="card card-clickable" id="action-delete-alarm" style="display: flex; align-items: center; gap: 14px; text-align: left; padding: 16px; border-color: rgba(255, 100, 100, 0.3);">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--status-danger)" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
              <div>
                <h3 style="font-size: 15px; color: var(--status-danger);">Xóa báo thức</h3>
                <p class="text-small">Xóa vĩnh viễn (Có thể hoàn tác ngay sau đó)</p>
              </div>
            </button>
          </div>

          <div style="margin-top: 16px;">
            <button class="btn-secondary w-full" id="btn-cancel-action-menu">Hủy bỏ</button>
          </div>
        </div>
      </div>
    `;
  }

  // B8: Advanced Options Screen
  if (current === 'B8_advanced') {
    return `
      <div class="screen-viewport">
        <div class="screen-header" style="padding: 16px var(--margin-side) 8px;">
          <button class="btn-ghost" id="btn-back-to-edit" style="padding: 0;">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="m15 18-6-6 6-6"/></svg>
            Quay lại
          </button>
          <h2 style="font-size: 17px;">Tùy chọn nâng cao</h2>
          <button class="btn-ghost text-mint" id="btn-confirm-advanced" style="padding: 0; font-weight: 700;">Lưu</button>
        </div>

        <div class="screen-content">
          <div class="card" style="display: flex; align-items: center; justify-content: space-between; margin-top: 12px;">
            <div>
              <h3 style="font-size: 15px;">Kiểm tra thức giấc sau 5 phút</h3>
              <p class="text-small">Nếu bạn ngủ lại và không bấm xác nhận, chuông sẽ reo lớn lại ngay lập tức</p>
            </div>
            <label class="toggle-switch">
              <input type="checkbox" checked />
              <span class="toggle-slider"></span>
            </label>
          </div>

          <div class="card" style="display: flex; align-items: center; justify-content: space-between; margin-top: 8px;">
            <div>
              <h3 style="font-size: 15px;">Tăng dần âm lượng êm ái</h3>
              <p class="text-small">Âm lượng chuông sẽ tăng đều từ 10% đến 100% trong 60 giây</p>
            </div>
            <label class="toggle-switch">
              <input type="checkbox" checked />
              <span class="toggle-slider"></span>
            </label>
          </div>

          <div class="card" style="display: flex; align-items: center; justify-content: space-between; margin-top: 8px;">
            <div>
              <h3 style="font-size: 15px;">Đọc to giờ và nhãn bằng giọng nói</h3>
              <p class="text-small">Giọng đọc tiếng Việt tự nhiên nhắc nhở lịch trình buổi sáng</p>
            </div>
            <label class="toggle-switch">
              <input type="checkbox" />
              <span class="toggle-slider"></span>
            </label>
          </div>

          <div class="card" style="display: flex; align-items: center; justify-content: space-between; margin-top: 8px;">
            <div>
              <h3 style="font-size: 15px;">Khóa chỉnh sửa cận giờ (15 phút)</h3>
              <p class="text-small">Ngăn chặn việc tắt báo thức khi bạn đang còn mơ màng trước giờ chuông reo</p>
            </div>
            <label class="toggle-switch">
              <input type="checkbox" checked />
              <span class="toggle-slider"></span>
            </label>
          </div>

          <div class="card" style="background: var(--bg-elevated); margin-top: 16px;">
            <p class="text-xs" style="color: var(--text-secondary); line-height: 1.5;">
              ⚠️ <strong>Lưu ý kỹ thuật:</strong> Báo thức di động yêu cầu thiết bị được bật nguồn. Không có ứng dụng nào có thể tự động bật nguồn điện thoại nếu máy đã tắt nguồn hoàn toàn.
            </p>
          </div>
        </div>
      </div>
    `;
  }

  return '';
}
