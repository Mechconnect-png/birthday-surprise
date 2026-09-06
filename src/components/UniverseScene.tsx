import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Sparkles } from 'lucide-react';
import { storyData } from '../data/story';
import { soundEngine } from '../utils/soundEngine';

interface UniverseSceneProps {
  onNext: () => void;
}

export const UniverseScene: React.FC<UniverseSceneProps> = ({ onNext }) => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    // Step 0: Initial Universe drift
    const t1 = setTimeout(() => {
      setStep(1); // "Before you were born..."
      soundEngine.playSparkle();
    }, 1500);

    const t2 = setTimeout(() => {
      setStep(2); // "The universe was already preparing something beautiful."
      soundEngine.playSparkle();
    }, 4500);

    const t3 = setTimeout(() => {
      setStep(3); // Show advance button
    }, 7500);

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
      exit={{ opacity: 0, scale: 1.15, filter: 'blur(12px)' }}
      transition={{ duration: 1.2 }}
      className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 text-center select-none overflow-hidden"
    >
      {/* Dynamic Cosmic Nebulae & Light Rays */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center overflow-hidden">
        <motion.div
          animate={{ scale: [1, 1.25, 1], rotate: [0, 45, 0], opacity: [0.18, 0.35, 0.18] }}
          transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
          className="w-[600px] sm:w-[850px] h-[600px] sm:h-[850px] rounded-full bg-radial from-purple-700/25 via-pink-600/10 to-transparent blur-[140px]"
        />
        <motion.div
          animate={{ scale: [1.2, 0.9, 1.2], rotate: [0, -30, 0], opacity: [0.15, 0.28, 0.15] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute w-[500px] sm:w-[700px] h-[500px] sm:h-[700px] rounded-full bg-radial from-amber-500/15 via-indigo-600/15 to-transparent blur-[120px]"
        />
      </div>

      {/* Floating Constellation Stardust Badge */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2 }}
        className="mb-8 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-purple-400/20 backdrop-blur-md shadow-lg"
      >
        <Sparkles className="w-3.5 h-3.5 text-purple-300 animate-pulse" />
        <span className="text-xs uppercase tracking-[0.25em] text-purple-200/90 font-mono">
          ACT I : THE COSMOS
        </span>
      </motion.div>

      {/* Cinematic Text Reveal Progression */}
      <div className="max-w-2xl mx-auto min-h-[180px] flex flex-col items-center justify-center space-y-6">
        <AnimatePresence mode="wait">
          {step >= 1 && (
            <motion.p
              key="quote-1"
              initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
              className="text-2xl sm:text-3xl md:text-4xl font-serif text-gray-300 font-light tracking-wide italic"
            >
              "{storyData.universeQuotes[0]}"
            </motion.p>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {step >= 2 && (
            <motion.h2
              key="quote-2"
              initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 1.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-3xl sm:text-4xl md:text-5xl font-serif text-white leading-relaxed font-normal bg-gradient-to-r from-white via-purple-100 to-rose-200 bg-clip-text text-transparent drop-shadow-lg"
            >
              {storyData.universeQuotes[1]}
            </motion.h2>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {step >= 2 && storyData.universeQuotes[2] && (
            <motion.p
              key="quote-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 2, delay: 1 }}
              className="text-sm sm:text-base text-gray-400 font-sans tracking-widest uppercase font-light"
            >
              {storyData.universeQuotes[2]}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {/* Advance / Continue prompt */}
      <AnimatePresence>
        {step >= 3 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="mt-14"
          >
            <button
              onClick={onNext}
              className="group flex flex-col items-center gap-2 text-purple-200/80 hover:text-white transition duration-300"
            >
              <span className="text-xs uppercase tracking-[0.2em] font-sans font-medium">
                Travel toward Earth
              </span>
              <motion.div
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                className="p-2.5 rounded-full bg-purple-500/10 border border-purple-400/30 group-hover:bg-purple-500/20 group-hover:border-purple-300 transition shadow-lg"
              >
                <ChevronDown className="w-5 h-5 text-purple-300 group-hover:text-white" />
              </motion.div>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
