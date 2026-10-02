// Top Status Bar with Dynamic Island

export function renderStatusBar(store) {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');

  return `
    <div class="status-bar">
      <div class="status-bar-time tabular-nums">${hours}:${minutes}</div>
      <div class="status-bar-island" title="Dynamic Island - ZakiAlarm">
        <div class="island-camera"></div>
        <div class="island-sensor"></div>
      </div>
      <div class="status-bar-icons">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M12 20h.01"/><path d="M2 8.82a15 15 0 0 1 20 0"/><path d="M5 12.86a10 10 0 0 1 14 0"/><path d="M8.5 16.43a5 5 0 0 1 7 0"/></svg>
        <span style="font-size: 11px; font-weight: 700; margin-left: 2px;">5G</span>
        <svg width="20" height="12" viewBox="0 0 24 14" fill="none" stroke="currentColor" stroke-width="2"><rect x="1" y="1" width="19" height="12" rx="3.5"/><path d="M22 5v4" stroke-linecap="round"/><rect x="3" y="3" width="15" height="8" rx="2" fill="currentColor"/></svg>
      </div>
    </div>
  `;
}
