import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Heart, ChevronRight } from 'lucide-react';
import { storyData } from '../data/story';
import { handleImageError } from '../utils/imageFallback';
import { soundEngine } from '../utils/soundEngine';

interface UniverseFinaleProps {
  onComplete: () => void;
}

export const UniverseFinale: React.FC<UniverseFinaleProps> = ({ onComplete }) => {
  const [phase, setPhase] = useState(0); // 0: Zoom out, 1: Quote 1, 2: Quote 2, 3: Climax reveal & Advance button

  useEffect(() => {
    soundEngine.setVolume(0.7);

    const t1 = setTimeout(() => {
      setPhase(1);
      soundEngine.playSparkle();
    }, 1800);

    const t2 = setTimeout(() => {
      setPhase(2);
      soundEngine.playSparkle();
    }, 4600);

    const t3 = setTimeout(() => {
      setPhase(3);
      soundEngine.playShimmerClimax();
    }, 7800);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, filter: 'blur(10px)' }}
      transition={{ duration: 1.2 }}
      className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 text-center select-none overflow-hidden"
    >
      {/* Dynamic Orbiting Galaxy Constellation Rings */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center overflow-hidden">
        {/* Core Radiance */}
        <div className="w-[450px] sm:w-[650px] h-[450px] sm:h-[650px] rounded-full bg-radial from-purple-600/25 via-pink-600/15 to-transparent blur-[100px] animate-pulse-glow" />

        {/* Orbiting Celestial Circles */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
          className="w-[320px] sm:w-[480px] h-[320px] sm:h-[480px] rounded-full border border-purple-400/20 border-dashed"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 45, repeat: Infinity, ease: 'linear' }}
          className="w-[400px] sm:w-[580px] h-[400px] sm:h-[580px] rounded-full border border-pink-400/20 border-dotted"
        />
      </div>

      {/* Center Her Photo in Constellation Star Aura */}
      <motion.div
        initial={{ scale: 0.7, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 flex flex-col items-center my-auto max-w-2xl space-y-8"
      >
        {/* Photo with Glowing Starburst Border */}
        <div className="relative">
          {/* Outer glow ring */}
          <div className="absolute -inset-3 rounded-full bg-gradient-to-r from-purple-500 via-rose-500 to-amber-400 blur-xl opacity-70 animate-pulse" />

          <div className="relative w-44 h-44 sm:w-56 sm:h-56 rounded-full overflow-hidden border-2 border-white/40 shadow-[0_0_50px_rgba(244,114,182,0.6)]">
            <img
              src={storyData.bestPhoto.src}
              alt={storyData.girlfriendName}
              onError={(e) => handleImageError(e, 'best-photo')}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Floating constellation stars around photo */}
          <Sparkles className="absolute -top-2 -right-2 w-7 h-7 text-amber-300 animate-spin" style={{ animationDuration: '8s' }} />
          <Heart className="absolute -bottom-2 -left-2 w-6 h-6 text-rose-400 fill-rose-400 animate-bounce" />
        </div>

        {/* Narrative Text Timed Sequence */}
        <div className="space-y-4 min-h-[140px] flex flex-col items-center justify-center">
          <AnimatePresence>
            {phase >= 1 && (
              <motion.p
                key="quote-1"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2 }}
                className="text-lg sm:text-2xl font-serif text-gray-300 font-light italic"
              >
                "{storyData.universeFinaleQuote1}"
              </motion.p>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {phase >= 2 && (
              <motion.p
                key="quote-2"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2 }}
                className="text-lg sm:text-2xl font-serif text-rose-200 font-light"
              >
                "{storyData.universeFinaleQuote2}"
              </motion.p>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {phase >= 3 && (
              <motion.h2
                key="climax"
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                className="text-2xl sm:text-4xl md:text-5xl font-serif font-medium text-white tracking-wide bg-gradient-to-r from-amber-200 via-rose-200 to-purple-200 bg-clip-text text-transparent drop-shadow-[0_0_35px_rgba(244,114,182,0.8)] pt-2"
              >
                {storyData.universeFinaleClimax}
              </motion.h2>
            )}
          </AnimatePresence>
        </div>

        {/* Advance Button */}
        <AnimatePresence>
          {phase >= 3 && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="pt-4"
            >
              <button
                onClick={onComplete}
                className="px-8 py-3.5 rounded-full bg-gradient-to-r from-purple-600 via-pink-600 to-amber-500 text-white font-medium text-sm flex items-center gap-2 shadow-2xl shadow-purple-900/40 hover:scale-105 active:scale-95 transition"
              >
                <span>Open Final Surprise</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};
