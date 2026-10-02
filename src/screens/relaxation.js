// Screen Module: F. Relaxation (F1 - F4)

export function renderRelaxation(state) {
  const current = state.currentScreen;
  const relax = state.relaxation;

  const allSounds = [
    { id: 'rain', name: 'Mưa rơi trên lá sen', cat: 'rain', icon: '🌧️', desc: 'Tiếng mưa rơi lộp độp êm đềm trên hồ sen Tây Hồ', duration: 'Vô tận' },
    { id: 'ocean', name: 'Sóng biển đêm Phú Quốc', cat: 'nature', icon: '🌊', desc: 'Từng đợt sóng vỗ rì rào theo nhịp thở thư thái', duration: 'Vô tận' },
    { id: 'stream', name: 'Tiếng suối rừng Ba Vì', cat: 'nature', icon: '🏞️', desc: 'Nước chảy róc rách qua các khe đá rêu phong', duration: 'Vô tận' },
    { id: 'campfire', name: 'Lửa trại Tây Nguyên', cat: 'nature', icon: '🔥', desc: 'Tiếng gỗ reo tí tách ấm cúng trong đêm lạnh', duration: 'Vô tận' },
    { id: 'whitenoise', name: 'Tiếng ồn trắng tĩnh lặng', cat: 'noise', icon: '📻', desc: 'Dải tần số trung hòa loại bỏ mọi tiếng ồn xung quanh', duration: 'Vô tận' }
  ];

  // F1: Relaxation Sound Library Screen
  if (current === 'F1_relax_library') {
    return `
      <div class="screen-viewport">
        <div class="screen-header" style="padding: 16px var(--margin-side) 8px;">
          <div class="screen-title-area">
            <span class="text-xs" style="color: var(--accent-mint); font-weight: 700; text-transform: uppercase;">Ru ngủ sâu</span>
            <h1>Thư giãn</h1>
          </div>
          <button class="btn-icon" id="btn-open-relax-favs" title="Yêu thích">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
          </button>
        </div>

        <div class="screen-content">
          <!-- Search Input -->
          <div style="margin: 6px 0 12px; position: relative;">
            <input type="text" placeholder="Tìm kiếm âm thanh thiên nhiên..." style="width: 100%; height: 42px; background: var(--bg-surface); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 0 14px 0 38px; font-size: 13px; color: var(--text-primary); outline: none;" />
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="position: absolute; left: 12px; top: 12px; color: var(--text-tertiary);"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          </div>

          <!-- Category Filter Pills -->
          <div class="nap-chips-row" style="margin-bottom: 12px;">
            <button class="nap-chip" style="background: var(--accent-mint); color: #0B1220; font-weight: 700;">Tất cả</button>
            <button class="nap-chip">🌧️ Mưa & Nước</button>
            <button class="nap-chip">🌲 Thiên nhiên</button>
            <button class="nap-chip">📻 Tiếng ồn trắng</button>
            <button class="nap-chip">🧘 Thiền định</button>
          </div>

          <!-- Sounds List -->
          <div style="display: flex; flex-direction: column; gap: 8px; margin-bottom: 24px;">
            ${allSounds.map(s => {
              const isFav = relax.favorites.includes(s.id);
              const isCurrentPlaying = relax.activeSound === s.id && relax.isPlaying;

              return `
                <div class="card card-clickable sound-relax-card" data-sound-id="${s.id}" style="display: flex; align-items: center; justify-content: space-between; border-color: ${isCurrentPlaying ? 'var(--accent-mint)' : 'var(--border-subtle)'};">
                  <div style="display: flex; align-items: center; gap: 14px;">
                    <div style="width: 44px; height: 44px; border-radius: var(--radius-md); background: var(--bg-elevated); display: flex; align-items: center; justify-content: center; font-size: 22px;">
                      ${s.icon}
                    </div>
                    <div>
                      <h3 style="font-size: 15px; color: ${isCurrentPlaying ? 'var(--accent-mint)' : 'var(--text-primary)'};">${s.name}</h3>
                      <p class="text-small" style="margin-top: 2px;">${s.desc}</p>
                    </div>
                  </div>

                  <div style="display: flex; align-items: center; gap: 8px;">
                    <button class="btn-icon btn-toggle-fav" data-sound-id="${s.id}" style="width: 36px; height: 36px; background: transparent; color: ${isFav ? 'var(--accent-peach)' : 'var(--text-tertiary)'};" title="Yêu thích">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="${isFav ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
                    </button>
                    <button class="btn-icon btn-play-ambient" data-sound-id="${s.id}" style="width: 40px; height: 40px; background: ${isCurrentPlaying ? 'var(--accent-mint)' : 'var(--bg-elevated)'}; color: ${isCurrentPlaying ? '#0B1220' : 'var(--text-primary)'};" title="${isCurrentPlaying ? 'Tạm dừng' : 'Phát'}">
                      ${isCurrentPlaying ? `
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>
                      ` : `
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                      `}
                    </button>
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </div>
      </div>
    `;
  }

  // F2: Full Player Screen
  if (current === 'F2_player') {
    const soundData = allSounds.find(s => s.id === relax.activeSound) || allSounds[0];

    return `
      <div class="screen-viewport" style="background: radial-gradient(circle at 50% 30%, #152233 0%, #0B1220 100%);">
        <div class="screen-header" style="padding: 16px var(--margin-side) 8px;">
          <button class="btn-ghost" id="btn-back-to-relax" style="padding: 0;">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="m6 9 6 6 6-6"/></svg>
          </button>
          <span class="text-xs" style="font-weight: 700; text-transform: uppercase; color: var(--accent-mint);">Đang phát ru ngủ</span>
          <button class="btn-ghost" id="btn-open-relax-timer" style="padding: 0; color: var(--accent-mint); font-weight: 700;">
            ⏱️ ${relax.timerMinutes}p
          </button>
        </div>

        <div class="screen-content" style="justify-content: space-between; text-align: center; padding: 20px var(--margin-side) 32px;">
          <!-- Artwork Ripple Circle -->
          <div>
            <div class="relax-player-artwork">
              <span style="font-size: 72px;">${soundData.icon}</span>
            </div>
            <h2 style="font-size: 22px; margin-top: 16px;">${soundData.name}</h2>
            <p class="text-small" style="margin-top: 4px;">${soundData.desc}</p>
          </div>

          <!-- Volume Slider -->
          <div class="card" style="margin: 20px 0; background: rgba(255,255,255,0.04);">
            <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
              <span class="text-xs" style="color: var(--text-secondary);">Âm lượng ru ngủ</span>
              <span class="text-xs tabular-nums" style="color: var(--accent-mint); font-weight: 700;">70%</span>
            </div>
            <div class="slider-container">
              <input type="range" class="slider-input" min="0.1" max="1" step="0.05" value="0.7" />
            </div>
          </div>

          <!-- Main Controls -->
          <div>
            <div style="display: flex; align-items: center; justify-content: center; gap: 24px;">
              <button class="btn-icon" id="btn-open-relax-timer" style="width: 50px; height: 50px;" title="Hẹn giờ">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              </button>

              <button class="btn-icon" id="btn-player-play-pause" style="width: 72px; height: 72px; background: var(--accent-mint); color: #0B1220; box-shadow: var(--shadow-mint);" title="Phát/Tạm dừng">
                ${relax.isPlaying ? `
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>
                ` : `
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                `}
              </button>

              <button class="btn-icon" id="btn-player-fav" style="width: 50px; height: 50px;" title="Yêu thích">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
              </button>
            </div>
            <p class="text-xs" style="color: var(--text-tertiary); margin-top: 14px;">Tự động tắt êm dịu sau ${relax.timerMinutes} phút</p>
          </div>
        </div>
      </div>
    `;
  }

  // F3: Sleep Timer Presets Screen
  if (current === 'F3_timer') {
    return `
      <div class="screen-viewport">
        <div class="screen-header" style="padding: 16px var(--margin-side) 8px;">
          <button class="btn-ghost" id="btn-back-to-player" style="padding: 0;">Quay lại</button>
          <h2 style="font-size: 17px;">Hẹn giờ tắt âm</h2>
          <button class="btn-ghost text-mint" id="btn-confirm-timer" style="padding: 0; font-weight: 700;">Lưu</button>
        </div>

        <div class="screen-content">
          <p style="margin-top: 4px;">Âm thanh sẽ tự động dừng sau khi bạn đã chìm vào giấc ngủ.</p>

          <span class="text-xs" style="font-weight: 700; color: var(--text-tertiary); text-transform: uppercase; margin-top: 16px; display: block;">Thời lượng hẹn giờ</span>
          <div class="segmented-control" style="margin: 8px 0 16px;">
            <div class="segment-item">15p</div>
            <div class="segment-item active">30p</div>
            <div class="segment-item">45p</div>
            <div class="segment-item">60p</div>
            <div class="segment-item">90p</div>
          </div>

          <div class="card" style="display: flex; align-items: center; justify-content: space-between; margin-top: 12px;">
            <div>
              <h3 style="font-size: 15px;">Lớn dần tắt êm (Fade-out 5 phút)</h3>
              <p class="text-small">Giảm dần âm lượng trước khi tắt hẳn để không đánh thức bạn</p>
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

  // F4: Favorites Empty & List Screen
  if (current === 'F4_favorites') {
    const favSounds = allSounds.filter(s => relax.favorites.includes(s.id));
    const hasFavs = favSounds.length > 0;

    return `
      <div class="screen-viewport">
        <div class="screen-header" style="padding: 16px var(--margin-side) 8px;">
          <button class="btn-ghost" id="btn-back-to-relax" style="padding: 0;">Quay lại</button>
          <h2 style="font-size: 17px;">Âm thanh yêu thích</h2>
          <div style="width: 40px;"></div>
        </div>

        <div class="screen-content">
          ${hasFavs ? `
            <div style="display: flex; flex-direction: column; gap: 8px; margin-top: 12px;">
              ${favSounds.map(s => `
                <div class="card sound-relax-card" style="display: flex; align-items: center; justify-content: space-between;">
                  <div style="display: flex; align-items: center; gap: 12px;">
                    <span style="font-size: 26px;">${s.icon}</span>
                    <div>
                      <h3 style="font-size: 15px;">${s.name}</h3>
                      <p class="text-small">${s.desc}</p>
                    </div>
                  </div>
                  <button class="btn-icon btn-play-ambient" data-sound-id="${s.id}">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                  </button>
                </div>
              `).join('')}
            </div>
          ` : `
            <div class="card" style="text-align: center; padding: 40px 20px; margin-top: 30px;">
              <span style="font-size: 40px;">🤍</span>
              <h3 style="margin-top: 12px; font-size: 16px;">Chưa có âm thanh yêu thích</h3>
              <p class="text-small" style="margin-top: 4px;">Chạm vào biểu tượng trái tim ở bất kỳ âm thanh nào để lưu lại danh sách riêng.</p>
              <button class="btn-secondary" id="btn-back-to-relax" style="margin-top: 16px; min-height: 40px; font-size: 13px;">Khám phá kho âm thanh</button>
            </div>
          `}
        </div>
      </div>
    `;
  }

  return '';
}
