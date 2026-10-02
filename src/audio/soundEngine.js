// Synthesized tones and licensed/local tracks share one transport.
import {alarmSounds} from './catalog.js';
import {audioFile} from './library.js';

class SoundEngine {
  constructor() {
    this.ctx = null;
    this.isPlaying = false;
    this.currentSoundType = null;
    this.ambientNodes = [];
    this.alarmLoopTimer = null;
    this.masterGain = null;
    this.volume = 0.8;
    this.playbackToken = 0;
    this.media = null;
    this.objectURL = null;
  }

  oscillator() {
    const oscillator = this.ctx.createOscillator();
    this.ambientNodes.push(oscillator);
    oscillator.addEventListener('ended', () => {
      oscillator.disconnect();
      this.ambientNodes = this.ambientNodes.filter(node => node !== oscillator);
    }, {once:true});
    return oscillator;
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  setVolume(val) {
    this.volume = Math.max(0, Math.min(1, val));
    if (this.media) this.media.volume = this.volume;
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);
    }
  }

  stopAll() {
    this.playbackToken++;
    if (this.media) { this.media.pause(); this.media.removeAttribute('src'); this.media.load(); this.media = null; }
    if (this.objectURL) { URL.revokeObjectURL(this.objectURL); this.objectURL = null; }
    if (this.alarmLoopTimer) {
      clearInterval(this.alarmLoopTimer);
      this.alarmLoopTimer = null;
    }
    this.ambientNodes.forEach(node => {
      try {
        if (node.stop) node.stop();
        if (node.disconnect) node.disconnect();
      } catch (e) {
        // ignore already stopped
      }
    });
    this.ambientNodes = [];
    this.isPlaying = false;
    this.currentSoundType = null;
  }

  // UI Feedback Sounds
  playTap() {
    try {
      this.init();
      const osc = this.oscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(400, this.ctx.currentTime + 0.04);
      gain.gain.setValueAtTime(0.12, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.04);
      osc.connect(gain);
      gain.connect(this.masterGain);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.04);
    } catch(e) {}
  }

  playSuccess() {
    try {
      this.init();
      const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
      notes.forEach((freq, idx) => {
        const osc = this.oscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime + idx * 0.08);
        gain.gain.setValueAtTime(0, this.ctx.currentTime + idx * 0.08);
        gain.gain.linearRampToValueAtTime(0.2, this.ctx.currentTime + idx * 0.08 + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + idx * 0.08 + 0.35);
        osc.connect(gain);
        gain.connect(this.masterGain);
        osc.start(this.ctx.currentTime + idx * 0.08);
        osc.stop(this.ctx.currentTime + idx * 0.08 + 0.35);
      });
    } catch(e) {}
  }

  playError() {
    try {
      this.init();
      const osc = this.oscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(140, this.ctx.currentTime);
      osc.frequency.setValueAtTime(110, this.ctx.currentTime + 0.1);
      gain.gain.setValueAtTime(0.25, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.28);
      osc.connect(gain);
      gain.connect(this.masterGain);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.28);
    } catch(e) {}
  }

  // Alarm Ringing Engine
  async playAlarm(soundName = 'gentle') {
    this.stopAll();
    const token = this.playbackToken;
    const track = alarmSounds.find(s => s.id === soundName || s.name === soundName);
    if (track?.src || soundName.startsWith('local_')) {
      try {
        let src = track?.src;
        if (!src) {
          const blob = await audioFile('get', soundName);
          if (token !== this.playbackToken) return;
          if (!blob) throw new Error('Missing local file');
          src = this.objectURL = URL.createObjectURL(blob);
        }
        const media = this.media = new Audio(src);
        media.loop = true; media.volume = this.volume;
        await media.play();
        if (token !== this.playbackToken) { media.pause(); return; }
        this.isPlaying = true; this.currentSoundType = 'alarm';
        return;
      } catch {
        if (token !== this.playbackToken) return;
        window.dispatchEvent(new CustomEvent('zaki-audio-error'));
        soundName = 'radar';
      }
    }
    this.init();
    this.isPlaying = true;
    this.currentSoundType = 'alarm';

    const triggerChord = () => {
      if (!this.isPlaying) return;
      const t = this.ctx.currentTime;
      if (soundName === 'radar' || soundName === 'Mạnh mẽ (Radar)') {
        // High attention radar pulse
        for (let i = 0; i < 3; i++) {
          const osc = this.oscillator();
          const gain = this.ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(880, t + i * 0.12);
          gain.gain.setValueAtTime(0.3, t + i * 0.12);
          gain.gain.exponentialRampToValueAtTime(0.001, t + i * 0.12 + 0.09);
          osc.connect(gain);
          gain.connect(this.masterGain);
          osc.start(t + i * 0.12);
          osc.stop(t + i * 0.12 + 0.1);
        }
      } else if (soundName === 'birds' || soundName === 'Chim hót sớm mai') {
        // Gentle bird warble
        const osc = this.oscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(1800, t);
        osc.frequency.linearRampToValueAtTime(2800, t + 0.08);
        osc.frequency.linearRampToValueAtTime(2200, t + 0.16);
        osc.frequency.linearRampToValueAtTime(3200, t + 0.25);
        gain.gain.setValueAtTime(0.18, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.32);
        osc.connect(gain);
        gain.connect(this.masterGain);
        osc.start(t);
        osc.stop(t + 0.35);
      } else if (['lofi','pop','piano'].includes(soundName)) {
        const patterns = {
          lofi: {notes:[261.63,329.63,392,329.63,293.66,349.23,440,349.23],wave:'triangle',gain:0.16,step:0.2},
          pop: {notes:[523.25,659.25,783.99,1046.5,783.99,659.25,587.33,783.99],wave:'square',gain:0.1,step:0.17},
          piano: {notes:[392,493.88,587.33,783.99,698.46,587.33,493.88,392],wave:'sine',gain:0.17,step:0.21}
        };
        const pattern=patterns[soundName];
        pattern.notes.forEach((hz,index)=>{
          const osc=this.oscillator(),gain=this.ctx.createGain(),start=t+index*pattern.step;
          osc.type=pattern.wave;osc.frequency.setValueAtTime(hz,start);
          gain.gain.setValueAtTime(0.001,start);
          gain.gain.linearRampToValueAtTime(pattern.gain,start+0.015);
          gain.gain.exponentialRampToValueAtTime(0.001,start+pattern.step*0.9);
          osc.connect(gain);gain.connect(this.masterGain);osc.start(start);osc.stop(start+pattern.step);
        });
      } else if (soundName === 'bell') {
        [880,1320,1760].forEach((hz,index) => {
          const osc = this.oscillator(); const gain = this.ctx.createGain();
          osc.frequency.value = hz; gain.gain.setValueAtTime(0.15/(index+1), t);
          gain.gain.exponentialRampToValueAtTime(0.001,t+1.6);
          osc.connect(gain); gain.connect(this.masterGain); osc.start(t); osc.stop(t+1.6);
          this.ambientNodes.push(osc,gain);
        });
      } else {
        // Default Gentle Sunrise Chime (Dịu êm)
        const notes = [587.33, 739.99, 880.00, 1174.66]; // D5, F#5, A5, D6
        notes.forEach((freq, idx) => {
          const osc = this.oscillator();
          const gain = this.ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, t + idx * 0.18);
          gain.gain.setValueAtTime(0.25, t + idx * 0.18);
          gain.gain.exponentialRampToValueAtTime(0.001, t + idx * 0.18 + 0.9);
          osc.connect(gain);
          gain.connect(this.masterGain);
          osc.start(t + idx * 0.18);
          osc.stop(t + idx * 0.18 + 0.95);
        });
      }
    };

    triggerChord();
    this.alarmLoopTimer = setInterval(triggerChord, 1800);
  }

  // Relaxation Ambient Sound Generator (Rain, Ocean, Forest, Campfire, White Noise)
  playAmbient(type = 'rain') {
    this.stopAll();
    this.init();
    this.isPlaying = true;
    this.currentSoundType = 'ambient';

    // White/Pink noise buffer
    const bufferSize = this.ctx.sampleRate * 2;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }

    const whiteNoise = this.ctx.createBufferSource();
    whiteNoise.buffer = buffer;
    whiteNoise.loop = true;

    if (type === 'rain' || type.includes('mưa') || type.includes('Mưa')) {
      // Filter for rain sound
      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(800, this.ctx.currentTime);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.28, this.ctx.currentTime);

      whiteNoise.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterGain);
      whiteNoise.start();
      this.ambientNodes.push(whiteNoise, filter, gain);
    } else if (type === 'ocean' || type.includes('sóng') || type.includes('biển')) {
      // Ocean surf with LFO swell
      const filter = this.ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(450, this.ctx.currentTime);
      filter.Q.setValueAtTime(1.2, this.ctx.currentTime);

      const lfo = this.oscillator();
      lfo.frequency.setValueAtTime(0.12, this.ctx.currentTime); // 8-second wave swell
      const lfoGain = this.ctx.createGain();
      lfoGain.gain.setValueAtTime(300, this.ctx.currentTime);
      lfo.connect(lfoGain); lfoGain.connect(filter.frequency);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.35, this.ctx.currentTime);

      whiteNoise.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterGain);

      lfo.start();
      whiteNoise.start();
      this.ambientNodes.push(whiteNoise, filter, lfo, lfoGain, gain);
    } else {
      // Soothing white/pink noise
      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(type === 'stream' ? 2400 : type === 'campfire' ? 350 : 14000, this.ctx.currentTime);
      if (type === 'stream') { filter.type = 'bandpass'; filter.Q.value = 0.8; }
      if (type === 'campfire') {
        for (let i = 0; i < output.length; i++) output[i] *= Math.random() > 0.998 ? 3 : 0.18;
      }

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.2, this.ctx.currentTime);

      whiteNoise.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterGain);
      whiteNoise.start();
      this.ambientNodes.push(whiteNoise, filter, gain);
    }
  }

  // Snore audio playback simulation
  playSnoreSimulation() {
    this.stopAll();
    this.init();
    this.isPlaying = true;
    this.currentSoundType = 'snore';

    // Rhythmic breathing/snore pattern
    let rep = 0;
    const breathe = () => {
      if (!this.isPlaying || rep >= 3) {
        this.stopAll();
        return;
      }
      rep++;
      const t = this.ctx.currentTime;
      const osc = this.oscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(75, t);
      osc.frequency.linearRampToValueAtTime(65, t + 1.2);
      gain.gain.setValueAtTime(0, t);
      gain.gain.linearRampToValueAtTime(0.18, t + 0.4);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 1.2);
      osc.connect(gain);
      gain.connect(this.masterGain);
      osc.start(t);
      osc.stop(t + 1.25);
    };

    breathe();
    this.alarmLoopTimer = setInterval(breathe, 2000);
  }
}

export const sound = new SoundEngine();
