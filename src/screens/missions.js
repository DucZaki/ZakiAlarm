// Screen Module: C. Mission Setup & 8 Execution Screens (C1 - C10 + Executions)

export function renderMissions(state) {
  const current = state.currentScreen;

  // C1: Mission Library
  if (current === 'C1_mission_library') {
    const mentalMissions = [
      { id: 'math', name: 'Toán học trí tuệ', desc: 'Giải các phép tính cộng trừ nhân để đánh thức tư duy logic', icon: '🧠', color: 'mint', badge: 'Khuyên dùng' },
      { id: 'memory', name: 'Trò chơi trí nhớ', desc: 'Ghi nhớ và mở các ô sáng trên lưới bàn cờ trong vài giây', icon: '🧩', color: 'lavender', badge: 'Trí não' },
      { id: 'typing', name: 'Gõ chữ truyền cảm hứng', desc: 'Gõ lại các câu danh ngôn tiếng Việt tích cực cho ngày mới', icon: '⌨️', color: 'peach', badge: 'Tích cực' }
    ];

    const motionMissions = [
      { id: 'shake', name: 'Lắc điện thoại', desc: 'Lắc mạnh máy liên tục để kích thích tuần hoàn máu buổi sáng', icon: '📱', color: 'mint', badge: 'Năng động' },
      { id: 'walking', name: 'Đếm bước chân', desc: 'Cầm điện thoại và bước đi ít nhất 30 bước rời khỏi phòng ngủ', icon: '👟', color: 'lavender', badge: 'Rời giường' },
      { id: 'squats', name: 'Động tác Squats', desc: 'Đứng lên ngồi xuống để cơ thể bừng tỉnh với cảm biến góc nghiêng', icon: '🏋️', color: 'peach', badge: 'Thể lực' }
    ];

    const leaveBedMissions = [
      { id: 'photo', name: 'Chụp ảnh đối chiếu', desc: 'Chụp lại vị trí đã đăng ký: Bồn rửa mặt, bàn học, ấm nước...', icon: '📷', color: 'mint', badge: 'Rời giường 100%' },
      { id: 'qr', name: 'Quét mã QR / Barcode', desc: 'Quét mã vạch tuýp kem đánh răng hoặc sách trong phòng khách', icon: '🏁', color: 'lavender', badge: 'Hiệu quả cao' }
    ];

    return `
      <div class="screen-viewport">
        <div class="screen-header" style="padding: 16px var(--margin-side) 8px;">
          <button class="btn-ghost" id="btn-back-to-edit" style="padding: 0;">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="m15 18-6-6 6-6"/></svg>
            Quay lại
          </button>
          <h2 style="font-size: 17px;">Thư viện nhiệm vụ</h2>
          <button class="btn-ghost text-mint" id="btn-open-sequence" style="padding: 0; font-weight: 700;">Ghép chuỗi</button>
        </div>

        <div class="screen-content">
          <p style="margin-top: 4px;">Chọn nhiệm vụ để cài đặt hoặc thử nghiệm ngay bây giờ.</p>

          <!-- Group 1: Trí tuệ -->
          <div style="margin-top: 16px;">
            <span class="text-xs" style="font-weight: 700; color: var(--text-tertiary); text-transform: uppercase;">1. Đánh thức trí não</span>
            <div style="margin-top: 8px; display: flex; flex-direction: column; gap: 8px;">
              ${mentalMissions.map(m => `
                <div class="mission-card" data-mission-id="${m.id}">
                  <div class="mission-card-left">
                    <div class="mission-icon-box ${m.color}">
                      <span style="font-size: 22px;">${m.icon}</span>
                    </div>
                    <div>
                      <div style="display: flex; align-items: center; gap: 6px;">
                        <h3 style="font-size: 15px;">${m.name}</h3>
                        <span class="badge badge-${m.color}" style="font-size: 10px;">${m.badge}</span>
                      </div>
                      <p class="text-small" style="margin-top: 2px;">${m.desc}</p>
                    </div>
                  </div>
                  <button class="btn-secondary btn-try-mission" data-mission-id="${m.id}" style="min-height: 36px; padding: 0 12px; font-size: 12px; white-space: nowrap;">Thử ngay</button>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- Group 2: Vận động -->
          <div style="margin-top: 20px;">
            <span class="text-xs" style="font-weight: 700; color: var(--text-tertiary); text-transform: uppercase;">2. Vận động cơ thể</span>
            <div style="margin-top: 8px; display: flex; flex-direction: column; gap: 8px;">
              ${motionMissions.map(m => `
                <div class="mission-card" data-mission-id="${m.id}">
                  <div class="mission-card-left">
                    <div class="mission-icon-box ${m.color}">
                      <span style="font-size: 22px;">${m.icon}</span>
                    </div>
                    <div>
                      <div style="display: flex; align-items: center; gap: 6px;">
                        <h3 style="font-size: 15px;">${m.name}</h3>
                        <span class="badge badge-${m.color}" style="font-size: 10px;">${m.badge}</span>
                      </div>
                      <p class="text-small" style="margin-top: 2px;">${m.desc}</p>
                    </div>
                  </div>
                  <button class="btn-secondary btn-try-mission" data-mission-id="${m.id}" style="min-height: 36px; padding: 0 12px; font-size: 12px; white-space: nowrap;">Thử ngay</button>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- Group 3: Rời giường -->
          <div style="margin-top: 20px; margin-bottom: 20px;">
            <span class="text-xs" style="font-weight: 700; color: var(--text-tertiary); text-transform: uppercase;">3. Buộc rời khỏi giường</span>
            <div style="margin-top: 8px; display: flex; flex-direction: column; gap: 8px;">
              ${leaveBedMissions.map(m => `
                <div class="mission-card" data-mission-id="${m.id}">
                  <div class="mission-card-left">
                    <div class="mission-icon-box ${m.color}">
                      <span style="font-size: 22px;">${m.icon}</span>
                    </div>
                    <div>
                      <div style="display: flex; align-items: center; gap: 6px;">
                        <h3 style="font-size: 15px;">${m.name}</h3>
                        <span class="badge badge-${m.color}" style="font-size: 10px;">${m.badge}</span>
                      </div>
                      <p class="text-small" style="margin-top: 2px;">${m.desc}</p>
                    </div>
                  </div>
                  <button class="btn-secondary btn-try-mission" data-mission-id="${m.id}" style="min-height: 36px; padding: 0 12px; font-size: 12px; white-space: nowrap;">Thử ngay</button>
                </div>
              `).join('')}
            </div>
          </div>
        </div>
      </div>
    `;
  }

  // C2: Math Setup
  if (current === 'C2_math_setup') {
    return `
      <div class="screen-viewport">
        <div class="screen-header" style="padding: 16px var(--margin-side) 8px;">
          <button class="btn-ghost" id="btn-back-to-library" style="padding: 0;">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="m15 18-6-6 6-6"/></svg>
            Quay lại
          </button>
          <h2 style="font-size: 17px;">Cài đặt Toán học</h2>
          <button class="btn-ghost text-mint" id="btn-save-mission-setup" style="padding: 0; font-weight: 700;">Lưu</button>
        </div>

        <div class="screen-content">
          <span class="text-xs" style="font-weight: 700; color: var(--text-tertiary); text-transform: uppercase;">Độ khó</span>
          <div class="segmented-control" style="margin: 8px 0 16px;">
            <div class="segment-item">Dễ</div>
            <div class="segment-item active">Vừa</div>
            <div class="segment-item">Khó</div>
            <div class="segment-item">Cực khó</div>
          </div>

          <div class="card" style="text-align: center; padding: 20px; background: var(--bg-elevated);">
            <span class="text-xs" style="color: var(--text-secondary);">Ví dụ câu hỏi mẫu</span>
            <div class="math-formula" style="font-size: 32px; margin: 8px 0;">47 + 38 = ?</div>
            <span class="text-xs" style="color: var(--accent-mint);">Yêu cầu trả lời chính xác để tắt chuông</span>
          </div>

          <span class="text-xs" style="font-weight: 700; color: var(--text-tertiary); text-transform: uppercase; margin-top: 16px; display: block;">Số lượng câu hỏi</span>
          <div class="segmented-control" style="margin-top: 6px;">
            <div class="segment-item">1 câu</div>
            <div class="segment-item active">3 câu</div>
            <div class="segment-item">5 câu</div>
          </div>

          <div style="margin-top: 24px;">
            <button class="btn-primary w-full" id="btn-try-math-exec">
              ⚡️ Thử giải ngay (Mô phỏng thực thi)
            </button>
          </div>
        </div>
      </div>
    `;
  }

  // C3: Memory Setup
  if (current === 'C3_memory_setup') {
    return `
      <div class="screen-viewport">
        <div class="screen-header" style="padding: 16px var(--margin-side) 8px;">
          <button class="btn-ghost" id="btn-back-to-library" style="padding: 0;">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="m15 18-6-6 6-6"/></svg>
            Quay lại
          </button>
          <h2 style="font-size: 17px;">Trò chơi Trí nhớ</h2>
          <button class="btn-ghost text-mint" id="btn-save-mission-setup" style="padding: 0; font-weight: 700;">Lưu</button>
        </div>

        <div class="screen-content">
          <span class="text-xs" style="font-weight: 700; color: var(--text-tertiary); text-transform: uppercase;">Kích thước lưới</span>
          <div class="segmented-control" style="margin: 8px 0 16px;">
            <div class="segment-item active">3 x 3 (9 ô)</div>
            <div class="segment-item">4 x 4 (16 ô)</div>
          </div>

          <span class="text-xs" style="font-weight: 700; color: var(--text-tertiary); text-transform: uppercase;">Số ô cần ghi nhớ</span>
          <div class="segmented-control" style="margin: 8px 0 16px;">
            <div class="segment-item">3 ô</div>
            <div class="segment-item active">4 ô</div>
            <div class="segment-item">5 ô</div>
          </div>

          <span class="text-xs" style="font-weight: 700; color: var(--text-tertiary); text-transform: uppercase;">Số vòng thử thách</span>
          <div class="segmented-control" style="margin: 8px 0 16px;">
            <div class="segment-item">1 vòng</div>
            <div class="segment-item active">2 vòng</div>
            <div class="segment-item">3 vòng</div>
          </div>

          <div style="margin-top: 20px;">
            <button class="btn-primary w-full" id="btn-try-memory-exec">
              ⚡️ Thử chơi ngay (Mô phỏng thực thi)
            </button>
          </div>
        </div>
      </div>
    `;
  }

  // C4: Shake Setup
  if (current === 'C4_shake_setup') {
    return `
      <div class="screen-viewport">
        <div class="screen-header" style="padding: 16px var(--margin-side) 8px;">
          <button class="btn-ghost" id="btn-back-to-library" style="padding: 0;">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="m15 18-6-6 6-6"/></svg>
            Quay lại
          </button>
          <h2 style="font-size: 17px;">Cài đặt Lắc máy</h2>
          <button class="btn-ghost text-mint" id="btn-save-mission-setup" style="padding: 0; font-weight: 700;">Lưu</button>
        </div>

        <div class="screen-content">
          <span class="text-xs" style="font-weight: 700; color: var(--text-tertiary); text-transform: uppercase;">Mục tiêu số lần lắc</span>
          <div class="segmented-control" style="margin: 8px 0 16px;">
            <div class="segment-item">20 lần</div>
            <div class="segment-item active">40 lần</div>
            <div class="segment-item">60 lần</div>
            <div class="segment-item">100 lần</div>
          </div>

          <span class="text-xs" style="font-weight: 700; color: var(--text-tertiary); text-transform: uppercase;">Độ nhạy cảm biến</span>
          <div class="segmented-control" style="margin: 8px 0 16px;">
            <div class="segment-item">Dễ lắc</div>
            <div class="segment-item active">Tiêu chuẩn</div>
            <div class="segment-item">Lắc mạnh</div>
          </div>

          <div class="card" style="margin-top: 10px; background: var(--bg-elevated);">
            <p class="text-xs" style="line-height: 1.5;">
              📱 <strong>Cảm biến gia tốc kế:</strong> Giúp kích hoạt cơ bắp tay và nhịp tim nhanh chóng tăng lên, loại bỏ cơn ngái ngủ tức thì.
            </p>
          </div>

          <div style="margin-top: 24px;">
            <button class="btn-primary w-full" id="btn-try-shake-exec">
              ⚡️ Thử lắc ngay (Mô phỏng thực thi)
            </button>
          </div>
        </div>
      </div>
    `;
  }

  // C5: Photo Setup
  if (current === 'C5_photo_setup') {
    return `
      <div class="screen-viewport">
        <div class="screen-header" style="padding: 16px var(--margin-side) 8px;">
          <button class="btn-ghost" id="btn-back-to-library" style="padding: 0;">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="m15 18-6-6 6-6"/></svg>
            Quay lại
          </button>
          <h2 style="font-size: 17px;">Cài đặt Chụp ảnh</h2>
          <button class="btn-ghost text-mint" id="btn-save-mission-setup" style="padding: 0; font-weight: 700;">Lưu</button>
        </div>

        <div class="screen-content">
          <p style="margin-top: 4px;">Đăng ký một vật thể hoặc vị trí cố định để chụp đối chiếu mỗi sáng.</p>

          <div class="card" style="margin-top: 14px; text-align: center; padding: 24px; border: 2px dashed var(--border-medium);">
            <span style="font-size: 40px;">🚰</span>
            <h3 style="margin-top: 8px;">Bồn rửa mặt nhà tắm</h3>
            <p class="text-small">Đã đăng ký ảnh mẫu • Độ khớp yêu cầu 80%</p>
            <button class="btn-secondary" style="margin-top: 12px; min-height: 36px; font-size: 12px;">Đổi vị trí khác</button>
          </div>

          <span class="text-xs" style="font-weight: 700; color: var(--text-tertiary); text-transform: uppercase; margin-top: 16px; display: block;">Gợi ý vị trí hiệu quả nhất</span>
          <div style="display: flex; gap: 8px; margin-top: 8px; overflow-x: auto;">
            <span class="badge badge-mint" style="padding: 6px 12px;">🚰 Bồn rửa mặt</span>
            <span class="badge badge-lavender" style="padding: 6px 12px;">📚 Bàn làm việc</span>
            <span class="badge badge-peach" style="padding: 6px 12px;">🍵 Ấm trà nhà bếp</span>
          </div>

          <div style="margin-top: 24px;">
            <button class="btn-primary w-full" id="btn-try-photo-exec">
              ⚡️ Thử nghiệm chụp ảnh đối chiếu
            </button>
          </div>
        </div>
      </div>
    `;
  }

  // C6: QR / Barcode Setup
  if (current === 'C6_qr_setup') {
    return `
      <div class="screen-viewport">
        <div class="screen-header" style="padding: 16px var(--margin-side) 8px;">
          <button class="btn-ghost" id="btn-back-to-library" style="padding: 0;">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="m15 18-6-6 6-6"/></svg>
            Quay lại
          </button>
          <h2 style="font-size: 17px;">Cài đặt Quét mã QR</h2>
          <button class="btn-ghost text-mint" id="btn-save-mission-setup" style="padding: 0; font-weight: 700;">Lưu</button>
        </div>

        <div class="screen-content">
          <p style="margin-top: 4px;">Dán hoặc quét một mã QR/mã vạch từ đồ vật cách xa giường ngủ.</p>

          <div class="card" style="margin-top: 14px; text-align: center; padding: 20px; background: var(--bg-elevated);">
            <div style="width: 80px; height: 80px; margin: 0 auto; background: #FFFFFF; border-radius: 12px; display: flex; align-items: center; justify-content: center; padding: 6px;">
              <img src="/logo.svg" style="width: 100%; height: 100%;" alt="QR" />
            </div>
            <h3 style="margin-top: 10px;">Tuýp kem đánh răng (893850...)</h3>
            <p class="text-small">Vị trí: Phòng tắm tầng 2</p>
          </div>

          <div style="margin-top: 24px;">
            <button class="btn-primary w-full" id="btn-try-qr-exec">
              ⚡️ Thử nghiệm quét mã (Mô phỏng máy quét)
            </button>
          </div>
        </div>
      </div>
    `;
  }

  // C7: Typing Setup
  if (current === 'C7_typing_setup') {
    return `
      <div class="screen-viewport">
        <div class="screen-header" style="padding: 16px var(--margin-side) 8px;">
          <button class="btn-ghost" id="btn-back-to-library" style="padding: 0;">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="m15 18-6-6 6-6"/></svg>
            Quay lại
          </button>
          <h2 style="font-size: 17px;">Gõ chữ truyền cảm hứng</h2>
          <button class="btn-ghost text-mint" id="btn-save-mission-setup" style="padding: 0; font-weight: 700;">Lưu</button>
        </div>

        <div class="screen-content">
          <span class="text-xs" style="font-weight: 700; color: var(--text-tertiary); text-transform: uppercase;">Chủ đề câu nói</span>
          <div class="segmented-control" style="margin: 8px 0 16px;">
            <div class="segment-item active">Động lực</div>
            <div class="segment-item">Triết lý</div>
            <div class="segment-item">Bình an</div>
          </div>

          <div class="card" style="padding: 16px;">
            <span class="text-xs" style="color: var(--accent-mint); font-weight: 700;">CÂU MẪU SẼ GÕ:</span>
            <p style="font-size: 15px; color: var(--text-primary); margin-top: 6px; font-weight: 500;">
              "Mỗi sáng thức dậy là một cơ hội mới để trở thành phiên bản tốt hơn của chính mình."
            </p>
          </div>

          <div style="margin-top: 24px;">
            <button class="btn-primary w-full" id="btn-try-typing-exec">
              ⚡️ Thử nghiệm gõ văn bản
            </button>
          </div>
        </div>
      </div>
    `;
  }

  // C8: Walking Setup
  if (current === 'C8_walking_setup') {
    return `
      <div class="screen-viewport">
        <div class="screen-header" style="padding: 16px var(--margin-side) 8px;">
          <button class="btn-ghost" id="btn-back-to-library" style="padding: 0;">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="m15 18-6-6 6-6"/></svg>
            Quay lại
          </button>
          <h2 style="font-size: 17px;">Đếm bước chân</h2>
          <button class="btn-ghost text-mint" id="btn-save-mission-setup" style="padding: 0; font-weight: 700;">Lưu</button>
        </div>

        <div class="screen-content">
          <span class="text-xs" style="font-weight: 700; color: var(--text-tertiary); text-transform: uppercase;">Mục tiêu bước đi</span>
          <div class="segmented-control" style="margin: 8px 0 16px;">
            <div class="segment-item">20 bước</div>
            <div class="segment-item active">30 bước</div>
            <div class="segment-item">50 bước</div>
          </div>

          <div class="card" style="background: var(--bg-elevated); padding: 16px;">
            <span style="font-size: 24px;">👟</span>
            <h3 style="margin-top: 6px; font-size: 15px;">Cách thức hoạt động</h3>
            <p class="text-small" style="margin-top: 4px;">
              Cầm điện thoại trên tay và đi bộ quanh phòng. Cảm biến gia tốc kế sẽ đếm từng bước chân của bạn cho đến khi đủ số lượng.
            </p>
          </div>

          <div style="margin-top: 24px;">
            <button class="btn-primary w-full" id="btn-try-walking-exec">
              ⚡️ Thử nghiệm đếm bước chân
            </button>
          </div>
        </div>
      </div>
    `;
  }

  // C9: Squats Setup
  if (current === 'C9_squats_setup') {
    return `
      <div class="screen-viewport">
        <div class="screen-header" style="padding: 16px var(--margin-side) 8px;">
          <button class="btn-ghost" id="btn-back-to-library" style="padding: 0;">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="m15 18-6-6 6-6"/></svg>
            Quay lại
          </button>
          <h2 style="font-size: 17px;">Động tác Squats</h2>
          <button class="btn-ghost text-mint" id="btn-save-mission-setup" style="padding: 0; font-weight: 700;">Lưu</button>
        </div>

        <div class="screen-content">
          <span class="text-xs" style="font-weight: 700; color: var(--text-tertiary); text-transform: uppercase;">Mục tiêu số lần</span>
          <div class="segmented-control" style="margin: 8px 0 16px;">
            <div class="segment-item">5 lần</div>
            <div class="segment-item active">10 lần</div>
            <div class="segment-item">15 lần</div>
          </div>

          <div class="card" style="background: var(--bg-elevated); padding: 16px;">
            <span style="font-size: 24px;">🏋️</span>
            <h3 style="margin-top: 6px; font-size: 15px;">Hướng dẫn tư thế Squat</h3>
            <p class="text-small" style="margin-top: 4px;">
              Cầm điện thoại trước ngực, hạ thấp trọng tâm sao cho đùi song song sàn rồi đứng thẳng lên. Cảm biến con quay hồi chuyển sẽ tự động đếm 1 rep.
            </p>
          </div>

          <div style="margin-top: 24px;">
            <button class="btn-primary w-full" id="btn-try-squats-exec">
              ⚡️ Thử nghiệm Squats
            </button>
          </div>
        </div>
      </div>
    `;
  }

  // C10: Multi-mission Sequence
  if (current === 'C10_mission_sequence') {
    return `
      <div class="screen-viewport">
        <div class="screen-header" style="padding: 16px var(--margin-side) 8px;">
          <button class="btn-ghost" id="btn-back-to-library" style="padding: 0;">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="m15 18-6-6 6-6"/></svg>
            Quay lại
          </button>
          <h2 style="font-size: 17px;">Chuỗi đa nhiệm vụ</h2>
          <button class="btn-ghost text-mint" id="btn-save-sequence" style="padding: 0; font-weight: 700;">Xong</button>
        </div>

        <div class="screen-content">
          <p style="margin-top: 4px;">Ghép tối đa 5 nhiệm vụ liên tiếp để đảm bảo 100% không thể ngủ lại.</p>

          <div style="margin-top: 16px; display: flex; flex-direction: column; gap: 8px;">
            <div class="card" style="display: flex; align-items: center; justify-content: space-between; padding: 14px 16px;">
              <div style="display: flex; align-items: center; gap: 10px;">
                <span class="badge badge-mint" style="font-size: 12px; width: 24px; height: 24px; justify-content: center;">1</span>
                <div>
                  <h3 style="font-size: 15px;">🧠 Toán học (3 câu)</h3>
                  <p class="text-small">Đánh thức nhận thức não bộ</p>
                </div>
              </div>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="9" cy="12" r="1"/><circle cx="9" cy="5" r="1"/><circle cx="9" cy="19" r="1"/><circle cx="15" cy="12" r="1"/><circle cx="15" cy="5" r="1"/><circle cx="15" cy="19" r="1"/></svg>
            </div>

            <div class="card" style="display: flex; align-items: center; justify-content: space-between; padding: 14px 16px;">
              <div style="display: flex; align-items: center; gap: 10px;">
                <span class="badge badge-lavender" style="font-size: 12px; width: 24px; height: 24px; justify-content: center;">2</span>
                <div>
                  <h3 style="font-size: 15px;">📱 Lắc máy (30 lần)</h3>
                  <p class="text-small">Khởi động cơ thể và tuần hoàn máu</p>
                </div>
              </div>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="9" cy="12" r="1"/><circle cx="9" cy="5" r="1"/><circle cx="9" cy="19" r="1"/><circle cx="15" cy="12" r="1"/><circle cx="15" cy="5" r="1"/><circle cx="15" cy="19" r="1"/></svg>
            </div>

            <div class="card" style="display: flex; align-items: center; justify-content: space-between; padding: 14px 16px;">
              <div style="display: flex; align-items: center; gap: 10px;">
                <span class="badge badge-peach" style="font-size: 12px; width: 24px; height: 24px; justify-content: center;">3</span>
                <div>
                  <h3 style="font-size: 15px;">📷 Chụp ảnh bồn rửa mặt</h3>
                  <p class="text-small">Rời khỏi phòng ngủ hoàn toàn</p>
                </div>
              </div>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="9" cy="12" r="1"/><circle cx="9" cy="5" r="1"/><circle cx="9" cy="19" r="1"/><circle cx="15" cy="12" r="1"/><circle cx="15" cy="5" r="1"/><circle cx="15" cy="19" r="1"/></svg>
            </div>
          </div>

          <div style="margin-top: 16px;">
            <button class="btn-secondary w-full" id="btn-add-step-sequence" style="border-style: dashed;">
              + Thêm nhiệm vụ tiếp theo
            </button>
          </div>

          <div style="margin-top: 24px;">
            <button class="btn-primary w-full" id="btn-run-multi-sequence">
              ⚡️ Chạy thử chuỗi 3 nhiệm vụ liên tiếp
            </button>
          </div>
        </div>
      </div>
    `;
  }

  // =========================================================================
  // EXECUTION SCREENS FOR ALL 8 MISSIONS
  // =========================================================================

  // 1. Math Execution Screen
  if (current === 'exec_math') {
    const mathState = state.mathExecState || { q1: 47, q2: 38, input: '', questionIndex: 1, total: 3 };
    return `
      <div class="mission-exec-screen">
        <div>
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
            <span class="text-small" style="font-weight: 700; color: var(--accent-mint);">NHIỆM VỤ: TOÁN HỌC</span>
            <span class="text-small tabular-nums">Câu ${mathState.questionIndex} / ${mathState.total}</span>
          </div>
          <div class="mission-progress-bar">
            <div class="mission-progress-fill" style="width: ${(mathState.questionIndex / mathState.total) * 100}%;"></div>
          </div>
        </div>

        <div class="math-question-box" id="math-box">
          <span class="text-xs" style="color: var(--text-secondary);">Hãy giải phép tính dưới đây</span>
          <div class="math-formula tabular-nums" style="margin: 12px 0;">${mathState.q1} + ${mathState.q2} = ?</div>
          <div class="math-input-result tabular-nums" id="math-input-box">
            ${mathState.input || '<span style="opacity: 0.3;">Nhập kết quả</span>'}
          </div>
        </div>

        <div>
          <!-- Keypad -->
          <div class="keypad-grid">
            <button class="keypad-key" data-digit="1">1</button>
            <button class="keypad-key" data-digit="2">2</button>
            <button class="keypad-key" data-digit="3">3</button>
            <button class="keypad-key" data-digit="4">4</button>
            <button class="keypad-key" data-digit="5">5</button>
            <button class="keypad-key" data-digit="6">6</button>
            <button class="keypad-key" data-digit="7">7</button>
            <button class="keypad-key" data-digit="8">8</button>
            <button class="keypad-key" data-digit="9">9</button>
            <button class="keypad-key" data-digit="C" style="color: var(--status-danger);">C</button>
            <button class="keypad-key" data-digit="0">0</button>
            <button class="keypad-key" data-digit="⌫">⌫</button>
          </div>

          <!-- Emergency Exit Button -->
          <button class="btn-ghost" id="btn-trigger-emergency" style="font-size: 12px; margin-top: 14px; color: var(--text-tertiary);">
            Gặp sự cố? Thoát khẩn cấp
          </button>
        </div>
      </div>
    `;
  }

  // 2. Memory Execution Screen
  if (current === 'exec_memory') {
    const memState = state.memoryExecState || { phase: 'recall', round: 1, totalRounds: 2 };
    return `
      <div class="mission-exec-screen">
        <div>
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
            <span class="text-small" style="font-weight: 700; color: var(--accent-lavender);">NHIỆM VỤ: GHI NHỚ LƯỚI</span>
            <span class="text-small">Vòng ${memState.round} / ${memState.totalRounds}</span>
          </div>
          <div class="mission-progress-bar">
            <div class="mission-progress-fill" style="width: 50%; background: var(--accent-lavender);"></div>
          </div>
        </div>

        <div>
          <h2>${memState.phase === 'observe' ? 'Ghi nhớ các ô màu sáng!' : 'Chạm lại các ô vừa sáng'}</h2>
          <p class="text-small" style="margin-top: 4px;">Tìm đủ 3 ô đã ghi nhớ để hoàn thành vòng này.</p>

          <div class="memory-grid-container memory-grid-3x3" id="memory-grid">
            <div class="memory-cell highlighted" data-index="0"></div>
            <div class="memory-cell" data-index="1"></div>
            <div class="memory-cell highlighted" data-index="2"></div>
            <div class="memory-cell" data-index="3"></div>
            <div class="memory-cell" data-index="4"></div>
            <div class="memory-cell highlighted" data-index="5"></div>
            <div class="memory-cell" data-index="6"></div>
            <div class="memory-cell" data-index="7"></div>
            <div class="memory-cell" data-index="8"></div>
          </div>
        </div>

        <div>
          <button class="btn-primary w-full" id="btn-memory-submit" style="background: var(--accent-lavender); color: #0B1220;">
            Xác nhận kết quả
          </button>
          <button class="btn-ghost" id="btn-trigger-emergency" style="font-size: 12px; margin-top: 12px; color: var(--text-tertiary);">
            Gặp sự cố? Thoát khẩn cấp
          </button>
        </div>
      </div>
    `;
  }

  // 3. Shake Execution Screen
  if (current === 'exec_shake') {
    const count = state.shakeCount || 14;
    const target = 30;
    const pct = Math.min(100, Math.round((count / target) * 100));

    return `
      <div class="mission-exec-screen">
        <div>
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
            <span class="text-small" style="font-weight: 700; color: var(--accent-mint);">NHIỆM VỤ: LẮC ĐIỆN THOẠI</span>
            <span class="text-small">${pct}%</span>
          </div>
          <div class="mission-progress-bar">
            <div class="mission-progress-fill" style="width: ${pct}%;"></div>
          </div>
        </div>

        <div>
          <h2>Lắc máy liên tục!</h2>
          <p class="text-small" style="margin-top: 4px;">Cầm chắc điện thoại và lắc đều tay</p>

          <div class="shake-circle-meter" id="shake-circle-box">
            <svg width="220" height="220" viewBox="0 0 220 220">
              <circle cx="110" cy="110" r="90" fill="none" stroke="var(--bg-elevated)" stroke-width="12" />
              <circle cx="110" cy="110" r="90" fill="none" stroke="var(--accent-mint)" stroke-width="12" stroke-dasharray="565.48" stroke-dashoffset="${565.48 - (565.48 * pct) / 100}" stroke-linecap="round" class="progress-ring-circle" />
            </svg>
            <div style="position: absolute; display: flex; flex-direction: column; align-items: center;">
              <span class="shake-count-number tabular-nums" id="shake-number-val">${count}</span>
              <span class="text-xs" style="color: var(--text-secondary); font-weight: 700;">/ ${target} LẦN</span>
            </div>
          </div>
        </div>

        <div>
          <button class="btn-primary w-full" id="btn-simulate-shake">
            📱 Mô phỏng rung lắc (+5 lần)
          </button>
          <button class="btn-ghost" id="btn-trigger-emergency" style="font-size: 12px; margin-top: 12px; color: var(--text-tertiary);">
            Gặp sự cố? Thoát khẩn cấp
          </button>
        </div>
      </div>
    `;
  }

  // 4. Photo Execution Screen
  if (current === 'exec_photo') {
    return `
      <div class="mission-exec-screen">
        <div>
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
            <span class="text-small" style="font-weight: 700; color: var(--accent-mint);">NHIỆM VỤ: CHỤP ẢNH ĐỐI CHIẾU</span>
            <span class="badge badge-mint">Vị trí: Bồn rửa mặt</span>
          </div>
          <div class="mission-progress-bar">
            <div class="mission-progress-fill" style="width: 60%;"></div>
          </div>
        </div>

        <div>
          <div class="viewfinder-frame" id="camera-viewfinder">
            <div class="viewfinder-guide-box">
              <div style="display: flex; flex-direction: column; align-items: center; color: var(--text-secondary);">
                <span style="font-size: 44px;">🚰</span>
                <span class="text-xs" style="margin-top: 8px; color: var(--accent-mint);">Căn chỉnh đúng khung hình</span>
              </div>
            </div>
            <div style="position: absolute; bottom: 12px; left: 16px; right: 16px; background: rgba(0,0,0,0.6); padding: 6px 12px; border-radius: 8px; font-size: 11px; color: #FFF;">
              📷 Camera hoạt động cục bộ • Không lưu vào bộ nhớ máy
            </div>
          </div>
        </div>

        <div>
          <div style="display: flex; gap: 8px; margin-bottom: 8px;">
            <button class="btn-secondary" id="btn-photo-fail" style="flex: 1; font-size: 12px;">Mô phỏng ảnh mờ (42%)</button>
            <button class="btn-primary" id="btn-photo-success" style="flex: 1.5; font-size: 13px;">📸 Chụp ảnh (Khớp 88%)</button>
          </div>
          <button class="btn-ghost" id="btn-trigger-emergency" style="font-size: 12px; color: var(--text-tertiary);">
            Phòng quá tối / Không chụp được? Thoát khẩn cấp
          </button>
        </div>
      </div>
    `;
  }

  // 5. QR / Barcode Execution Screen
  if (current === 'exec_qr') {
    return `
      <div class="mission-exec-screen">
        <div>
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
            <span class="text-small" style="font-weight: 700; color: var(--accent-mint);">NHIỆM VỤ: QUÉT MÃ QR / MÃ VẠCH</span>
            <span class="badge badge-lavender">Mục tiêu: Kem đánh răng</span>
          </div>
          <div class="mission-progress-bar">
            <div class="mission-progress-fill" style="width: 50%;"></div>
          </div>
        </div>

        <div>
          <div class="viewfinder-frame">
            <div class="viewfinder-guide-box" style="border-color: #FF6464;">
              <div class="qr-laser-line"></div>
              <div style="text-align: center; color: var(--text-secondary);">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
                <div class="text-xs" style="margin-top: 6px;">Đưa mã vào giữa vệt laser</div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div style="display: flex; gap: 8px; margin-bottom: 8px;">
            <button class="btn-secondary" id="btn-qr-wrong" style="flex: 1; font-size: 12px; border-color: rgba(255,100,100,0.3);">Quét sai mã</button>
            <button class="btn-primary" id="btn-qr-correct" style="flex: 1.5; font-size: 13px;">✅ Quét đúng mã đã lưu</button>
          </div>
          <button class="btn-ghost" id="btn-trigger-emergency" style="font-size: 12px; color: var(--text-tertiary);">
            Mã bị mờ / Mất mã? Thoát khẩn cấp
          </button>
        </div>
      </div>
    `;
  }

  // 6. Typing Execution Screen
  if (current === 'exec_typing') {
    const targetText = "Mỗi sáng thức dậy là một cơ hội mới để trở thành phiên bản tốt hơn của chính mình.";
    return `
      <div class="mission-exec-screen">
        <div>
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
            <span class="text-small" style="font-weight: 700; color: var(--accent-peach);">NHIỆM VỤ: GÕ DANH NGÔN TÍCH CỰC</span>
            <span class="text-small">Câu 1/1</span>
          </div>
          <div class="mission-progress-bar">
            <div class="mission-progress-fill" style="width: 40%; background: var(--accent-peach);"></div>
          </div>
        </div>

        <div>
          <div class="typing-target-box">
            <span class="text-xs" style="color: var(--accent-peach); font-weight: 700; display: block; margin-bottom: 6px;">GÕ CHÍNH XÁC ĐOẠN VĂN:</span>
            <div id="target-sentence-text" style="color: var(--text-primary); font-weight: 500;">
              ${targetText}
            </div>
          </div>

          <textarea class="typing-input-area" id="typing-user-input" placeholder="Bắt đầu gõ vào đây..." autofocus></textarea>
          <div style="display: flex; justify-content: flex-end; margin-top: 6px;">
            <button class="btn-ghost" id="btn-auto-paste-typing" style="font-size: 12px; color: var(--accent-mint); padding: 0;">⚡️ Điền mẫu tự động</button>
          </div>
        </div>

        <div>
          <button class="btn-primary w-full" id="btn-typing-submit" style="background: var(--accent-peach); color: #0B1220;">
            Kiểm tra & Hoàn thành
          </button>
          <button class="btn-ghost" id="btn-trigger-emergency" style="font-size: 12px; margin-top: 12px; color: var(--text-tertiary);">
            Gặp sự cố bàn phím? Thoát khẩn cấp
          </button>
        </div>
      </div>
    `;
  }

  // 7. Walking Execution Screen
  if (current === 'exec_walking') {
    const steps = state.walkingSteps || 18;
    const targetSteps = 30;
    const pct = Math.min(100, Math.round((steps / targetSteps) * 100));

    return `
      <div class="mission-exec-screen">
        <div>
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
            <span class="text-small" style="font-weight: 700; color: var(--accent-lavender);">NHIỆM VỤ: ĐẾM BƯỚC CHÂN</span>
            <span class="text-small">${pct}%</span>
          </div>
          <div class="mission-progress-bar">
            <div class="mission-progress-fill" style="width: ${pct}%; background: var(--accent-lavender);"></div>
          </div>
        </div>

        <div>
          <h2>Hãy bước đi rời giường!</h2>
          <p class="text-small" style="margin-top: 4px;">Cầm điện thoại và đi bộ ít nhất 30 bước</p>

          <div class="shake-circle-meter">
            <svg width="220" height="220" viewBox="0 0 220 220">
              <circle cx="110" cy="110" r="90" fill="none" stroke="var(--bg-elevated)" stroke-width="12" />
              <circle cx="110" cy="110" r="90" fill="none" stroke="var(--accent-lavender)" stroke-width="12" stroke-dasharray="565.48" stroke-dashoffset="${565.48 - (565.48 * pct) / 100}" stroke-linecap="round" class="progress-ring-circle" />
            </svg>
            <div style="position: absolute; display: flex; flex-direction: column; align-items: center;">
              <span class="shake-count-number tabular-nums" id="walking-steps-val" style="color: var(--accent-lavender);">${steps}</span>
              <span class="text-xs" style="color: var(--text-secondary); font-weight: 700;">/ ${targetSteps} BƯỚC</span>
            </div>
          </div>
        </div>

        <div>
          <button class="btn-primary w-full" id="btn-simulate-step" style="background: var(--accent-lavender); color: #0B1220;">
            👟 Mô phỏng bước đi (+3 bước)
          </button>
          <button class="btn-ghost" id="btn-trigger-emergency" style="font-size: 12px; margin-top: 12px; color: var(--text-tertiary);">
            Không thể đi lại? Thoát khẩn cấp
          </button>
        </div>
      </div>
    `;
  }

  // 8. Squats Execution Screen
  if (current === 'exec_squats') {
    const squats = state.squatsCount || 6;
    const targetSquats = 10;
    const pct = Math.min(100, Math.round((squats / targetSquats) * 100));

    return `
      <div class="mission-exec-screen">
        <div>
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
            <span class="text-small" style="font-weight: 700; color: var(--accent-peach);">NHIỆM VỤ: ĐỘNG TÁC SQUATS</span>
            <span class="text-small">${pct}%</span>
          </div>
          <div class="mission-progress-bar">
            <div class="mission-progress-fill" style="width: ${pct}%; background: var(--accent-peach);"></div>
          </div>
        </div>

        <div>
          <h2>Đứng lên & Ngồi xuống</h2>
          <p class="text-small" style="margin-top: 4px;">Cầm máy trước ngực và hạ người xuống</p>

          <div style="margin: 30px auto; width: 140px; height: 140px; border-radius: 50%; background: var(--bg-elevated); display: flex; align-items: center; justify-content: center; border: 3px solid var(--accent-peach); box-shadow: 0 0 25px rgba(255, 190, 152, 0.25);">
            <div style="text-align: center;">
              <span class="shake-count-number tabular-nums" style="color: var(--accent-peach); font-size: 52px;">${squats}</span>
              <span class="text-xs" style="display: block; font-weight: 700; color: var(--text-secondary);">/ ${targetSquats} REPS</span>
            </div>
          </div>
        </div>

        <div>
          <button class="btn-primary w-full" id="btn-simulate-squat" style="background: var(--accent-peach); color: #0B1220;">
            🏋️ Mô phỏng 1 lần Squat (+1 rep)
          </button>
          <button class="btn-ghost" id="btn-trigger-emergency" style="font-size: 12px; margin-top: 12px; color: var(--text-tertiary);">
            Gặp chấn thương? Thoát khẩn cấp
          </button>
        </div>
      </div>
    `;
  }

  return '';
}
