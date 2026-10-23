# ZakiAlarm architecture

ZakiAlarm is a Vite + vanilla JavaScript single-page app. There is no backend
and no account system: all state lives in the browser.

## Layers

| Layer | Location | Responsibility |
|---|---|---|
| Domain | `src/domain/alarm.js` | Pure scheduling and validation logic: next occurrence, next alarm, text normalization and HTML escaping. No DOM access, fully unit-tested. |
| State | `src/state/` | The app store plus persistence to local storage / IndexedDB, including restore rules (an active snooze or wake-up check resumes from its stored deadline after a refresh). |
| Audio | `src/audio/` | Sound catalog and library, the Web Audio sound engine, bundled CC0 loops and microphone recording for explicit sleep samples. |
| UI | `src/components/`, `src/screens/` | Header, bottom navigation, toasts and the screens: alarms, wake flow, missions, sleep, relaxation, onboarding and settings. |
| Runtime | `src/main.js`, `src/runtime.js` | App bootstrap and the clock-based alarm trigger loop while the page is active. |

## Data flow

1. Screens read and update state through the store in `src/state/store.js`.
2. The store persists durable state through `src/state/persistence.js`.
3. The runtime asks the domain layer for the next alarm occurrence and starts
   the wake flow (ringing, snooze, missions, wake-up check) when it is due.

## Testing

`npm test` runs the Node test suites in `tests/`: domain scheduling across
midnight and day boundaries, validation, persistence restore rules, screen
routes and empty-state rendering.

## Browser limits

A webpage cannot guarantee an alarm while its tab is closed, the device is
asleep, audio is blocked or the browser throttles timers. Reliable
locked-device alarms would require a native iOS/Android app with OS alarm
and background-execution APIs.
