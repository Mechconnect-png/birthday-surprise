import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gift, Sparkles, Heart, ChevronRight } from 'lucide-react';
import confetti from 'canvas-confetti';
import { storyData } from '../data/story';
import { handleImageError, getSafeImageUrl } from '../utils/imageFallback';
import { soundEngine } from '../utils/soundEngine';

interface FinalSurpriseProps {
  onComplete: () => void;
}

export const FinalSurprise: React.FC<FinalSurpriseProps> = ({ onComplete }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenGift = () => {
    setIsOpen(true);
    soundEngine.playShimmerClimax();
    soundEngine.setVolume(0.9);

    // Massive Birthday Confetti Fireworks
    const end = Date.now() + 3000;
    const colors = ['#FBBF24', '#F472B6', '#A78BFA', '#38BDF8', '#FFFFFF'];

    (function frame() {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors,
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, filter: 'blur(10px)' }}
      transition={{ duration: 1 }}
      className="relative z-10 flex flex-col items-center justify-center min-h-screen py-16 px-4 sm:px-6 max-w-4xl mx-auto select-none"
    >
      <AnimatePresence mode="wait">
        {!isOpen ? (
          /* GIFT BOX WAITING TO BE OPENED */
          <motion.div
            key="gift-box-closed"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.2 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center space-y-8 my-auto text-center"
          >
            {/* Header */}
            <div className="space-y-3">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-amber-500/10 border border-amber-400/20 text-amber-300 text-xs uppercase tracking-widest font-mono"
              >
                <Gift className="w-3.5 h-3.5 text-amber-300" />
                THE GRAND FINALE
              </motion.div>

              <h2 className="text-3xl sm:text-5xl font-serif text-white font-light tracking-wide">
                {storyData.surprisePrompt}
              </h2>
            </div>

            {/* Glowing 3D Gift Box Visual */}
            <motion.div
              whileHover={{ scale: 1.06, rotate: 2 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleOpenGift}
              className="relative cursor-pointer group p-8"
            >
              {/* Outer Golden Aura Glow */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-amber-500/30 via-pink-500/25 to-purple-600/30 blur-2xl group-hover:opacity-100 opacity-60 transition duration-500 animate-pulse-glow" />

              <div className="relative w-44 h-44 sm:w-52 sm:h-52 rounded-3xl bg-gradient-to-tr from-[#24132b] via-[#3a1b42] to-[#24132b] border-2 border-amber-400/50 flex flex-col items-center justify-center shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
                {/* Gold Ribbon Vertical */}
                <div className="absolute inset-y-0 w-8 bg-gradient-to-r from-amber-400 via-amber-200 to-amber-400 shadow-md" />
                {/* Gold Ribbon Horizontal */}
                <div className="absolute inset-x-0 h-8 bg-gradient-to-b from-amber-400 via-amber-200 to-amber-400 shadow-md" />

                {/* Bow on Top */}
                <div className="absolute -top-6 flex items-center justify-center z-20">
                  <div className="w-12 h-10 rounded-full bg-amber-300 border-2 border-amber-100 shadow-lg -rotate-12 -mr-3" />
                  <div className="w-12 h-10 rounded-full bg-amber-300 border-2 border-amber-100 shadow-lg rotate-12 -ml-3" />
                  <div className="w-6 h-6 rounded-full bg-amber-400 border border-white absolute shadow-md" />
                </div>

                <Sparkles className="relative z-10 w-8 h-8 text-white drop-shadow animate-spin" style={{ animationDuration: '6s' }} />
              </div>
            </motion.div>

            {/* Glowing OPEN IT Button */}
            <button
              onClick={handleOpenGift}
              className="px-10 py-4 rounded-full bg-gradient-to-r from-amber-400 via-rose-500 to-purple-600 text-white font-serif tracking-widest text-sm sm:text-base uppercase shadow-[0_0_35px_rgba(251,191,36,0.5)] hover:shadow-[0_0_55px_rgba(244,114,182,0.7)] hover:scale-105 active:scale-95 transition-all duration-300 flex items-center gap-3 font-semibold"
            >
              <span>OPEN IT 🎁</span>
            </button>
          </motion.div>
        ) : (
          /* UNLOCKED BIRTHDAY CELEBRATION REVEAL */
          <motion.div
            key="gift-box-opened"
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-3xl bg-[#11111f]/90 backdrop-blur-2xl border border-amber-400/30 rounded-3xl p-6 sm:p-12 text-center space-y-8 shadow-[0_20px_80px_rgba(0,0,0,0.9)] relative overflow-hidden"
          >
            {/* Ambient Radiance */}
            <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-amber-400/15 via-rose-500/10 to-transparent pointer-events-none" />

            {/* Grand Headline: HAPPY BIRTHDAY, [HER NAME] ❤️ */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-3"
            >
              <span className="text-xs uppercase tracking-[0.3em] text-amber-300 font-mono">
                TO THE LOVE OF MY LIFE
              </span>
              <h1 className="text-3xl sm:text-5xl md:text-6xl font-serif text-white font-medium bg-gradient-to-r from-amber-200 via-rose-100 to-amber-100 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(251,191,36,0.6)]">
                HAPPY BIRTHDAY, {storyData.girlfriendName.toUpperCase()} ❤️
              </h1>
            </motion.div>

            {/* Best Photo Showcase */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="max-w-md mx-auto rounded-3xl overflow-hidden p-2 bg-gradient-to-tr from-amber-400/40 via-rose-400/40 to-purple-500/40 shadow-2xl"
            >
              <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-black relative">
                <img
                  src={getSafeImageUrl(storyData.bestPhoto.src, 'best-photo')}
                  alt={storyData.girlfriendName}
                  onError={(e) => handleImageError(e, 'best-photo')}
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>

            {/* Emotional Paragraphs */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="space-y-3 max-w-xl mx-auto"
            >
              <p className="text-base sm:text-xl font-serif text-white italic">
                "{storyData.finalMessage.body1}"
              </p>
              <p className="text-sm sm:text-base text-amber-200 font-sans leading-relaxed">
                {storyData.finalMessage.body2}
              </p>
              <p className="text-xs sm:text-sm text-gray-400 font-sans tracking-wide pt-2">
                {storyData.finalMessage.quote}
              </p>
            </motion.div>

            {/* Final Ending Transition Button */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="pt-4"
            >
              <button
                onClick={onComplete}
                className="px-8 py-3.5 rounded-full bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-500 hover:to-pink-400 text-white font-medium text-sm inline-flex items-center gap-2 shadow-xl transition active:scale-95"
              >
                <span>Final Universe Message</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
