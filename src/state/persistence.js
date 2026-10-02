export const STORAGE_KEY = 'zakialarm:v1';
const keys = ['alarms','theme','viewMode','textScale','sleepState','sleepHistory','sleepSchedule','relaxation','customSounds','recordings','quickNap','activeAlarmSession','onboardingDone'];
export function durableState(state) {
  return Object.fromEntries(keys.filter(k => state[k] !== undefined).map(k => [k, k === 'relaxation' ? {...state[k], isPlaying:false, deadline:null} : state[k]]));
}
export function restoreState(defaults, storage = globalThis.localStorage) {
  try {
    const data = JSON.parse(storage.getItem(STORAGE_KEY));
    if (!data || data.version !== 1 || !data.state || !Array.isArray(data.state.alarms)) return defaults;
    const saved = data.state;
    if (saved.alarms.some(a => !a || typeof a.id !== 'string' || typeof a.time !== 'string' || typeof a.label !== 'string' || !Array.isArray(a.days) || !Array.isArray(a.missions))) return defaults;
    const result = {...defaults, ...durableState(saved)};
    // Earlier versions inserted quick naps as ordinary alarm cards. Migrate the
    // last still-running timer, then remove every legacy quick-nap alarm.
    const legacyNaps = saved.alarms.filter(a => Number.isFinite(a.onceAt) && a.days.length === 0 && a.missions.length === 0 && /^Chợp mắt \d+ phút$/.test(a.label));
    result.alarms = saved.alarms.filter(a => !legacyNaps.includes(a));
    const lastNap = legacyNaps.at(-1);
    result.quickNap = saved.quickNap || (lastNap?.onceAt > Date.now() ? {minutes:Number(lastNap.label.match(/\d+/)[0]), deadline:lastNap.onceAt} : null);
    if (result.quickNap && (!Number.isFinite(result.quickNap.deadline) || Date.now() - result.quickNap.deadline > 300000)) result.quickNap = null;
    result.relaxation = {...defaults.relaxation, ...saved.relaxation, isPlaying:false, deadline:null};
    result.theme = ['dark','light'].includes(result.theme) ? result.theme : 'dark';
    result.sleepHistory = Array.isArray(saved.sleepHistory) ? saved.sleepHistory : [];
    result.customSounds = Array.isArray(saved.customSounds) ? saved.customSounds : [];
    result.recordings = Array.isArray(saved.recordings) ? saved.recordings : [];
    return result;
  } catch { return defaults; }
}
export function persistState(state, storage = globalThis.localStorage) {
  try { storage.setItem(STORAGE_KEY, JSON.stringify({version:1,state:durableState(state)})); return true; } catch { return false; }
}
