import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { CONFIG } from '../data/config';
import { Gift, Sparkles } from 'lucide-react';

export default function GiftSurprise() {
  const [suspensePhase, setSuspensePhase] = useState(0);
  const [isShaking, setIsShaking] = useState(false);

  const surpriseData = CONFIG.surprise;

  const handleInView = () => {
    setTimeout(() => setSuspensePhase(1), 2200);
    setTimeout(() => setSuspensePhase(2), 4400);
    setTimeout(() => setSuspensePhase(3), 6600);
  };

  const handleOpenGift = () => {
    setIsShaking(true);

    setTimeout(() => {
      confetti({
        particleCount: 120,
        spread: 100,
        origin: { y: 0.6 },
        colors: ['#FBBF24', '#F9A8D4', '#A78BFA', '#FFFFFF']
      });

      setTimeout(() => {
        confetti({
          particleCount: 80,
          angle: 60,
          spread: 80,
          origin: { x: 0.1, y: 0.6 },
          colors: ['#FBBF24', '#F9A8D4']
        });
        confetti({
          particleCount: 80,
          angle: 120,
          spread: 80,
          origin: { x: 0.9, y: 0.6 },
          colors: ['#A78BFA', '#FFFFFF']
        });
      }, 350);

      setIsShaking(false);
      setSuspensePhase(4);
    }, 1200);
  };

  return (
    <motion.section
      onViewportEnter={handleInView}
      viewport={{ once: true }}
      className="relative min-h-screen w-full flex flex-col items-center justify-center py-20 px-6 overflow-hidden bg-[#08080D] select-none"
    >
      <AnimatePresence>
        {suspensePhase === 4 && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              className="absolute inset-0 bg-gradient-to-t from-purple-900/30 via-rose-900/20 to-amber-900/30 blur-3xl pointer-events-none"
            />
            <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-purple-500/30 rounded-full blur-[140px] animate-aurora pointer-events-none" />
            <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-rose-400/30 rounded-full blur-[140px] animate-aurora pointer-events-none" style={{ animationDelay: '-5s' }} />
          </>
        )}
      </AnimatePresence>

      <div className="relative z-10 w-full max-w-4xl flex flex-col items-center text-center">
        <AnimatePresence mode="wait">
          {suspensePhase === 0 && (
            <motion.div
              key="suspense-0"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 1 }}
              className="text-2xl sm:text-4xl font-serif font-light text-gray-400 tracking-widest"
            >
              "{surpriseData.suspense1}"
            </motion.div>
          )}

          {suspensePhase === 1 && (
            <motion.div
              key="suspense-1"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 1 }}
              className="text-2xl sm:text-4xl font-serif font-light text-gray-300 tracking-widest"
            >
              "{surpriseData.suspense2}"
            </motion.div>
          )}

          {suspensePhase === 2 && (
            <motion.div
              key="suspense-2"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 1 }}
              className="text-2xl sm:text-4xl font-display text-rose-300 tracking-wide"
            >
              "{surpriseData.suspense3}"
            </motion.div>
          )}

          {suspensePhase === 3 && (
            <motion.div
              key="gift-box"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.2 }}
              transition={{ duration: 1.2 }}
              className="flex flex-col items-center gap-6"
            >
              <motion.button
                onClick={handleOpenGift}
                animate={isShaking ? { rotate: [-4, 4, -4, 4, 0], scale: [1, 1.1, 1.05, 1.15, 1] } : { y: [0, -10, 0] }}
                transition={isShaking ? { duration: 0.6, repeat: 2 } : { repeat: Infinity, duration: 4, ease: 'easeInOut' }}
                className="relative group p-8 rounded-3xl glass-card border border-amber-400/40 shadow-[0_0_50px_rgba(251,191,36,0.3)] hover:border-amber-300 transition-all duration-300"
              >
                <div className="absolute inset-[-10px] rounded-3xl bg-gradient-to-tr from-amber-400/30 via-rose-500/30 to-purple-500/30 blur-xl group-hover:opacity-100 opacity-70 transition-opacity pointer-events-none" />

                <Gift className="w-16 h-16 sm:w-20 sm:h-20 text-amber-300 group-hover:scale-1.1 transition-transform drop-shadow-[0_0_15px_#FBBF24]" />
              </motion.button>

              <span className="text-xs font-sans tracking-[0.25em] uppercase text-amber-200 glass-panel px-4 py-1.5 rounded-full border border-amber-500/30 animate-pulse">
                {surpriseData.prompt}
              </span>
            </motion.div>
          )}

          {suspensePhase === 4 && (
            <motion.div
              key="climax-reveal"
              initial={{ opacity: 0, scale: 0.8, filter: 'blur(16px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center space-y-6"
            >
              <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full border border-amber-400/30 glass-panel text-amber-300 text-xs font-sans tracking-widest uppercase">
                <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-spin" />
                <span>THE GRAND SURPRISE</span>
              </div>

              {/* Climax Heading */}
              <div className="space-y-1">
                <h2 className="text-3xl sm:text-5xl font-serif text-white tracking-widest font-extralight">
                  {surpriseData.birthdayTitle}
                </h2>
                <h1 className="text-5xl sm:text-7xl md:text-8xl font-display text-gradient-gold drop-shadow-[0_12px_40px_rgba(251,191,36,0.5)]">
                  {CONFIG.girlfriendName}
                </h1>
                <motion.div
                  animate={{ scale: [1, 1.25, 1] }}
                  transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
                  className="inline-block text-rose-400 text-3xl sm:text-5xl mt-2"
                >
                  ❤️
                </motion.div>
              </div>

              <div className="max-w-xl pt-5 border-t border-white/10 space-y-2">
                <p className="text-base sm:text-xl font-sans font-light text-gray-200 leading-relaxed">
                  "{surpriseData.finalBlessing}"
                </p>
                <p className="text-lg sm:text-2xl font-display text-rose-300 italic">
                  "{surpriseData.keepBeingYou}"
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.section>
  );
}
