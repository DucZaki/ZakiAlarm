import './style.css';
import confetti from 'canvas-confetti';
import { store } from './state/store.js';
import { sound } from './audio/soundEngine.js';
import { renderStatusBar } from './components/header.js';
import { renderBottomNav } from './components/bottomNav.js';
import { renderToast } from './components/toast.js';
import { renderPrototypeToolbar } from './components/prototypeToolbar.js';

import { renderOnboarding } from './screens/onboarding.js';
import { renderAlarms } from './screens/alarms.js';
import { renderMissions } from './screens/missions.js';
import { renderWakeflow } from './screens/wakeflow.js';
import { renderSleep } from './screens/sleep.js';
import { renderRelaxation } from './screens/relaxation.js';
import { renderSettings } from './screens/settings.js';

const appEl = document.querySelector('#app');

// Master Render Function
function render() {
  const state = store.getState();

  // Screen router logic
  let screenHtml = '';
  const current = state.currentScreen;

  if (current.startsWith('A')) {
    screenHtml = renderOnboarding(state);
  } else if (current.startsWith('B')) {
    screenHtml = renderAlarms(state);
  } else if (current.startsWith('C') || current.startsWith('exec_')) {
    screenHtml = renderMissions(state);
  } else if (current.startsWith('D')) {
    screenHtml = renderWakeflow(state);
  } else if (current.startsWith('E')) {
    screenHtml = renderSleep(state);
  } else if (current.startsWith('F')) {
    screenHtml = renderRelaxation(state);
  } else if (current.startsWith('G')) {
    screenHtml = renderSettings(state);
  } else {
    screenHtml = renderAlarms(state);
  }

  appEl.innerHTML = `
    <!-- Top Prototype Toolbar -->
    ${renderPrototypeToolbar(state)}

    <!-- Main Canvas -->
    <main class="device-canvas">
      <div class="device-container ${state.viewMode === 'fullscreen' ? 'mode-fullscreen' : ''}">
        <!-- Status Bar -->
        ${renderStatusBar(state)}

        <!-- Active Screen Viewport -->
        ${screenHtml}

        <!-- Bottom Navigation -->
        ${renderBottomNav(state)}

        <!-- Toast Notification -->
        ${renderToast(state)}

        <!-- iOS Home Indicator -->
        <div class="home-indicator-bar"></div>
      </div>
    </main>
  `;

  attachEventListeners(state);
}

// Event Listeners Binder
function attachEventListeners(state) {
  // 1. Prototype Toolbar Actions
  const flowSelect = document.querySelector('#prototype-flow-select');
  if (flowSelect) {
    flowSelect.addEventListener('change', (e) => {
      const flowId = parseInt(e.target.value, 10);
      if (flowId) runPrototypeFlow(flowId);
    });
  }

  const screenSelect = document.querySelector('#prototype-screen-select');
  if (screenSelect) {
    screenSelect.addEventListener('change', (e) => {
      if (e.target.value) {
        sound.playTap();
        sound.stopAll();
        store.navigate(e.target.value);
      }
    });
  }

  const themeBtn = document.querySelector('#toggle-theme-btn');
  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      sound.playTap();
      store.setTheme(state.theme === 'dark' ? 'light' : 'dark');
    });
  }

  const viewModeBtn = document.querySelector('#toggle-viewmode-btn');
  if (viewModeBtn) {
    viewModeBtn.addEventListener('click', () => {
      sound.playTap();
      store.setViewMode(state.viewMode === 'frame' ? 'fullscreen' : 'frame');
    });
  }

  const stopAudioBtn = document.querySelector('#stop-all-audio-btn');
  if (stopAudioBtn) {
    stopAudioBtn.addEventListener('click', () => {
      sound.stopAll();
      store.showToast('Đã dừng toàn bộ âm thanh.');
    });
  }

  // 2. Bottom Navigation Tabs
  document.querySelectorAll('.nav-tab-item').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const tab = e.currentTarget.dataset.tab;
      sound.playTap();
      sound.stopAll();
      store.setTab(tab);
    });
  });

  // 3. Toast Action
  const toastAction = document.querySelector('#toast-action');
  if (toastAction && state.toast && state.toast.onAction) {
    toastAction.addEventListener('click', () => {
      sound.playTap();
      state.toast.onAction();
    });
  }

  // 4. Onboarding Interactions
  const btnSplashStart = document.querySelector('#btn-splash-start');
  if (btnSplashStart) {
    btnSplashStart.addEventListener('click', () => {
      sound.playTap();
      store.navigate('A2_welcome');
    });
  }

  const btnWelcomeNext = document.querySelector('#btn-welcome-next');
  if (btnWelcomeNext) {
    btnWelcomeNext.addEventListener('click', () => {
      sound.playTap();
      store.setState({ onboardingSlide: 0 });
      store.navigate('A3_slides');
    });
  }

  const btnWelcomeSkip = document.querySelector('#btn-welcome-skip');
  if (btnWelcomeSkip) {
    btnWelcomeSkip.addEventListener('click', () => {
      sound.playTap();
      store.navigate('B1_home');
    });
  }

  const btnSlidesNext = document.querySelector('#btn-slides-next');
  if (btnSlidesNext) {
    btnSlidesNext.addEventListener('click', () => {
      sound.playTap();
      const nextIdx = (state.onboardingSlide || 0) + 1;
      if (nextIdx > 2) {
        store.navigate('A4_setup');
      } else {
        store.setState({ onboardingSlide: nextIdx });
      }
    });
  }

  const btnSlidesSkip = document.querySelector('#btn-slides-skip');
  if (btnSlidesSkip) {
    btnSlidesSkip.addEventListener('click', () => {
      sound.playTap();
      store.navigate('A4_setup');
    });
  }

  const btnSetupNext = document.querySelector('#btn-setup-next');
  if (btnSetupNext) {
    btnSetupNext.addEventListener('click', () => {
      sound.playTap();
      store.navigate('A5_permissions');
    });
  }

  const btnPermsFinish = document.querySelector('#btn-permissions-finish');
  if (btnPermsFinish) {
    btnPermsFinish.addEventListener('click', () => {
      sound.playSuccess();
      store.showToast('Thiết lập hoàn tất! Chào mừng đến với ZakiAlarm.');
      store.navigate('B1_home');
    });
  }

  // 5. Alarm Management Interactions
  const btnAddAlarm = document.querySelector('#btn-add-alarm');
  if (btnAddAlarm) {
    btnAddAlarm.addEventListener('click', () => {
      sound.playTap();
      store.setState({ editingAlarm: null });
      store.navigate('B2_create_edit');
    });
  }

  const btnQuickAlarmModal = document.querySelector('#btn-quick-alarm-modal');
  if (btnQuickAlarmModal) {
    btnQuickAlarmModal.addEventListener('click', () => {
      sound.playTap();
      store.navigate('B6_quick_alarm');
    });
  }

  document.querySelectorAll('.nap-chip').forEach(chip => {
    chip.addEventListener('click', (e) => {
      const mins = e.currentTarget.dataset.quickMinutes;
      if (mins) {
        sound.playSuccess();
        store.showToast(`Đã hẹn giờ chợp mắt ${mins} phút!`);
      }
    });
  });

  document.querySelectorAll('.alarm-toggle').forEach(t => {
    t.addEventListener('change', (e) => {
      const id = e.currentTarget.dataset.alarmId;
      sound.playTap();
      store.toggleAlarm(id);
    });
  });

  document.querySelectorAll('.alarm-card-clickable-area').forEach(card => {
    card.addEventListener('click', (e) => {
      const parent = e.currentTarget.closest('.alarm-card');
      const id = parent.dataset.alarmId;
      const target = store.getState().alarms.find(a => a.id === id);
      sound.playTap();
      store.setState({ editingAlarm: { ...target } });
      store.navigate('B2_create_edit');
    });
  });

  document.querySelectorAll('[data-action="alarm-menu"]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const id = e.currentTarget.dataset.alarmId;
      const target = store.getState().alarms.find(a => a.id === id);
      sound.playTap();
      store.setState({ selectedAlarmForAction: target });
      store.navigate('B7_actions');
    });
  });

  // Alarm Edit Interactions
  const btnCancelEdit = document.querySelector('#btn-cancel-edit');
  if (btnCancelEdit) {
    btnCancelEdit.addEventListener('click', () => {
      sound.playTap();
      store.navigate('B1_home');
    });
  }

  const btnSaveAlarm = document.querySelector('#btn-save-alarm');
  if (btnSaveAlarm) {
    btnSaveAlarm.addEventListener('click', () => {
      sound.playSuccess();
      store.showToast('Đã lưu báo thức thành công!');
      store.navigate('B1_home');
    });
  }

  const rowRepeat = document.querySelector('#row-repeat-schedule');
  if (rowRepeat) {
    rowRepeat.addEventListener('click', () => {
      sound.playTap();
      store.navigate('B3_repeat');
    });
  }

  const rowMissions = document.querySelector('#row-select-missions');
  if (rowMissions) {
    rowMissions.addEventListener('click', () => {
      sound.playTap();
      store.navigate('C1_mission_library');
    });
  }

  const rowSound = document.querySelector('#row-select-sound');
  if (rowSound) {
    rowSound.addEventListener('click', () => {
      sound.playTap();
      store.navigate('B4_sound_picker');
    });
  }

  const rowSnooze = document.querySelector('#row-select-snooze');
  if (rowSnooze) {
    rowSnooze.addEventListener('click', () => {
      sound.playTap();
      store.navigate('B5_snooze_config');
    });
  }

  const rowAdvanced = document.querySelector('#row-select-advanced');
  if (rowAdvanced) {
    rowAdvanced.addEventListener('click', () => {
      sound.playTap();
      store.navigate('B8_advanced');
    });
  }

  // Back to edit buttons
  document.querySelectorAll('#btn-back-to-edit').forEach(btn => {
    btn.addEventListener('click', () => {
      sound.playTap();
      store.navigate('B2_create_edit');
    });
  });

  // Sound Preview in B4
  document.querySelectorAll('.btn-preview-sound').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const soundId = e.currentTarget.dataset.soundId;
      if (sound.isPlaying) {
        sound.stopAll();
      } else {
        sound.playAlarm(soundId);
      }
    });
  });

  const soundVolSlider = document.querySelector('#sound-volume-slider');
  if (soundVolSlider) {
    soundVolSlider.addEventListener('input', (e) => {
      const val = parseFloat(e.target.value);
      sound.setVolume(val);
      const label = document.querySelector('#sound-vol-label');
      if (label) label.textContent = `${Math.round(val * 100)}%`;
    });
  }

  // Action Menu Actions
  const actionEdit = document.querySelector('#action-edit-alarm');
  if (actionEdit) {
    actionEdit.addEventListener('click', () => {
      sound.playTap();
      store.setState({ editingAlarm: { ...state.selectedAlarmForAction } });
      store.navigate('B2_create_edit');
    });
  }

  const actionDuplicate = document.querySelector('#action-duplicate-alarm');
  if (actionDuplicate) {
    actionDuplicate.addEventListener('click', () => {
      sound.playSuccess();
      store.duplicateAlarm(state.selectedAlarmForAction.id);
      store.navigate('B1_home');
    });
  }

  const actionSkip = document.querySelector('#action-skip-next');
  if (actionSkip) {
    actionSkip.addEventListener('click', () => {
      sound.playTap();
      store.showToast('Đã bỏ qua lần reo tiếp theo của báo thức.');
      store.navigate('B1_home');
    });
  }

  const actionDelete = document.querySelector('#action-delete-alarm');
  if (actionDelete) {
    actionDelete.addEventListener('click', () => {
      sound.playError();
      store.deleteAlarm(state.selectedAlarmForAction.id);
      store.navigate('B1_home');
    });
  }

  const btnCancelActionMenu = document.querySelector('#btn-cancel-action-menu');
  if (btnCancelActionMenu) {
    btnCancelActionMenu.addEventListener('click', () => {
      sound.playTap();
      store.navigate('B1_home');
    });
  }

  // 6. Mission Library & Execution Triggers
  document.querySelectorAll('.btn-try-mission').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const mId = e.currentTarget.dataset.missionId;
      sound.playTap();
      store.navigate(`C${getMissionSetupIndex(mId)}_${mId}_setup`);
    });
  });

  const btnOpenSequence = document.querySelector('#btn-open-sequence');
  if (btnOpenSequence) {
    btnOpenSequence.addEventListener('click', () => {
      sound.playTap();
      store.navigate('C10_mission_sequence');
    });
  }

  document.querySelectorAll('#btn-back-to-library').forEach(btn => {
    btn.addEventListener('click', () => {
      sound.playTap();
      store.navigate('C1_mission_library');
    });
  });

  // Try Execution Buttons
  const btnTryMath = document.querySelector('#btn-try-math-exec');
  if (btnTryMath) {
    btnTryMath.addEventListener('click', () => {
      sound.playTap();
      store.setState({ mathExecState: { q1: 38, q2: 47, input: '', questionIndex: 1, total: 3 } });
      store.navigate('exec_math');
    });
  }

  const btnTryMem = document.querySelector('#btn-try-memory-exec');
  if (btnTryMem) {
    btnTryMem.addEventListener('click', () => {
      sound.playTap();
      store.navigate('exec_memory');
    });
  }

  const btnTryShake = document.querySelector('#btn-try-shake-exec');
  if (btnTryShake) {
    btnTryShake.addEventListener('click', () => {
      sound.playTap();
      store.setState({ shakeCount: 0 });
      store.navigate('exec_shake');
    });
  }

  const btnTryPhoto = document.querySelector('#btn-try-photo-exec');
  if (btnTryPhoto) {
    btnTryPhoto.addEventListener('click', () => {
      sound.playTap();
      store.navigate('exec_photo');
    });
  }

  const btnTryQr = document.querySelector('#btn-try-qr-exec');
  if (btnTryQr) {
    btnTryQr.addEventListener('click', () => {
      sound.playTap();
      store.navigate('exec_qr');
    });
  }

  const btnTryTyping = document.querySelector('#btn-try-typing-exec');
  if (btnTryTyping) {
    btnTryTyping.addEventListener('click', () => {
      sound.playTap();
      store.navigate('exec_typing');
    });
  }

  const btnTryWalking = document.querySelector('#btn-try-walking-exec');
  if (btnTryWalking) {
    btnTryWalking.addEventListener('click', () => {
      sound.playTap();
      store.setState({ walkingSteps: 0 });
      store.navigate('exec_walking');
    });
  }

  const btnTrySquats = document.querySelector('#btn-try-squats-exec');
  if (btnTrySquats) {
    btnTrySquats.addEventListener('click', () => {
      sound.playTap();
      store.setState({ squatsCount: 0 });
      store.navigate('exec_squats');
    });
  }

  // Multi-sequence runner
  const btnRunMulti = document.querySelector('#btn-run-multi-sequence');
  if (btnRunMulti) {
    btnRunMulti.addEventListener('click', () => {
      sound.playSuccess();
      store.setState({
        currentMissionSequence: ['math', 'shake', 'photo'],
        currentMissionStep: 0,
        mathExecState: { q1: 15, q2: 27, input: '', questionIndex: 1, total: 2 }
      });
      store.navigate('exec_math');
    });
  }

  // 7. Mission Execution Interactive Controls
  // Math Keypad
  document.querySelectorAll('.keypad-key').forEach(key => {
    key.addEventListener('click', (e) => {
      const digit = e.currentTarget.dataset.digit;
      sound.playTap();
      const currentMath = state.mathExecState || { q1: 38, q2: 47, input: '', questionIndex: 1, total: 3 };
      let input = currentMath.input;

      if (digit === 'C') {
        input = '';
      } else if (digit === '⌫') {
        input = input.slice(0, -1);
      } else {
        if (input.length < 5) input += digit;
      }

      const expected = currentMath.q1 + currentMath.q2;
      if (parseInt(input, 10) === expected) {
        sound.playSuccess();
        if (currentMath.questionIndex >= currentMath.total) {
          triggerMissionVictory();
        } else {
          store.setState({
            mathExecState: {
              q1: Math.floor(Math.random() * 40) + 10,
              q2: Math.floor(Math.random() * 40) + 10,
              input: '',
              questionIndex: currentMath.questionIndex + 1,
              total: currentMath.total
            }
          });
        }
      } else {
        store.setState({
          mathExecState: { ...currentMath, input }
        });
      }
    });
  });

  // Memory Submit
  const btnMemSubmit = document.querySelector('#btn-memory-submit');
  if (btnMemSubmit) {
    btnMemSubmit.addEventListener('click', () => {
      sound.playSuccess();
      triggerMissionVictory();
    });
  }

  // Shake Simulator
  const btnSimShake = document.querySelector('#btn-simulate-shake');
  if (btnSimShake) {
    btnSimShake.addEventListener('click', () => {
      sound.playTap();
      const circle = document.querySelector('#shake-circle-box');
      if (circle) circle.classList.add('animate-shake');
      setTimeout(() => circle && circle.classList.remove('animate-shake'), 400);

      const next = (state.shakeCount || 0) + 5;
      if (next >= 30) {
        sound.playSuccess();
        triggerMissionVictory();
      } else {
        store.setState({ shakeCount: next });
      }
    });
  }

  // Photo Simulator
  const btnPhotoSuccess = document.querySelector('#btn-photo-success');
  if (btnPhotoSuccess) {
    btnPhotoSuccess.addEventListener('click', () => {
      sound.playSuccess();
      triggerMissionVictory();
    });
  }

  const btnPhotoFail = document.querySelector('#btn-photo-fail');
  if (btnPhotoFail) {
    btnPhotoFail.addEventListener('click', () => {
      sound.playError();
      store.showToast('Độ khớp chỉ đạt 42%. Hãy bật đèn phòng rõ hơn!');
    });
  }

  // QR Simulator
  const btnQrCorrect = document.querySelector('#btn-qr-correct');
  if (btnQrCorrect) {
    btnQrCorrect.addEventListener('click', () => {
      sound.playSuccess();
      triggerMissionVictory();
    });
  }

  const btnQrWrong = document.querySelector('#btn-qr-wrong');
  if (btnQrWrong) {
    btnQrWrong.addEventListener('click', () => {
      sound.playError();
      store.showToast('Mã không khớp với Tuýp kem đánh răng!');
    });
  }

  // Typing Simulator
  const btnAutoPasteTyping = document.querySelector('#btn-auto-paste-typing');
  if (btnAutoPasteTyping) {
    btnAutoPasteTyping.addEventListener('click', () => {
      const area = document.querySelector('#typing-user-input');
      if (area) {
        area.value = "Mỗi sáng thức dậy là một cơ hội mới để trở thành phiên bản tốt hơn của chính mình.";
        sound.playTap();
      }
    });
  }

  const btnTypingSubmit = document.querySelector('#btn-typing-submit');
  if (btnTypingSubmit) {
    btnTypingSubmit.addEventListener('click', () => {
      const area = document.querySelector('#typing-user-input');
      if (area && area.value.trim().length > 20) {
        sound.playSuccess();
        triggerMissionVictory();
      } else {
        sound.playError();
        store.showToast('Vui lòng gõ đầy đủ câu danh ngôn.');
      }
    });
  }

  // Walking Simulator
  const btnSimStep = document.querySelector('#btn-simulate-step');
  if (btnSimStep) {
    btnSimStep.addEventListener('click', () => {
      sound.playTap();
      const next = (state.walkingSteps || 0) + 3;
      if (next >= 30) {
        sound.playSuccess();
        triggerMissionVictory();
      } else {
        store.setState({ walkingSteps: next });
      }
    });
  }

  // Squats Simulator
  const btnSimSquat = document.querySelector('#btn-simulate-squat');
  if (btnSimSquat) {
    btnSimSquat.addEventListener('click', () => {
      sound.playTap();
      const next = (state.squatsCount || 0) + 1;
      if (next >= 10) {
        sound.playSuccess();
        triggerMissionVictory();
      } else {
        store.setState({ squatsCount: next });
      }
    });
  }

  // Emergency Triggers
  document.querySelectorAll('#btn-trigger-emergency').forEach(btn => {
    btn.addEventListener('click', () => {
      sound.playTap();
      sound.stopAll();
      store.setState({ emergencyTapCount: 0 });
      store.navigate('D5_emergency_exit');
    });
  });

  const btnEmergencyTap = document.querySelector('#btn-emergency-tap');
  if (btnEmergencyTap) {
    btnEmergencyTap.addEventListener('click', () => {
      sound.playTap();
      const taps = (state.emergencyTapCount || 0) + 1;
      if (taps >= 15) {
        sound.playSuccess();
        store.showToast('Đã tắt báo thức bằng chế độ khẩn cấp.');
        store.navigate('B1_home');
      } else {
        store.setState({ emergencyTapCount: taps });
      }
    });
  }

  const btnEmergencyCancel = document.querySelector('#btn-emergency-cancel');
  if (btnEmergencyCancel) {
    btnEmergencyCancel.addEventListener('click', () => {
      sound.playTap();
      store.goBack();
    });
  }

  // 8. Wakeflow Transitions
  const btnStartMissionRinging = document.querySelector('#btn-start-mission-ringing');
  if (btnStartMissionRinging) {
    btnStartMissionRinging.addEventListener('click', () => {
      sound.stopAll();
      sound.playTap();
      // Default to first mission of alarm
      const alarm = state.ringingAlarm || state.alarms[0];
      const mId = alarm.missions[0] || 'math';
      if (mId === 'qr') store.navigate('exec_qr');
      else if (mId === 'shake') store.navigate('exec_shake');
      else if (mId === 'photo') store.navigate('exec_photo');
      else store.navigate('exec_math');
    });
  }

  const btnSnooze = document.querySelector('#btn-snooze-alarm');
  if (btnSnooze) {
    btnSnooze.addEventListener('click', () => {
      sound.stopAll();
      sound.playTap();
      store.setState({ snoozeCountdown: 600 });
      store.navigate('D2_snoozing');
    });
  }

  const btnSimSnoozeTimeout = document.querySelector('#btn-simulate-snooze-timeout');
  if (btnSimSnoozeTimeout) {
    btnSimSnoozeTimeout.addEventListener('click', () => {
      sound.playAlarm();
      store.navigate('D1_ringing');
    });
  }

  const btnWakeUpNow = document.querySelector('#btn-wake-up-now');
  if (btnWakeUpNow) {
    btnWakeUpNow.addEventListener('click', () => {
      sound.playSuccess();
      store.navigate('D6_morning_summary');
    });
  }

  const btnNextMissionInSeq = document.querySelector('#btn-next-mission-in-seq');
  if (btnNextMissionInSeq) {
    btnNextMissionInSeq.addEventListener('click', () => {
      sound.playTap();
      const nextStep = state.currentMissionStep + 1;
      const nextMissionId = state.currentMissionSequence[nextStep];
      store.setState({ currentMissionStep: nextStep });
      store.navigate(`exec_${nextMissionId}`);
    });
  }

  const btnGotoMorningSummary = document.querySelector('#btn-goto-morning-summary');
  if (btnGotoMorningSummary) {
    btnGotoMorningSummary.addEventListener('click', () => {
      sound.playTap();
      store.navigate('D6_morning_summary');
    });
  }

  const btnFinishMorningSummary = document.querySelector('#btn-finish-morning-summary');
  if (btnFinishMorningSummary) {
    btnFinishMorningSummary.addEventListener('click', () => {
      sound.playSuccess();
      store.navigate('B1_home');
    });
  }

  const btnConfirmAwake = document.querySelector('#btn-confirm-wakeup-awake');
  if (btnConfirmAwake) {
    btnConfirmAwake.addEventListener('click', () => {
      sound.playSuccess();
      store.showToast('Đã xác nhận tỉnh táo! Chúc bạn ngày mới tốt lành.');
      store.navigate('B1_home');
    });
  }

  const btnSimMissedCheck = document.querySelector('#btn-simulate-missed-check');
  if (btnSimMissedCheck) {
    btnSimMissedCheck.addEventListener('click', () => {
      sound.playAlarm('radar');
      store.navigate('D1_ringing');
    });
  }

  // 9. Sleep Tracking Interactions
  const btnPrepSleep = document.querySelector('#btn-prep-sleep-tracking');
  if (btnPrepSleep) {
    btnPrepSleep.addEventListener('click', () => {
      sound.playTap();
      store.navigate('E3_sleep_prep');
    });
  }

  const btnStartActiveSleep = document.querySelector('#btn-start-active-sleep');
  if (btnStartActiveSleep) {
    btnStartActiveSleep.addEventListener('click', () => {
      sound.playTap();
      store.setState({ sleepState: { ...state.sleepState, isTracking: true } });
      store.navigate('E4_active_session');
    });
  }

  const btnHoldStopSleep = document.querySelector('#btn-hold-to-stop-sleep');
  if (btnHoldStopSleep) {
    let holdTimer = null;
    const progressEl = document.querySelector('#hold-stop-progress');

    const startHold = () => {
      if (progressEl) progressEl.style.width = '100%';
      holdTimer = setTimeout(() => {
        sound.playSuccess();
        store.setState({ sleepState: { ...state.sleepState, isTracking: false } });
        store.navigate('E5_night_report');
      }, 1500); // 1.5s responsive hold
    };

    const cancelHold = () => {
      if (holdTimer) clearTimeout(holdTimer);
      if (progressEl) progressEl.style.width = '0%';
    };

    btnHoldStopSleep.addEventListener('mousedown', startHold);
    btnHoldStopSleep.addEventListener('mouseup', cancelHold);
    btnHoldStopSleep.addEventListener('mouseleave', cancelHold);
    btnHoldStopSleep.addEventListener('touchstart', startHold);
    btnHoldStopSleep.addEventListener('touchend', cancelHold);
  }

  const btnViewNightReport = document.querySelector('#btn-view-night-report');
  if (btnViewNightReport) {
    btnViewNightReport.addEventListener('click', () => {
      sound.playTap();
      store.navigate('E5_night_report');
    });
  }

  const btnOpenSnoreClips = document.querySelector('#btn-open-snore-clips');
  if (btnOpenSnoreClips) {
    btnOpenSnoreClips.addEventListener('click', () => {
      sound.playTap();
      store.navigate('E8_snore_recordings');
    });
  }

  const btnOpenSnoreVaultCard = document.querySelector('#btn-open-snore-vault-card');
  if (btnOpenSnoreVaultCard) {
    btnOpenSnoreVaultCard.addEventListener('click', () => {
      sound.playTap();
      store.navigate('E8_snore_recordings');
    });
  }

  const btnOpenSleepTrends = document.querySelector('#btn-open-sleep-trends');
  if (btnOpenSleepTrends) {
    btnOpenSleepTrends.addEventListener('click', () => {
      sound.playTap();
      store.navigate('E7_trends');
    });
  }

  document.querySelectorAll('#btn-back-to-sleep').forEach(btn => {
    btn.addEventListener('click', () => {
      sound.playTap();
      store.navigate('E1_sleep_overview');
    });
  });

  // Snore audio play
  document.querySelectorAll('.btn-play-snore').forEach(btn => {
    btn.addEventListener('click', () => {
      if (sound.isPlaying) {
        sound.stopAll();
      } else {
        sound.playSnoreSimulation();
      }
    });
  });

  // 10. Relaxation Audio Interactions
  document.querySelectorAll('.btn-play-ambient').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const sId = e.currentTarget.dataset.soundId;
      if (state.relaxation.isPlaying && state.relaxation.activeSound === sId) {
        sound.stopAll();
        store.setState({ relaxation: { ...state.relaxation, isPlaying: false } });
      } else {
        sound.playAmbient(sId);
        store.setState({ relaxation: { ...state.relaxation, activeSound: sId, isPlaying: true } });
      }
    });
  });

  document.querySelectorAll('.sound-relax-card').forEach(card => {
    card.addEventListener('click', (e) => {
      if (e.target.closest('button')) return;
      const sId = e.currentTarget.dataset.soundId;
      sound.playAmbient(sId);
      store.setState({ relaxation: { ...state.relaxation, activeSound: sId, isPlaying: true } });
      store.navigate('F2_player');
    });
  });

  const btnPlayerPlayPause = document.querySelector('#btn-player-play-pause');
  if (btnPlayerPlayPause) {
    btnPlayerPlayPause.addEventListener('click', () => {
      if (state.relaxation.isPlaying) {
        sound.stopAll();
        store.setState({ relaxation: { ...state.relaxation, isPlaying: false } });
      } else {
        sound.playAmbient(state.relaxation.activeSound || 'rain');
        store.setState({ relaxation: { ...state.relaxation, isPlaying: true } });
      }
    });
  }

  const btnOpenRelaxTimer = document.querySelector('#btn-open-relax-timer');
  if (btnOpenRelaxTimer) {
    btnOpenRelaxTimer.addEventListener('click', () => {
      sound.playTap();
      store.navigate('F3_timer');
    });
  }

  const btnOpenRelaxFavs = document.querySelector('#btn-open-relax-favs');
  if (btnOpenRelaxFavs) {
    btnOpenRelaxFavs.addEventListener('click', () => {
      sound.playTap();
      store.navigate('F4_favorites');
    });
  }

  document.querySelectorAll('#btn-back-to-relax').forEach(btn => {
    btn.addEventListener('click', () => {
      sound.playTap();
      store.navigate('F1_relax_library');
    });
  });

  document.querySelectorAll('#btn-back-to-player').forEach(btn => {
    btn.addEventListener('click', () => {
      sound.playTap();
      store.navigate('F2_player');
    });
  });

  // 11. Settings & Diagnostics
  const menuAppearance = document.querySelector('#menu-appearance');
  if (menuAppearance) menuAppearance.addEventListener('click', () => { sound.playTap(); store.navigate('G2_appearance'); });

  const menuReadiness = document.querySelector('#menu-readiness');
  if (menuReadiness) menuReadiness.addEventListener('click', () => { sound.playTap(); store.navigate('G3_alarm_readiness'); });

  const menuPrivacy = document.querySelector('#menu-privacy');
  if (menuPrivacy) menuPrivacy.addEventListener('click', () => { sound.playTap(); store.navigate('G4_privacy'); });

  const menuHelp = document.querySelector('#menu-help');
  if (menuHelp) menuHelp.addEventListener('click', () => { sound.playTap(); store.navigate('G5_help'); });

  const menuAbout = document.querySelector('#menu-about');
  if (menuAbout) menuAbout.addEventListener('click', () => { sound.playTap(); store.navigate('G6_about'); });

  document.querySelectorAll('#btn-back-to-profile').forEach(btn => {
    btn.addEventListener('click', () => {
      sound.playTap();
      store.navigate('G1_profile');
    });
  });

  const btnTestAlarm5s = document.querySelector('#btn-test-alarm-5s');
  if (btnTestAlarm5s) {
    btnTestAlarm5s.addEventListener('click', () => {
      sound.playTap();
      store.showToast('Chuông thử nghiệm sẽ reo sau 5 giây...');
      setTimeout(() => {
        sound.playAlarm('radar');
        store.navigate('D1_ringing');
      }, 5000);
    });
  }

  // Appearance controls
  const btnSetDark = document.querySelector('#btn-set-dark');
  if (btnSetDark) btnSetDark.addEventListener('click', () => { sound.playTap(); store.setTheme('dark'); });

  const btnSetLight = document.querySelector('#btn-set-light');
  if (btnSetLight) btnSetLight.addEventListener('click', () => { sound.playTap(); store.setTheme('light'); });

  const btnScaleNormal = document.querySelector('#btn-scale-normal');
  if (btnScaleNormal) btnScaleNormal.addEventListener('click', () => {
    sound.playTap();
    document.body.classList.remove('text-scale-large', 'text-scale-xlarge');
    store.showToast('Đã đặt cỡ chữ chuẩn');
  });

  const btnScaleLarge = document.querySelector('#btn-scale-large');
  if (btnScaleLarge) btnScaleLarge.addEventListener('click', () => {
    sound.playTap();
    document.body.classList.remove('text-scale-xlarge');
    document.body.classList.add('text-scale-large');
    store.showToast('Đã phóng to cỡ chữ');
  });
}

// Helper: Mission Setup Index mapper
function getMissionSetupIndex(mId) {
  const map = {
    math: '2',
    memory: '3',
    shake: '4',
    photo: '5',
    qr: '6',
    typing: '7',
    walking: '8',
    squats: '9'
  };
  return map[mId] || '2';
}

// Celebration / Mission Victory trigger
function triggerMissionVictory() {
  confetti({
    particleCount: 80,
    spread: 70,
    origin: { y: 0.6 }
  });
  store.navigate('D3_mission_completed');
}

// Preset Guided Flows Implementation (Flows 1 to 8)
function runPrototypeFlow(flowId) {
  sound.stopAll();
  sound.playTap();

  if (flowId === 1) {
    // Flow 1: Onboarding → first alarm → save
    store.setState({ activeFlow: { id: 1, title: 'Flow 1: Bắt đầu → Lưu báo thức' } });
    store.showToast('Đang chạy Flow 1: Bắt đầu (Onboarding)');
    store.navigate('A1_splash');
  } else if (flowId === 2) {
    // Flow 2: QR alarm → ringing → scan → completion
    store.setState({
      activeFlow: { id: 2, title: 'Flow 2: Báo thức QR' },
      ringingAlarm: {
        id: 'alarm_qr_demo',
        time: '06:30',
        period: 'SA',
        label: 'Quét mã tuýp kem đánh răng',
        sound: 'Báo thức Radar năng động',
        missions: ['qr'],
        snoozeEnabled: true,
        snoozeDuration: 5,
        snoozeRemaining: 2
      }
    });
    sound.playAlarm('radar');
    store.showToast('Flow 2: Đang đổ chuông báo thức QR!');
    store.navigate('D1_ringing');
  } else if (flowId === 3) {
    // Flow 3: Ringing → snooze → ring again
    store.setState({
      activeFlow: { id: 3, title: 'Flow 3: Hoãn báo thức' },
      ringingAlarm: store.getState().alarms[0],
      snoozeCountdown: 10
    });
    sound.playAlarm('gentle');
    store.showToast('Flow 3: Đang đổ chuông (Bấm "Hoãn" để xem đếm ngược)');
    store.navigate('D1_ringing');
  } else if (flowId === 4) {
    // Flow 4: Mission complete → wake-up check missed → ring again
    store.setState({ activeFlow: { id: 4, title: 'Flow 4: Kiểm tra thức giấc sau 5p' } });
    store.showToast('Flow 4: Bỏ lỡ kiểm tra sau 5p sẽ đổ chuông lại ngay');
    store.navigate('D4_wakeup_check');
  } else if (flowId === 5) {
    // Flow 5: Bedtime reminder → relaxing sound → tracking → morning report
    store.setState({ activeFlow: { id: 5, title: 'Flow 5: Giấc ngủ trọn vẹn' } });
    sound.playAmbient('rain');
    store.setState({ relaxation: { ...store.getState().relaxation, activeSound: 'rain', isPlaying: true } });
    store.showToast('Flow 5: Phát tiếng mưa và chuẩn bị theo dõi giấc ngủ');
    store.navigate('E3_sleep_prep');
  } else if (flowId === 6) {
    // Flow 6: Permission denied → recovery → feature test
    store.setState({
      activeFlow: { id: 6, title: 'Flow 6: Quản lý cấp quyền' },
      permissions: { notifications: 'granted', camera: 'denied', microphone: 'denied', motion: 'denied' }
    });
    store.showToast('Flow 6: Trạng thái quyền bị từ chối và hướng dẫn khôi phục');
    store.navigate('A5_permissions');
  } else if (flowId === 7) {
    // Flow 7: Mission unavailable → emergency alternative
    store.setState({
      activeFlow: { id: 7, title: 'Flow 7: Thoát khẩn cấp' },
      emergencyTapCount: 0
    });
    store.showToast('Flow 7: Chế độ thoát khẩn cấp an toàn chống ngủ gật');
    store.navigate('D5_emergency_exit');
  } else if (flowId === 8) {
    // Flow 8: Create and complete a multi-mission alarm
    store.setState({
      activeFlow: { id: 8, title: 'Flow 8: Chuỗi đa nhiệm vụ' },
      currentMissionSequence: ['math', 'shake', 'photo'],
      currentMissionStep: 0,
      mathExecState: { q1: 23, q2: 39, input: '', questionIndex: 1, total: 2 },
      shakeCount: 0
    });
    store.showToast('Flow 8: Chuỗi 3 nhiệm vụ liên tiếp (Toán → Lắc → Ảnh)');
    store.navigate('C10_mission_sequence');
  }
}

// Subscribe & Initial Boot
store.subscribe(render);
render();
