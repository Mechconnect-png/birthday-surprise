import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CONFIG } from '../data/config';
import { Music, Play, Pause, Volume2, VolumeX, Sparkles } from 'lucide-react';

export default function MusicPlayer({ autoPlayTrigger }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [volume, setVolume] = useState(0.7);
  const [showPrompt, setShowPrompt] = useState(true);

  const audioRef = useRef(null);
  const synthContextRef = useRef(null);
  const synthTimerRef = useRef(null);

  const musicData = CONFIG.music;

  // Auto-play when autoPlayTrigger becomes true (user clicks ENTER button)
  useEffect(() => {
    if (autoPlayTrigger && !isPlaying) {
      startPlayback();
    }
  }, [autoPlayTrigger]);

  // Web Audio Synth Generator for Happy Birthday Melody Fallback
  const startHappyBirthdaySynth = () => {
    try {
      if (!synthContextRef.current) {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        synthContextRef.current = new AudioCtx();
      }
      const ctx = synthContextRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      // Happy Birthday Melody Notes & Durations (in seconds)
      // Notes: G4, G4, A4, G4, C5, B4 | G4, G4, A4, G4, D5, C5 | G4, G4, G5, E5, C5, B4, A4 | F5, F5, E5, C5, D5, C5
      const notes = [
        { note: 392.00, duration: 0.35 }, { note: 392.00, duration: 0.25 }, { note: 440.00, duration: 0.5 }, { note: 392.00, duration: 0.5 }, { note: 523.25, duration: 0.5 }, { note: 493.88, duration: 0.9 },
        { note: 392.00, duration: 0.35 }, { note: 392.00, duration: 0.25 }, { note: 440.00, duration: 0.5 }, { note: 392.00, duration: 0.5 }, { note: 587.33, duration: 0.5 }, { note: 523.25, duration: 0.9 },
        { note: 392.00, duration: 0.35 }, { note: 392.00, duration: 0.25 }, { note: 783.99, duration: 0.5 }, { note: 659.25, duration: 0.5 }, { note: 523.25, duration: 0.5 }, { note: 493.88, duration: 0.5 }, { note: 440.00, duration: 0.7 },
        { note: 698.46, duration: 0.35 }, { note: 698.46, duration: 0.25 }, { note: 659.25, duration: 0.5 }, { note: 523.25, duration: 0.5 }, { note: 587.33, duration: 0.5 }, { note: 523.25, duration: 1.1 }
      ];

      let noteIndex = 0;

      const playNextNote = () => {
        if (!synthContextRef.current) return;
        const currentNote = notes[noteIndex];
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'triangle'; // Soft music-box bell synth tone
        osc.frequency.setValueAtTime(currentNote.note, ctx.currentTime);

        gain.gain.setValueAtTime(volume * 0.15, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + currentNote.duration);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start();
        osc.stop(ctx.currentTime + currentNote.duration);

        noteIndex = (noteIndex + 1) % notes.length;
        const nextDelay = (currentNote.duration + 0.08) * 1000;
        synthTimerRef.current = setTimeout(playNextNote, nextDelay);
      };

      playNextNote();
    } catch (e) {
      console.log('Synth fallback active');
    }
  };

  const stopHappyBirthdaySynth = () => {
    if (synthTimerRef.current) {
      clearTimeout(synthTimerRef.current);
      synthTimerRef.current = null;
    }
  };

  const startPlayback = () => {
    setShowPrompt(false);

    if (audioRef.current) {
      audioRef.current.volume = volume;
      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch(() => {
          // If mp3 fails to load or browser blocks audio, start Happy Birthday Synth
          startHappyBirthdaySynth();
          setIsPlaying(true);
        });
    } else {
      startHappyBirthdaySynth();
      setIsPlaying(true);
    }
  };

  const stopPlayback = () => {
    if (audioRef.current && !audioRef.current.paused) {
      audioRef.current.pause();
    }
    stopHappyBirthdaySynth();
    setIsPlaying(false);
  };

  const togglePlay = () => {
    if (isPlaying) {
      stopPlayback();
    } else {
      startPlayback();
    }
  };

  const handleVolumeChange = (e) => {
    const newVol = parseFloat(e.target.value);
    setVolume(newVol);
    if (audioRef.current) {
      audioRef.current.volume = newVol;
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end select-none">
      {/* Hidden Audio element pointing to config audio URL */}
      <audio
        ref={audioRef}
        src={musicData.audioUrl}
        loop
        onError={() => {
          // Fallback to Happy Birthday synth if external link fails
        }}
      />

      {/* Initial Interaction Floating Prompt */}
      <AnimatePresence>
        {showPrompt && !isPlaying && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            onClick={togglePlay}
            className="mb-3 cursor-pointer inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card border border-rose-400/40 text-xs font-sans text-white shadow-xl hover:border-rose-300 transition-all"
          >
            <Sparkles className="w-3.5 h-3.5 text-rose-300 animate-spin" />
            <span>{musicData.prompt}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Player Container */}
      <AnimatePresence mode="wait">
        {isExpanded ? (
          <motion.div
            key="expanded-player"
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="rounded-3xl glass-card border border-purple-400/30 p-4 shadow-2xl flex flex-col gap-3 min-w-[240px]"
          >
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-purple-500 to-rose-500 flex items-center justify-center text-white shadow-md">
                  <Music className={`w-4 h-4 ${isPlaying ? 'animate-spin' : ''}`} style={{ animationDuration: '6s' }} />
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-xs font-serif text-white font-medium">
                    ♪ {musicData.title}
                  </span>
                  <span className="text-[10px] font-mono text-purple-200/70">
                    {musicData.artist}
                  </span>
                </div>
              </div>

              <button
                onClick={() => setIsExpanded(false)}
                className="text-xs font-mono text-gray-400 hover:text-white px-2 py-1 glass-panel rounded-full"
              >
                ✕
              </button>
            </div>

            {/* Controls Row */}
            <div className="flex items-center justify-between gap-3 pt-2 border-t border-white/10">
              <button
                onClick={togglePlay}
                className="w-8 h-8 rounded-full bg-purple-500/20 hover:bg-purple-500/30 border border-purple-400/30 flex items-center justify-center text-white transition-colors"
              >
                {isPlaying ? <Pause className="w-4 h-4 text-rose-300" /> : <Play className="w-4 h-4 text-purple-300 ml-0.5" />}
              </button>

              <div className="flex items-center gap-2 flex-1">
                {volume === 0 ? <VolumeX className="w-3.5 h-3.5 text-gray-400" /> : <Volume2 className="w-3.5 h-3.5 text-purple-300" />}
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={volume}
                  onChange={handleVolumeChange}
                  className="w-full h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-rose-400"
                />
              </div>
            </div>
          </motion.div>
        ) : (
          /* Glass Floating Circle */
          <motion.button
            key="circle-button"
            onClick={() => setIsExpanded(true)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="relative group w-14 h-14 rounded-full glass-card border border-purple-400/40 shadow-[0_0_30px_rgba(167,139,250,0.3)] flex items-center justify-center text-white hover:border-rose-300 transition-all duration-300"
          >
            {isPlaying && (
              <div className="absolute inset-0 rounded-full border border-rose-400/40 animate-ping opacity-40 pointer-events-none" />
            )}
            <Music className={`w-6 h-6 text-purple-300 group-hover:text-rose-300 transition-colors ${isPlaying ? 'animate-pulse' : ''}`} />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
