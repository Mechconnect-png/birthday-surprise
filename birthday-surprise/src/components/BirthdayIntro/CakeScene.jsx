import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CONFIG } from '../../data/config';
import { Sparkles } from 'lucide-react';

export default function CakeScene({ onBlowOut }) {
  const [wishStep, setWishStep] = useState(0); // 0: "Close your eyes...", 1: "Make a wish.", 2: "Now... make it come true.", 3: Show Button

  useEffect(() => {
    // 1.6s -> "Make a wish."
    const timer1 = setTimeout(() => setWishStep(1), 1600);

    // 3.4s -> "Now... make it come true."
    const timer2 = setTimeout(() => setWishStep(2), 3400);

    // 4.8s -> Show BLOW OUT THE CANDLES button
    const timer3 = setTimeout(() => setWishStep(3), 4800);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  const handleScreenClick = () => {
    if (wishStep < 3) {
      setWishStep(3);
    }
  };

  return (
    <motion.div
      onClick={handleScreenClick}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, filter: 'blur(16px)' }}
      transition={{ duration: 1 }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#050505] px-6 text-center select-none overflow-hidden cursor-pointer"
    >
      {/* Overhead Spotlight Beam Reveal */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[900px] bg-gradient-to-b from-purple-500/15 via-rose-400/5 to-transparent blur-3xl pointer-events-none" />

      {/* Floating Particles in Center Glow */}
      <div className="absolute w-[400px] h-[400px] rounded-full bg-amber-500/10 blur-[150px] pointer-events-none animate-pulse-glow" />

      {/* Narrative Wish Typography Above Cake */}
      <div className="relative z-20 min-h-[90px] flex items-center justify-center mb-4 max-w-xl">
        <AnimatePresence mode="wait">
          {wishStep === 0 && (
            <motion.p
              key="wish-0"
              initial={{ opacity: 0, y: 15, filter: 'blur(8px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -15, filter: 'blur(8px)' }}
              transition={{ duration: 1 }}
              className="text-2xl sm:text-4xl font-serif font-light text-gray-300 tracking-wider"
            >
              "{CONFIG.wishText1}"
            </motion.p>
          )}

          {wishStep === 1 && (
            <motion.p
              key="wish-1"
              initial={{ opacity: 0, y: 15, filter: 'blur(8px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -15, filter: 'blur(8px)' }}
              transition={{ duration: 1 }}
              className="text-3xl sm:text-5xl font-display font-light text-rose-300 tracking-wide"
            >
              "{CONFIG.wishText2}"
            </motion.p>
          )}

          {(wishStep === 2 || wishStep === 3) && (
            <motion.p
              key="wish-2"
              initial={{ opacity: 0, y: 15, filter: 'blur(8px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 1 }}
              className="text-2xl sm:text-4xl font-display font-light text-gradient-gold tracking-wide"
            >
              "{CONFIG.wishText3}"
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {/* Multi-Layer Elegant Cake Container */}
      <motion.div
        initial={{ y: 160, opacity: 0, scale: 0.85 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 flex flex-col items-center my-3"
      >
        {/* Floating Animation Wrapper */}
        <motion.div
          animate={{ y: [0, -10, 0], rotate: [0, 1, -1, 0] }}
          transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }}
          className="relative flex flex-col items-center"
        >
          {/* CANDLES ON CAKE TOP */}
          <div className="flex justify-center gap-6 sm:gap-8 mb-[-4px] z-20">
            {[1, 2, 3].map((candleId) => (
              <div key={candleId} className="relative flex flex-col items-center">
                {/* Flame with Realistic Flicker */}
                <motion.div
                  animate={{
                    scale: [1, 1.2, 0.95, 1.15, 1],
                    opacity: [0.9, 1, 0.85, 1, 0.9],
                    rotate: [-3, 3, -2, 2, 0]
                  }}
                  transition={{ repeat: Infinity, duration: 1.2 + candleId * 0.2, ease: 'easeInOut' }}
                  className="w-4 h-7 rounded-full bg-gradient-to-t from-amber-500 via-yellow-300 to-white shadow-[0_0_20px_#F59E0B] relative"
                >
                  <div className="absolute inset-[-6px] rounded-full bg-amber-400/40 blur-sm pointer-events-none" />
                </motion.div>

                {/* Candle Stick */}
                <div className="w-2.5 h-12 bg-gradient-to-b from-rose-200 via-purple-300 to-purple-400 rounded-t-sm shadow-md border-x border-white/20" />
              </div>
            ))}
          </div>

          {/* ELEGANT 3-TIER BIRTHDAY CAKE */}
          <div className="relative flex flex-col items-center">
            {/* Top Cake Tier */}
            <div className="w-36 sm:w-44 h-16 rounded-t-2xl bg-gradient-to-b from-[#1E1938] via-[#18122B] to-[#120D22] border-t-2 border-rose-300/40 shadow-xl flex items-center justify-center relative overflow-hidden">
              <div className="absolute top-0 inset-x-0 h-3 bg-rose-300/20 rounded-t-2xl blur-[1px]" />
              <div className="flex gap-2 text-rose-300/60 text-xs">
                <span>✦</span>
                <span>✦</span>
                <span>✦</span>
              </div>
            </div>

            {/* Middle Cake Tier */}
            <div className="w-52 sm:w-64 h-20 bg-gradient-to-b from-[#18122B] via-[#140F24] to-[#0E0A1A] border-t-2 border-purple-400/40 shadow-2xl flex items-center justify-center relative overflow-hidden">
              <div className="absolute top-0 inset-x-0 h-4 bg-purple-400/20 blur-[1px]" />
              <div className="flex gap-4 text-purple-200/50 text-xs font-serif italic">
                <span>• pure magic •</span>
              </div>
            </div>

            {/* Bottom Cake Tier */}
            <div className="w-68 sm:w-84 h-24 rounded-b-2xl bg-gradient-to-b from-[#140F24] via-[#0E0A1A] to-[#08050E] border-t-2 border-amber-400/40 shadow-2xl flex items-center justify-center relative overflow-hidden">
              <div className="absolute top-0 inset-x-0 h-4 bg-amber-400/20 blur-[1px]" />
              <span className="text-amber-200/70 text-xs tracking-[0.4em] uppercase font-sans">
                HAPPY BIRTHDAY
              </span>
            </div>

            {/* Glass Pedestal Stand */}
            <div className="w-72 sm:w-92 h-5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl mt-1" />
            <div className="w-24 sm:w-32 h-6 bg-gradient-to-b from-white/10 to-transparent blur-[2px]" />
          </div>
        </motion.div>
      </motion.div>

      {/* Circular Interactive Button: BLOW OUT THE CANDLES 💨 */}
      <AnimatePresence>
        {wishStep === 3 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85 }}
            transition={{ duration: 0.8 }}
            className="relative z-30 mt-4"
            onClick={(e) => e.stopPropagation()}
          >
            <motion.button
              onClick={onBlowOut}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.94 }}
              className="group relative flex items-center justify-center px-8 py-4 rounded-full border border-amber-400/50 bg-gradient-to-r from-amber-500/20 via-rose-500/20 to-purple-600/20 backdrop-blur-xl shadow-[0_0_50px_rgba(251,191,36,0.25)] hover:border-amber-300 transition-all duration-300"
            >
              <div className="absolute inset-[-8px] rounded-full border border-amber-400/20 animate-ping opacity-40 pointer-events-none" />

              <span className="flex items-center gap-3 font-display text-base sm:text-lg text-white tracking-widest uppercase font-light group-hover:text-amber-200 transition-colors">
                <Sparkles className="w-4 h-4 text-amber-300 animate-spin" />
                {CONFIG.blowButton}
              </span>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
