import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Heart } from 'lucide-react';
import { storyData } from '../data/story';
import { soundEngine } from '../utils/soundEngine';

interface BirthSceneProps {
  onComplete: () => void;
}

export const BirthScene: React.FC<BirthSceneProps> = ({ onComplete }) => {
  const [phase, setPhase] = useState(0); // 0: Darkness & "And then...", 1: Golden Light & Baby Silhouette, 2: "Someone very special was born", 3: Transition to Cake

  useEffect(() => {
    // 0 -> 1: Golden light & Silhouette
    const t1 = setTimeout(() => {
      setPhase(1);
      soundEngine.playSparkle();
    }, 2400);

    // 1 -> 2: Text reveal
    const t2 = setTimeout(() => {
      setPhase(2);
      soundEngine.playSparkle();
    }, 5400);

    // 2 -> 3: Next scene
    const t3 = setTimeout(() => {
      setPhase(3);
    }, 9000);

    const t4 = setTimeout(() => {
      onComplete();
    }, 10200);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, filter: 'blur(10px)' }}
      transition={{ duration: 1 }}
      className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 text-center select-none overflow-hidden bg-black/90"
    >
      {/* Symbolic Golden Lens Flare & Ethereal Rays */}
      <AnimatePresence>
        {phase >= 1 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.3 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2.5, ease: 'easeOut' }}
            className="absolute inset-0 pointer-events-none flex items-center justify-center"
          >
            {/* Ambient Golden Halo */}
            <div className="w-[350px] sm:w-[550px] h-[350px] sm:h-[550px] rounded-full bg-gradient-to-tr from-amber-500/25 via-rose-400/20 to-yellow-200/30 blur-[90px] animate-pulse-glow" />

            {/* Rotating Subtle Celestial Ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
              className="w-[280px] sm:w-[420px] h-[280px] sm:h-[420px] rounded-full border border-amber-300/30 border-dashed"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Center Symbolic Baby Girl Silhouette & Radiant Aura */}
      <div className="relative flex flex-col items-center justify-center min-h-[320px] my-auto">
        <AnimatePresence mode="wait">
          {phase === 0 && (
            <motion.h2
              key="and-then"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 1.2 }}
              className="text-3xl sm:text-5xl font-serif text-gray-300 font-light tracking-wide italic"
            >
              {storyData.birthQuotes[0] || 'And then…'}
            </motion.h2>
          )}

          {phase >= 1 && (
            <motion.div
              key="silhouette-container"
              initial={{ opacity: 0, scale: 0.7, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center gap-6"
            >
              {/* Symbolic Baby Silhouette Artwork with Warm Golden Glow */}
              <div className="relative w-44 h-44 sm:w-56 sm:h-56 rounded-full flex items-center justify-center p-4 bg-gradient-to-b from-amber-500/10 via-rose-500/10 to-transparent border border-amber-400/30 shadow-[0_0_50px_rgba(251,191,36,0.3)]">
                {/* Floating Stardust Particles */}
                <motion.div
                  animate={{ y: [-4, 4, -4], rotate: [0, 5, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                  className="relative z-10 flex flex-col items-center justify-center"
                >
                  {/* Stylized Silhouette Vector (Sleeping baby in moon/star cradle) */}
                  <svg
                    viewBox="0 0 100 100"
                    className="w-28 h-28 sm:w-36 sm:h-36 drop-shadow-[0_0_15px_rgba(251,191,36,0.8)] fill-amber-100"
                  >
                    {/* Golden Crescent Cradle */}
                    <path
                      d="M65,15 A40,40 0 1,0 85,60 A32,32 0 1,1 65,15 Z"
                      fill="url(#goldGrad)"
                      opacity="0.9"
                    />
                    {/* Sleeping Baby Silhouette */}
                    <circle cx="48" cy="46" r="10" fill="#FFFDF0" />
                    <path
                      d="M42,54 C38,62 44,70 54,68 C62,66 65,58 58,54 Z"
                      fill="#FFFDF0"
                      opacity="0.95"
                    />
                    {/* Star above */}
                    <polygon
                      points="72,25 74,29 78,30 75,33 76,37 72,35 68,37 69,33 66,30 70,29"
                      fill="#FDE68A"
                    />
                    <defs>
                      <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#FFFBEB" />
                        <stop offset="50%" stopColor="#FCD34D" />
                        <stop offset="100%" stopColor="#F59E0B" />
                      </linearGradient>
                    </defs>
                  </svg>
                </motion.div>

                {/* Sparkling Embers */}
                <div className="absolute top-2 right-4">
                  <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
                </div>
                <div className="absolute bottom-4 left-4">
                  <Sparkles className="w-3.5 h-3.5 text-rose-300 animate-pulse" />
                </div>
              </div>

              {/* Text Reveal */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: phase >= 2 ? 1 : 0, y: phase >= 2 ? 0 : 15 }}
                transition={{ duration: 1.4 }}
                className="space-y-3 max-w-lg"
              >
                <h2 className="text-2xl sm:text-4xl font-serif text-white font-light tracking-wide drop-shadow-md">
                  {storyData.birthQuotes[1] || 'Someone very special was born.'}
                </h2>
                <p className="text-xs sm:text-sm uppercase tracking-[0.2em] text-amber-300/80 font-mono">
                  {storyData.birthQuotes[2] || 'A pure soul full of light and beauty'}
                </p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Skip button */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        whileHover={{ opacity: 1 }}
        onClick={onComplete}
        className="mt-8 text-xs uppercase tracking-widest text-gray-500 hover:text-white transition"
      >
        Continue ➔
      </motion.button>
    </motion.div>
  );
};
