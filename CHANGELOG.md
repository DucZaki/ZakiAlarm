# Changelog

All notable changes to ZakiAlarm are documented in this file.

## [0.1.0] - 2026-10-24

### Added

- Alarm management: create, edit, delete, duplicate and enable/disable
  alarms with a 24-hour picker, repeat days, one-off alarms and
  skip-next-occurrence.
- Wake-up flow with configured snooze limits, ordered missions (math,
  memory, exact-phrase typing, shake, QR/barcode, walk, squats and
  reference photo) and a five-minute wake-up check.
- Sound picker with synthesized alarms and melodies, bundled CC0 loops,
  local music imports through IndexedDB, search, categories and preview.
- Sleep journal with bed/wake targets, session history and a seven-day
  average display.
- Relaxation screen with five Web Audio ambient sounds and a timed stop.
- Settings with dark/light theme, three text scales, an alarm readiness
  test, data export and deliberate local-data deletion.
- `countdownText` domain helper describing the wait until the next alarm.

### Notes

- ZakiAlarm runs entirely in the browser. An ordinary webpage cannot
  guarantee an alarm while its tab is closed or the device is asleep; keep
  the page open with the device awake when relying on it.
