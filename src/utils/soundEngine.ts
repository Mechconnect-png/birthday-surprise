/**
 * Web Audio Engine for Ambient Background Music & Cinematic Sound Effects
 * Provides synthesized celestial piano/harp chords if local audio is missing,
 * plus interactive sound effects (candle blow, sparkle, heart burst, chime).
 */

class SoundEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private masterGain: GainNode | null = null;
  private ambientInterval: number | null = null;
  private isAmbientPlaying: boolean = false;

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.value = 0.5;
      this.masterGain.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public setVolume(vol: number) {
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setTargetAtTime(this.isMuted ? 0 : Math.max(0, Math.min(1, vol)), this.ctx.currentTime, 0.1);
    }
  }

  public setMute(muted: boolean) {
    this.isMuted = muted;
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setTargetAtTime(muted ? 0 : 0.5, this.ctx.currentTime, 0.1);
    }
  }

  /**
   * Play a gentle romantic piano/chime chord progression (Synthesizer Fallback)
   */
  public startSynthesizedAmbience() {
    if (this.isAmbientPlaying) return;
    this.initContext();
    this.isAmbientPlaying = true;

    // Beautiful romantic pentatonic & ethereal major 7th / 9th notes (in Hz)
    const chordProgressions = [
      [261.63, 329.63, 392.00, 493.88], // Cmaj7 (C4, E4, G4, B4)
      [220.00, 261.63, 329.63, 392.00], // Am7 (A3, C4, E4, G4)
      [174.61, 220.00, 261.63, 329.63], // Fmaj7 (F3, A3, C4, E4)
      [196.00, 246.94, 293.66, 392.00], // Gadd9 (G3, B3, D4, G4)
    ];

    let chordIdx = 0;

    const playChord = () => {
      if (!this.isAmbientPlaying || !this.ctx || !this.masterGain) return;
      const notes = chordProgressions[chordIdx % chordProgressions.length];
      chordIdx++;

      notes.forEach((freq, i) => {
        setTimeout(() => {
          if (!this.isAmbientPlaying || !this.ctx || !this.masterGain) return;
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          const filter = this.ctx.createBiquadFilter();

          osc.type = i % 2 === 0 ? 'sine' : 'triangle';
          osc.frequency.setValueAtTime(freq * (1 + (Math.random() * 0.002 - 0.001)), this.ctx.currentTime);

          filter.type = 'lowpass';
          filter.frequency.setValueAtTime(800, this.ctx.currentTime);
          filter.frequency.exponentialRampToValueAtTime(300, this.ctx.currentTime + 3.5);

          const now = this.ctx.currentTime;
          gain.gain.setValueAtTime(0.001, now);
          gain.gain.linearRampToValueAtTime(0.08, now + 0.6);
          gain.gain.exponentialRampToValueAtTime(0.0001, now + 4.5);

          osc.connect(filter);
          filter.connect(gain);
          gain.connect(this.masterGain);

          osc.start(now);
          osc.stop(now + 4.6);
        }, i * 380);
      });
    };

    playChord();
    this.ambientInterval = window.setInterval(playChord, 5200);
  }

  public stopSynthesizedAmbience() {
    this.isAmbientPlaying = false;
    if (this.ambientInterval) {
      clearInterval(this.ambientInterval);
      this.ambientInterval = null;
    }
  }

  /**
   * Sound effect: Candle lighting chime
   */
  public playCandleLight() {
    try {
      this.initContext();
      if (!this.ctx || !this.masterGain) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      const now = this.ctx.currentTime;
      osc.frequency.setValueAtTime(523.25 + Math.random() * 200, now);
      osc.frequency.exponentialRampToValueAtTime(1046.5, now + 0.3);

      gain.gain.setValueAtTime(0.05, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.35);

      osc.connect(gain);
      gain.connect(this.masterGain);
      osc.start(now);
      osc.stop(now + 0.35);
    } catch {
      // AudioContext safe
    }
  }

  /**
   * Sound effect: Blowing out the candles (soft breath/wind whoosh)
   */
  public playBlowSound() {
    try {
      this.initContext();
      if (!this.ctx || !this.masterGain) return;

      const bufferSize = this.ctx.sampleRate * 1.5;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (this.ctx.sampleRate * 0.4));
      }

      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(450, this.ctx.currentTime);
      filter.Q.setValueAtTime(1.5, this.ctx.currentTime);

      const gain = this.ctx.createGain();
      const now = this.ctx.currentTime;
      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.2);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterGain);

      noise.start(now);
    } catch {
      // AudioContext safe
    }
  }

  /**
   * Sound effect: Golden reveal chime / climax shimmer
   */
  public playShimmerClimax() {
    try {
      this.initContext();
      if (!this.ctx || !this.masterGain) return;

      const freqs = [523.25, 659.25, 783.99, 1046.50, 1318.51, 1567.98];
      freqs.forEach((freq, idx) => {
        setTimeout(() => {
          if (!this.ctx || !this.masterGain) return;
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();

          osc.type = 'sine';
          const now = this.ctx.currentTime;
          osc.frequency.setValueAtTime(freq, now);

          gain.gain.setValueAtTime(0.08, now);
          gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.8);

          osc.connect(gain);
          gain.connect(this.masterGain);
          osc.start(now);
          osc.stop(now + 1.8);
        }, idx * 120);
      });
    } catch {
      // AudioContext safe
    }
  }

  /**
   * Sound effect: Light pop / click / star sparkle
   */
  public playSparkle() {
    try {
      this.initContext();
      if (!this.ctx || !this.masterGain) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      const now = this.ctx.currentTime;
      osc.frequency.setValueAtTime(880 + Math.random() * 400, now);
      osc.frequency.exponentialRampToValueAtTime(1760, now + 0.15);

      gain.gain.setValueAtTime(0.04, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.15);

      osc.connect(gain);
      gain.connect(this.masterGain);
      osc.start(now);
      osc.stop(now + 0.16);
    } catch {
      // AudioContext safe
    }
  }
}

export const soundEngine = new SoundEngine();
