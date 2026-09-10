import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Gift, Heart, Sparkles, X, Star } from 'lucide-react';
import { CONFIG } from '../data/config';

export default function SurpriseGift() {
  const [modalOpen, setModalOpen] = useState(false);
  const [giftState, setGiftState] = useState('closed'); // 'closed' | 'shaking' | 'opened'

  const openSurpriseModal = () => {
    setModalOpen(true);
    setGiftState('closed');
  };

  const handleGiftClick = () => {
    if (giftState === 'opened') return;

    setGiftState('shaking');

    setTimeout(() => {
      setGiftState('opened');

      // Grand Confetti Burst Sequence
      const duration = 3 * 1000;
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 9999 };

      function randomInRange(min, max) {
        return Math.random() * (max - min) + min;
      }

      const interval = setInterval(function() {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);

        confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
        confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
      }, 250);
    }, 1200);
  };

  const closeModal = () => {
    setModalOpen(false);
    setGiftState('closed');
  };

  return (
    <section className="py-24 px-4 relative z-20 overflow-hidden">
      <div className="max-w-4xl mx-auto text-center">
        <div className="glass-card p-10 md:p-14 rounded-3xl border border-pink-500/30 shadow-glow-pink relative overflow-hidden bg-gradient-to-r from-pink-950/40 via-purple-950/40 to-rose-950/40">
          
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-500/20 text-pink-300 border border-pink-500/40 text-xs font-semibold uppercase tracking-widest mb-6"
          >
            <Sparkles className="w-4 h-4 text-amber-300 animate-spin" />
            <span>Mystery Unlocked</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-5xl font-serif font-bold text-white mb-4"
          >
            Wait... there's one more thing 👀
          </motion.h2>

          <p className="text-gray-300 text-base sm:text-lg max-w-md mx-auto mb-8 font-light">
            I saved the best for last. Are you ready for your final birthday surprise?
          </p>

          <motion.button
            whileHover={{ scale: 1.08, boxShadow: '0 0 45px rgba(255, 75, 145, 0.7)' }}
            whileTap={{ scale: 0.95 }}
            onClick={openSurpriseModal}
            className="px-10 py-5 rounded-full bg-gradient-to-r from-pink-500 via-rose-500 to-amber-500 text-white font-serif font-bold text-xl tracking-wide shadow-glow-rose border border-white/30 cursor-pointer"
          >
            Click Carefully 🎁
          </motion.button>
        </div>
      </div>

      {/* Full-screen Surprise Modal */}
      <AnimatePresence>
        {modalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#0B0914]/95 backdrop-blur-2xl flex flex-col items-center justify-center p-4 text-center overflow-hidden"
          >
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-6 right-6 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-50"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Ambient Lighting */}
            <div className="absolute w-[500px] h-[500px] bg-pink-500/20 rounded-full blur-[120px] pointer-events-none animate-pulse-glow" />

            {giftState !== 'opened' ? (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="flex flex-col items-center max-w-md"
              >
                <p className="text-pink-300 font-mono text-sm tracking-widest uppercase mb-8 animate-pulse">
                  {giftState === 'shaking' ? "UNBOXING MAGIC..." : "TAP THE GIFT TO UNWRAP"}
                </p>

                {/* 3D Gift Box Visual */}
                <motion.div
                  animate={
                    giftState === 'shaking'
                      ? { rotate: [-10, 10, -10, 10, -5, 5, 0], scale: [1, 1.1, 1.15, 1] }
                      : { y: [0, -12, 0] }
                  }
                  transition={
                    giftState === 'shaking'
                      ? { duration: 1 }
                      : { repeat: Infinity, duration: 3, ease: 'easeInOut' }
                  }
                  onClick={handleGiftClick}
                  className="w-44 h-44 rounded-3xl bg-gradient-to-tr from-pink-600 via-rose-500 to-amber-400 p-1 shadow-glow-rose cursor-pointer relative flex items-center justify-center group"
                >
                  <div className="w-full h-full bg-[#18122B] rounded-[22px] flex items-center justify-center relative overflow-hidden">
                    {/* Ribbon Vertical */}
                    <div className="absolute w-8 h-full bg-pink-500/80 shadow-glow-pink" />
                    {/* Ribbon Horizontal */}
                    <div className="absolute h-8 w-full bg-pink-500/80 shadow-glow-pink" />
                    
                    <Gift className="w-20 h-20 text-amber-300 relative z-10 group-hover:scale-110 transition-transform" />
                  </div>
                </motion.div>

                <p className="text-gray-300 text-sm mt-8 font-light">
                  A special wish from my heart to yours ❤️
                </p>
              </motion.div>
            ) : (
              /* Opened Gift Reveal Scene */
              <motion.div
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col items-center max-w-2xl px-4 z-10"
              >
                <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-pink-500 to-amber-400 flex items-center justify-center shadow-glow-gold mb-6">
                  <Heart className="w-12 h-12 text-white fill-white animate-pulse" />
                </div>

                <h3 className="text-4xl sm:text-6xl font-serif font-black text-gradient-romantic mb-6 leading-tight">
                  Happy Birthday, My Favorite Person ❤️
                </h3>

                <p className="text-xl sm:text-2xl text-gray-200 font-light leading-relaxed mb-8 glass-panel p-6 rounded-2xl border border-white/10">
                  "I hope this year brings you endless smiles, boundless joy, breathtaking adventures, and everything you've ever wished for."
                </p>

                <div className="flex items-center gap-2 text-amber-300 font-medium">
                  <Star className="w-5 h-5 fill-amber-300" />
                  <span>Forever & Always, {CONFIG.yourName}</span>
                  <Star className="w-5 h-5 fill-amber-300" />
                </div>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
