import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Play, Pause, Music, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { storyData } from '../data/story';
import { soundEngine } from '../utils/soundEngine';

interface MusicControllerProps {
  autoPlayTrigger?: boolean;
}

export const MusicController: React.FC<MusicControllerProps> = ({ autoPlayTrigger }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.65);
  const [isExpanded, setIsExpanded] = useState(false);
  const [usingFallbackSynth, setUsingFallbackSynth] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Initialize audio or synth when triggered
  useEffect(() => {
    if (!autoPlayTrigger) return;

    const audio = audioRef.current;
    if (audio) {
      audio.volume = volume;
      audio.play().then(() => {
        setIsPlaying(true);
        setUsingFallbackSynth(false);
      }).catch(() => {
        // Fallback to synthesized ambient music
        soundEngine.startSynthesizedAmbience();
        soundEngine.setVolume(volume);
        setIsPlaying(true);
        setUsingFallbackSynth(true);
      });
    } else {
      soundEngine.startSynthesizedAmbience();
      soundEngine.setVolume(volume);
      setIsPlaying(true);
      setUsingFallbackSynth(true);
    }
  }, [autoPlayTrigger]);

  const togglePlay = () => {
    if (isPlaying) {
      if (audioRef.current && !usingFallbackSynth) {
        audioRef.current.pause();
      } else {
        soundEngine.stopSynthesizedAmbience();
      }
      setIsPlaying(false);
    } else {
      if (audioRef.current && !usingFallbackSynth) {
        audioRef.current.play().then(() => {
          setIsPlaying(true);
        }).catch(() => {
          soundEngine.startSynthesizedAmbience();
          setUsingFallbackSynth(true);
          setIsPlaying(true);
        });
      } else {
        soundEngine.startSynthesizedAmbience();
        setIsPlaying(true);
      }
    }
  };

  const toggleMute = () => {
    const nextMute = !isMuted;
    setIsMuted(nextMute);
    if (audioRef.current) {
      audioRef.current.muted = nextMute;
    }
    soundEngine.setMute(nextMute);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    if (audioRef.current) {
      audioRef.current.volume = val;
    }
    soundEngine.setVolume(val);
    if (val === 0) {
      setIsMuted(true);
    } else if (isMuted) {
      setIsMuted(false);
    }
  };

  const handleAudioError = () => {
    // If MP3 file is missing, seamlessly switch to synthesized ambient music without error
    if (isPlaying) {
      soundEngine.startSynthesizedAmbience();
      setUsingFallbackSynth(true);
    }
  };

  return (
    <>
      <audio
        ref={audioRef}
        src={storyData.favoriteSong.src}
        loop
        preload="auto"
        onError={handleAudioError}
      />

      <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-2 select-none">
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              className="px-4 py-3 rounded-2xl bg-[#12121e]/90 backdrop-blur-xl border border-purple-500/20 shadow-2xl flex flex-col gap-3 min-w-[220px]"
            >
              <div className="flex items-center justify-between gap-3 border-b border-white/5 pb-2">
                <div className="flex items-center gap-2 overflow-hidden">
                  <Music className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                  <div className="truncate">
                    <p className="text-xs font-semibold text-white truncate">
                      {storyData.favoriteSong.title}
                    </p>
                    <p className="text-[10px] text-gray-400 truncate">
                      {usingFallbackSynth ? 'Ethereal Chime Ambience' : storyData.favoriteSong.artist}
                    </p>
                  </div>
                </div>
                {usingFallbackSynth && (
                  <span className="text-[9px] px-1.5 py-0.5 rounded bg-purple-500/20 text-purple-300 font-mono flex items-center gap-1">
                    <Sparkles className="w-2.5 h-2.5" /> LIVE
                  </span>
                )}
              </div>

              {/* Volume Slider */}
              <div className="flex items-center gap-3">
                <button
                  onClick={toggleMute}
                  className="p-1 rounded-lg hover:bg-white/10 text-gray-300 hover:text-white transition"
                  aria-label={isMuted ? 'Unmute' : 'Mute'}
                >
                  {isMuted || volume === 0 ? (
                    <VolumeX className="w-4 h-4 text-rose-400" />
                  ) : (
                    <Volume2 className="w-4 h-4 text-purple-300" />
                  )}
                </button>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={isMuted ? 0 : volume}
                  onChange={handleVolumeChange}
                  className="w-full h-1.5 bg-gray-700/60 rounded-lg appearance-none cursor-pointer accent-purple-400"
                />
                <span className="text-[10px] font-mono text-gray-400 w-6 text-right">
                  {isMuted ? '0%' : `${Math.round(volume * 100)}%`}
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Floating Pill Button */}
        <div className="flex items-center gap-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-2.5 px-3.5 py-2 rounded-full bg-[#12121e]/85 hover:bg-[#181829]/95 backdrop-blur-xl border border-purple-500/25 shadow-lg shadow-purple-900/20 text-xs font-medium text-purple-200 transition"
          >
            {/* Equalizer Waveform Indicator */}
            <div className="flex items-end gap-0.5 h-3.5 w-4">
              <span
                className={`w-1 bg-purple-400 rounded-full transition-all duration-300 ${
                  isPlaying ? 'animate-[bounce_0.8s_infinite]' : 'h-1'
                }`}
                style={{ height: isPlaying ? '100%' : '20%' }}
              />
              <span
                className={`w-1 bg-rose-400 rounded-full transition-all duration-300 ${
                  isPlaying ? 'animate-[bounce_1.1s_infinite_0.2s]' : 'h-1.5'
                }`}
                style={{ height: isPlaying ? '70%' : '30%' }}
              />
              <span
                className={`w-1 bg-amber-300 rounded-full transition-all duration-300 ${
                  isPlaying ? 'animate-[bounce_0.9s_infinite_0.4s]' : 'h-2'
                }`}
                style={{ height: isPlaying ? '90%' : '40%' }}
              />
            </div>

            <span className="hidden sm:inline font-sans text-xs tracking-wide">
              {isPlaying ? 'Music Playing' : 'Music Paused'}
            </span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            onClick={togglePlay}
            className="p-2.5 rounded-full bg-gradient-to-tr from-purple-600 to-pink-500 text-white shadow-lg shadow-purple-600/30 hover:shadow-purple-500/50 transition"
            aria-label={isPlaying ? 'Pause Audio' : 'Play Audio'}
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 translate-x-0.5" />}
          </motion.button>
        </div>
      </div>
    </>
  );
};
