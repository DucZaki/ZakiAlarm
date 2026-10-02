// Bottom Navigation Tabs Component

export function renderBottomNav(state) {
  const hiddenScreens = [
    'A1_splash', 'A2_welcome', 'A3_slides', 'A4_setup', 'A5_permissions',
    'B9_nap_countdown', 'D1_ringing', 'D2_snoozing', 'D3_mission_completed', 'D4_wakeup_check', 'D5_emergency_exit',
    'exec_math', 'exec_memory', 'exec_shake', 'exec_photo', 'exec_qr', 'exec_typing', 'exec_walking', 'exec_squats',
    'E4_active_session'
  ];

  const isHidden = hiddenScreens.includes(state.currentScreen) || state.sleepState.isTracking;

  if (isHidden) {
    return `<div class="bottom-nav hidden"></div>`;
  }

  const tabs = [
    {
      id: 'alarms',
      label: 'Báo thức',
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="12" cy="13" r="8"/><path d="M12 9v4l2 2"/><path d="M5 3 2 6"/><path d="m22 6-3-3"/><path d="M6.38 18.7 4 21"/><path d="M17.64 18.67 20 21"/></svg>`
    },
    {
      id: 'sleep',
      label: 'Giấc ngủ',
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>`
    },
    {
      id: 'relax',
      label: 'Thư giãn',
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>`
    },
    {
      id: 'profile',
      label: 'Cá nhân',
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="12" cy="8" r="5"/><path d="M20 21a8 8 0 0 0-16 0"/></svg>`
    }
  ];

  return `
    <nav class="bottom-nav" aria-label="Điều hướng chính">
      ${tabs.map(tab => `
        <button class="nav-tab-item ${state.currentTab === tab.id ? 'active' : ''}" data-tab="${tab.id}" aria-label="${tab.label}">
          ${tab.icon}
          <span>${tab.label}</span>
        </button>
      `).join('')}
    </nav>
  `;
}
