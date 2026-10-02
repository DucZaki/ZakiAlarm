export const DAYS = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];
export const escapeHTML = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
export const normalizeText = text => text.normalize('NFC').trim().replace(/\s+/g, ' ');
export const duration = seconds => { const n = Math.max(0, Math.floor(seconds)); return `${String(Math.floor(n / 60)).padStart(2, '0')}:${String(n % 60).padStart(2, '0')}`; };
export function newAlarm() {
  return {id: crypto.randomUUID(), time:'06:30', period:'SA', label:'Thức dậy ngày mới', enabled:true, days:['T2','T3','T4','T5','T6'], soundId:'gentle', sound:'Bình minh dịu êm', volume:0.8, vibrate:true, snoozeEnabled:true, snoozeDuration:10, snoozeMax:3, missions:['math'], missionSettings:{}, wakeupCheck:false, boostSound:false, speak:false};
}
export function nextOccurrence(alarm, after = Date.now()) {
  if (!alarm.enabled) return null;
  if (alarm.onceAt) return alarm.onceAt > after && alarm.onceAt !== alarm.skipAt ? alarm.onceAt : null;
  if (!/^([01]\d|2[0-3]):[0-5]\d$/.test(alarm.time)) return null;
  const [hours, minutes] = alarm.time.split(':').map(Number);
  for (let day = 0; day < 15; day++) {
    const date = new Date(after); date.setDate(date.getDate() + day); date.setHours(hours, minutes, 0, 0);
    if (date.getTime() <= after || date.getTime() === alarm.skipAt) continue;
    if (!alarm.days.length || alarm.days.includes(DAYS[date.getDay()])) return date.getTime();
  }
  return null;
}
export function nextAlarm(alarms, now = Date.now()) {
  return alarms.map(alarm => ({alarm, at:nextOccurrence(alarm, now)})).filter(x => x.at).sort((a,b) => a.at-b.at)[0] || null;
}
export function validateAlarm(alarm) {
  if (!/^([01]\d|2[0-3]):[0-5]\d$/.test(alarm.time)) return 'Chọn giờ hợp lệ từ 00:00 đến 23:59.';
  if (!alarm.label.trim()) return 'Nhập tên báo thức.';
  if (alarm.volume < 0.05 || alarm.volume > 1) return 'Âm lượng báo thức phải từ 5% đến 100%.';
  return null;
}
export function memoryMatches(target, selected) {
  return target.length === selected.length && target.every(n => selected.includes(n));
}
