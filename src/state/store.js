// Application State Store for ZakiAlarm

class AppStore {
  constructor() {
    this.listeners = new Set();
    this.state = {
      theme: 'dark', // 'dark' | 'light'
      viewMode: 'frame', // 'frame' | 'fullscreen'
      textScale: 'normal', // 'normal' | 'large'
      currentTab: 'alarms', // 'alarms' | 'sleep' | 'relax' | 'profile'
      currentScreen: 'B1_home', // Screen ID e.g. A1_splash, B1_home, exec_math, etc.
      screenHistory: ['B1_home'],

      // Guided flow tracking
      activeFlow: null, // e.g. { id: 1, step: 1, title: '...' }

      // Alarms List (100% Free & Unlocked)
      alarms: [
        {
          id: 'alarm_1',
          time: '06:30',
          period: 'SA',
          label: 'Thức dậy ngày mới',
          enabled: true,
          days: ['T2', 'T3', 'T4', 'T5', 'T6'],
          sound: 'Bình minh dịu êm',
          volume: 0.85,
          vibrate: true,
          snoozeEnabled: true,
          snoozeDuration: 10,
          snoozeMax: 3,
          snoozeRemaining: 3,
          missions: ['math', 'photo'],
          wakeupCheck: true,
          preventEarlyEdit: true,
          boostSound: true
        },
        {
          id: 'alarm_2',
          time: '07:15',
          period: 'SA',
          label: 'Cuối tuần năng động',
          enabled: true,
          days: ['T7', 'CN'],
          sound: 'Chim hót sớm mai',
          volume: 0.75,
          vibrate: true,
          snoozeEnabled: true,
          snoozeDuration: 10,
          snoozeMax: 2,
          snoozeRemaining: 2,
          missions: ['walking', 'squats'],
          wakeupCheck: false,
          preventEarlyEdit: false,
          boostSound: false
        },
        {
          id: 'alarm_3',
          time: '12:45',
          period: 'CH',
          label: 'Báo thức ngủ trưa ngắn',
          enabled: false,
          days: [],
          sound: 'Bình minh dịu êm',
          volume: 0.65,
          vibrate: true,
          snoozeEnabled: false,
          snoozeDuration: 5,
          snoozeMax: 1,
          snoozeRemaining: 1,
          missions: ['shake'],
          wakeupCheck: false,
          preventEarlyEdit: false,
          boostSound: false
        }
      ],

      // Editing Alarm Draft
      editingAlarm: null,

      // Active Ringing Alarm
      ringingAlarm: null,
      snoozeCountdown: 600, // 10 minutes in seconds

      // Mission execution state
      currentMissionSequence: [],
      currentMissionStep: 0,
      currentMissionProgress: 0,

      // Permissions Checklist
      permissions: {
        notifications: 'granted',
        camera: 'granted',
        microphone: 'granted',
        motion: 'granted'
      },

      // Sleep Tracking State
      sleepState: {
        isTracking: false,
        trackingStartTime: null,
        elapsedSeconds: 0,
        snoreRecordToggle: true,
        ambientInSleep: false
      },

      // Latest Sleep Report Data
      latestSleepReport: {
        score: 88,
        ratingText: 'Giấc ngủ phục hồi xuất sắc',
        durationHours: 7,
        durationMinutes: 42,
        bedtime: '23:14',
        wakeTime: '06:56',
        latencyMinutes: 14,
        efficiencyPercent: 94,
        deepSleepMinutes: 112,
        lightSleepMinutes: 248,
        remSleepMinutes: 92,
        awakeMinutes: 10,
        snoreEventsCount: 3,
        snoreTotalDuration: '4 phút 12 giây',
        heartRateAvg: 62
      },

      // Snore Clips (100% Free & Accessible)
      snoreClips: [
        {
          id: 'snore_1',
          time: '02:14 sáng',
          duration: '18 giây',
          intensity: 'Ngáy nhẹ (45 dB)',
          isPlaying: false
        },
        {
          id: 'snore_2',
          time: '03:45 sáng',
          duration: '24 giây',
          intensity: 'Ngáy vừa (58 dB)',
          isPlaying: false
        },
        {
          id: 'snore_3',
          time: '05:12 sáng',
          duration: '12 giây',
          intensity: 'Tiếng thở dồn (42 dB)',
          isPlaying: false
        }
      ],

      // Relaxation State
      relaxation: {
        activeSound: null, // 'rain' | 'ocean' | 'stream' | 'campfire' | 'whitenoise'
        isPlaying: false,
        timerMinutes: 30,
        fadeoutEnabled: true,
        favorites: ['rain', 'ocean']
      },

      // Toast feedback
      toast: null, // { message: '...', actionLabel: '...', onAction: fn }

      // Wake-up check safety timer
      wakeupCheckTimerSeconds: 180, // 3 minutes to confirm
      hasWakeupCheckActive: false
    };
  }

  getState() {
    return this.state;
  }

  subscribe(listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  notify() {
    this.listeners.forEach(fn => fn(this.state));
  }

  setState(partial) {
    this.state = { ...this.state, ...partial };
    this.notify();
  }

  navigate(screenId, addToHistory = true) {
    if (addToHistory && this.state.currentScreen !== screenId) {
      this.state.screenHistory.push(this.state.currentScreen);
    }
    this.state.currentScreen = screenId;
    this.notify();
  }

  goBack() {
    if (this.state.screenHistory.length > 0) {
      const prev = this.state.screenHistory.pop();
      this.state.currentScreen = prev;
      this.notify();
    } else {
      this.navigate('B1_home', false);
    }
  }

  setTab(tab) {
    this.state.currentTab = tab;
    // Map tab to screen
    if (tab === 'alarms') this.navigate('B1_home');
    if (tab === 'sleep') this.navigate('E1_sleep_overview');
    if (tab === 'relax') this.navigate('F1_relax_library');
    if (tab === 'profile') this.navigate('G1_profile');
  }

  setTheme(theme) {
    this.state.theme = theme;
    document.body.classList.remove('theme-dark', 'theme-light');
    document.body.classList.add(`theme-${theme}`);
    this.notify();
  }

  setViewMode(mode) {
    this.state.viewMode = mode;
    this.notify();
  }

  showToast(message, actionLabel = null, onAction = null) {
    this.state.toast = { message, actionLabel, onAction };
    this.notify();
    if (!actionLabel) {
      setTimeout(() => {
        if (this.state.toast && this.state.toast.message === message) {
          this.state.toast = null;
          this.notify();
        }
      }, 3500);
    }
  }

  dismissToast() {
    this.state.toast = null;
    this.notify();
  }

  // Toggle alarm enable state
  toggleAlarm(alarmId) {
    const alarm = this.state.alarms.find(a => a.id === alarmId);
    if (alarm) {
      alarm.enabled = !alarm.enabled;
      this.notify();
    }
  }

  // Delete alarm with undo
  deleteAlarm(alarmId) {
    const idx = this.state.alarms.findIndex(a => a.id === alarmId);
    if (idx !== -1) {
      const deleted = this.state.alarms[idx];
      this.state.alarms.splice(idx, 1);
      this.showToast(`Đã xóa "${deleted.label}"`, 'Hoàn tác', () => {
        this.state.alarms.splice(idx, 0, deleted);
        this.dismissToast();
        this.notify();
      });
      this.notify();
    }
  }

  // Duplicate alarm
  duplicateAlarm(alarmId) {
    const orig = this.state.alarms.find(a => a.id === alarmId);
    if (orig) {
      const copy = {
        ...orig,
        id: 'alarm_' + Date.now(),
        label: `${orig.label} (Bản sao)`
      };
      this.state.alarms.push(copy);
      this.showToast(`Đã nhân bản "${orig.label}"`);
      this.notify();
    }
  }
}

export const store = new AppStore();
