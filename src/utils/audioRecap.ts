/**
 * Ambient background music player for the Video Recap modal.
 * Features:
 * - Plays a gentle, calming ambient neoclassical track ("Aurora" by Scott Buckley / Erik Satie Gymnopedie).
 * - Smooth volume fade-in and fade-out.
 * - Resilient fallback to a warm, soft Web Audio ambient synthesizer if offline or blocked.
 * - Volume and mute management.
 */

class RecapAudioPlayer {
  private audioElement: HTMLAudioElement | null = null;
  private ctx: AudioContext | null = null;
  private synthGain: GainNode | null = null;
  private synthTimerId: number | null = null;
  private currentChordIndex = 0;
  private isPlaying = false;
  private isMuted = false;
  private usingSynthFallback = false;
  private targetVolume = 0.42; // Soft, gentle ambient volume

  // Reliable, high-fidelity ambient royalty-free audio tracks (CC-BY)
  private audioUrls: string[] = [
    'https://upload.wikimedia.org/wikipedia/commons/8/8e/Scott_Buckley_-_Aurora.mp3',
    'https://upload.wikimedia.org/wikipedia/commons/b/b7/Gymnopedie_No._1..ogg'
  ];

  // Soft ambient chord harmonics for synth fallback (Fmaj9, Cmaj7/9, Am9, Em7, Dm9)
  private ambientChords: number[][] = [
    [174.61, 220.00, 261.63, 329.63, 392.00], // F3, A3, C4, E4, G4 (Fmaj9)
    [130.81, 196.00, 246.94, 329.63, 493.88], // C3, G3, B3, E4, B4 (Cmaj7)
    [220.00, 261.63, 329.63, 392.00, 523.25], // A3, C4, E4, G4, C5 (Am9)
    [164.81, 196.00, 246.94, 293.66, 440.00], // E3, G3, B3, D4, A4 (Em11)
    [146.83, 220.00, 261.63, 329.63, 440.00], // D3, A3, C4, E4, A4 (Dm9)
  ];

  constructor() {
    this.setupAudioElement();
  }

  private setupAudioElement() {
    if (typeof window === 'undefined') return;

    try {
      this.audioElement = new Audio();
      this.audioElement.preload = 'auto';
      this.audioElement.loop = true;
      this.audioElement.volume = 0; // Starts at 0 for fade in
      this.audioElement.crossOrigin = 'anonymous';

      // Load primary track
      this.audioElement.src = this.audioUrls[0];

      // Error handling: try next URL or fallback to synth
      this.audioElement.onerror = () => {
        console.warn('Primary audio stream failed, attempting backup track...');
        if (this.audioElement && this.audioElement.src !== this.audioUrls[1]) {
          this.audioElement.src = this.audioUrls[1];
          if (this.isPlaying) {
            this.audioElement.play().catch(() => this.startSynthFallback());
          }
        } else {
          this.startSynthFallback();
        }
      };
    } catch (e) {
      console.warn('Audio element initialization failed, will use Web Audio:', e);
    }
  }

  public play() {
    this.isPlaying = true;

    if (!this.usingSynthFallback && this.audioElement) {
      this.audioElement.muted = this.isMuted;
      this.audioElement.volume = this.isMuted ? 0 : 0.05;

      const playPromise = this.audioElement.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            // Smoothly fade in volume over 1.2 seconds for a peaceful entrance
            this.fadeInAudio();
          })
          .catch((err) => {
            console.warn('HTML5 audio play blocked/failed, switching to Web Audio synth:', err);
            this.startSynthFallback();
          });
      }
    } else {
      this.startSynthFallback();
    }
  }

  private fadeInAudio() {
    if (!this.audioElement || this.isMuted) return;
    let vol = this.audioElement.volume;
    const fadeInterval = window.setInterval(() => {
      if (!this.audioElement || !this.isPlaying || this.isMuted) {
        clearInterval(fadeInterval);
        return;
      }
      vol = Math.min(this.targetVolume, vol + 0.04);
      this.audioElement.volume = vol;
      if (vol >= this.targetVolume) {
        clearInterval(fadeInterval);
      }
    }, 100);
  }

  private fadeOutAudio(onComplete?: () => void) {
    if (!this.audioElement) {
      if (onComplete) onComplete();
      return;
    }
    let vol = this.audioElement.volume;
    const fadeInterval = window.setInterval(() => {
      if (!this.audioElement) {
        clearInterval(fadeInterval);
        return;
      }
      vol = Math.max(0, vol - 0.08);
      this.audioElement.volume = vol;
      if (vol <= 0) {
        clearInterval(fadeInterval);
        if (this.audioElement) {
          this.audioElement.pause();
        }
        if (onComplete) onComplete();
      }
    }, 60);
  }

  private startSynthFallback() {
    this.usingSynthFallback = true;
    this.initSynth();
    if (!this.synthGain || !this.ctx) return;

    this.synthGain.gain.setValueAtTime(this.isMuted ? 0 : this.targetVolume * 0.7, this.ctx.currentTime);

    if (!this.synthTimerId) {
      this.playNextSynthChord();
      this.synthTimerId = window.setInterval(() => {
        if (this.isPlaying) {
          this.playNextSynthChord();
        }
      }, 4200);
    }
  }

  private initSynth() {
    if (!this.ctx) {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioContextClass();
      this.synthGain = this.ctx.createGain();
      this.synthGain.gain.setValueAtTime(this.isMuted ? 0 : this.targetVolume * 0.7, this.ctx.currentTime);
      this.synthGain.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  private playNextSynthChord() {
    if (!this.ctx || !this.synthGain || this.isMuted) return;

    const chord = this.ambientChords[this.currentChordIndex];
    this.currentChordIndex = (this.currentChordIndex + 1) % this.ambientChords.length;

    const now = this.ctx.currentTime;
    const chordDuration = 4.2;

    chord.forEach((freq, idx) => {
      if (!this.ctx || !this.synthGain) return;

      const osc = this.ctx.createOscillator();
      const noteGain = this.ctx.createGain();

      // Soft sine waves with gentle triangle for acoustic warmth
      osc.type = idx === 0 ? 'sine' : idx % 2 === 0 ? 'sine' : 'triangle';
      osc.frequency.setValueAtTime(freq, now);

      // Low pass filter for very warm, mellow ambient piano texture
      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(idx === 0 ? 320 : 900, now);

      // Very soft attack, sustained body, serene fade
      noteGain.gain.setValueAtTime(0, now);
      noteGain.gain.linearRampToValueAtTime(0.03 / (idx + 1), now + 0.9 + idx * 0.12);
      noteGain.gain.exponentialRampToValueAtTime(0.0001, now + chordDuration);

      osc.connect(filter);
      filter.connect(noteGain);
      noteGain.connect(this.synthGain);

      osc.start(now + idx * 0.06);
      osc.stop(now + chordDuration + 0.3);
    });
  }

  public pause() {
    this.isPlaying = false;
    if (this.audioElement) {
      this.audioElement.pause();
    }
    if (this.synthTimerId) {
      clearInterval(this.synthTimerId);
      this.synthTimerId = null;
    }
  }

  public stop() {
    this.isPlaying = false;
    this.fadeOutAudio(() => {
      if (this.audioElement) {
        this.audioElement.currentTime = 0;
      }
    });

    if (this.synthTimerId) {
      clearInterval(this.synthTimerId);
      this.synthTimerId = null;
    }
    if (this.synthGain && this.ctx) {
      try {
        this.synthGain.gain.linearRampToValueAtTime(0, this.ctx.currentTime + 0.3);
      } catch {
        // Safe fallback
      }
    }
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;

    if (this.audioElement) {
      this.audioElement.muted = this.isMuted;
      if (!this.isMuted) {
        this.audioElement.volume = this.targetVolume;
      }
    }

    if (this.synthGain && this.ctx) {
      this.synthGain.gain.setValueAtTime(this.isMuted ? 0 : this.targetVolume * 0.7, this.ctx.currentTime);
    }

    return this.isMuted;
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  public setVolume(volume: number) {
    this.targetVolume = Math.max(0, Math.min(1, volume));
    if (this.audioElement && !this.isMuted) {
      this.audioElement.volume = this.targetVolume;
    }
    if (this.synthGain && this.ctx && !this.isMuted) {
      this.synthGain.gain.setValueAtTime(this.targetVolume * 0.7, this.ctx.currentTime);
    }
  }
}

export const recapAudio = new RecapAudioPlayer();
