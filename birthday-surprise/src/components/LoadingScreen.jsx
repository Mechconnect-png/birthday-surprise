import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, Volume2, VolumeX } from 'lucide-react';
import { CONFIG } from '../data/config';

export default function LoadingScreen({ onComplete, isMuted, toggleMute }) {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState('loading'); // 'loading' | 'ready'

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => setPhase('ready'), 400);
          return 100;
        }
        return prev + Math.floor(Math.random() * 8) + 4;
      });
    }, 120);

    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0B0914] px-6 text-center overflow-hidden"
    >
      {/* Sound toggle floating button in loading screen */}
      <button
        onClick={toggleMute}
        className="absolute top-6 right-6 flex items-center gap-2 px-4 py-2 rounded-full glass-card text-xs text-pink-200 hover:text-white transition-all border border-pink-500/20 hover:border-pink-500/50"
      >
        {isMuted ? <VolumeX className="w-4 h-4 text-gray-400" /> : <Volume2 className="w-4 h-4 text-pink-400 animate-pulse" />}
        <span>{isMuted ? 'Sound Off' : 'Sound On'}</span>
      </button>

      {/* Ambient background glow for loading */}
      <div className="absolute w-[350px] h-[350px] bg-pink-600/20 rounded-full blur-[100px] animate-pulse-glow" />

      <AnimatePresence mode="wait">
        {phase === 'loading' ? (
          <motion.div
            key="loading-phase"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center max-w-md w-full relative z-10"
          >
            {/* Heartbeat Animated Icon */}
            <div className="relative mb-8">
              <motion.div
                animate={{ scale: [1, 1.2, 1.05, 1.25, 1] }}
                transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
                className="w-20 h-20 rounded-full bg-gradient-to-tr from-pink-500 to-rose-400 flex items-center justify-center shadow-glow-rose"
              >
                <Heart className="w-10 h-10 text-white fill-white" />
              </motion.div>
              <div className="absolute inset-0 rounded-full bg-pink-500/30 blur-md animate-ping pointer-events-none" />
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-lg md:text-xl font-serif text-pink-100/90 tracking-wide mb-6"
            >
              Something special is waiting for you...
            </motion.p>

            {/* Custom Glowing Progress Bar */}
            <div className="w-full h-2 bg-gray-800/80 rounded-full overflow-hidden p-0.5 border border-white/10 shadow-inner">
              <motion.div
                className="h-full bg-gradient-to-r from-pink-500 via-rose-400 to-amber-300 rounded-full shadow-glow-pink"
                style={{ width: `${progress}%` }}
                transition={{ ease: "easeOut" }}
              />
            </div>

            <div className="mt-3 flex justify-between w-full text-xs font-mono text-pink-300/60">
              <span>PREPARING SURPRISE</span>
              <span>{progress}%</span>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="ready-phase"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center max-w-lg relative z-10 px-4"
          >
            {/* Sparkling Badge */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-500/10 border border-pink-500/30 text-pink-300 text-sm mb-6"
            >
              <Sparkles className="w-4 h-4 text-amber-300 animate-spin" style={{ animationDuration: '4s' }} />
              <span>A Personal Digital Experience</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-3xl md:text-5xl font-serif font-bold text-white mb-3"
            >
              Hey <span className="text-gradient-romantic">{CONFIG.girlfriendName}</span> 👀
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="text-lg md:text-xl text-gray-300 font-light mb-10"
            >
              I have something special for you...
            </motion.p>

            {/* Glowing CTA Button */}
            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(255, 75, 145, 0.6)' }}
              whileTap={{ scale: 0.97 }}
              transition={{ delay: 1, duration: 0.4 }}
              onClick={onComplete}
              className="relative group px-8 py-4 rounded-full bg-gradient-to-r from-pink-500 via-rose-500 to-purple-600 text-white font-medium text-lg tracking-wide shadow-glow-pink overflow-hidden border border-white/20"
            >
              <span className="relative z-10 flex items-center gap-3">
                Open Your Surprise ✨
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-rose-400 via-pink-400 to-amber-300 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
