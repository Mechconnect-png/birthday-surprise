import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RotateCcw, Sparkles, Heart } from 'lucide-react';
import { storyData } from '../data/story';
import { soundEngine } from '../utils/soundEngine';

interface FinalEndingProps {
  onReplay: () => void;
  onOpenSecret: () => void;
}

export const FinalEnding: React.FC<FinalEndingProps> = ({ onReplay, onOpenSecret }) => {
  const [phase, setPhase] = useState(0); // 0: Universe quote, 1: Brought to life quote, 2: Birthday heading, 3: Beginning line & replay button

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 2200);
    const t2 = setTimeout(() => {
      setPhase(2);
      soundEngine.playSparkle();
    }, 5200);
    const t3 = setTimeout(() => setPhase(3), 8500);

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
      exit={{ opacity: 0 }}
      transition={{ duration: 1.5 }}
      className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 text-center select-none overflow-hidden bg-black/95"
    >
      {/* Tiny Hidden Blinking Easter Egg Star in Top Corner */}
      <motion.button
        animate={{ opacity: [0.3, 1, 0.3], scale: [0.9, 1.2, 0.9] }}
        transition={{ duration: 2.5, repeat: Infinity }}
        onClick={onOpenSecret}
        className="fixed top-6 right-6 p-2 rounded-full text-amber-300 hover:text-white transition cursor-pointer z-40"
        title="A secret star ✨"
        aria-label="Secret Easter Egg"
      >
        <Sparkles className="w-4 h-4 text-amber-300 drop-shadow-[0_0_8px_#FBBF24]" />
      </motion.button>

      {/* Center Cinematic Conclusion */}
      <div className="max-w-2xl mx-auto space-y-8 min-h-[300px] flex flex-col items-center justify-center my-auto">
        <div className="space-y-4">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.8 }}
            className="text-xl sm:text-3xl font-serif text-gray-300 font-light italic"
          >
            "The universe created you…"
          </motion.p>

          <AnimatePresence>
            {phase >= 1 && (
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.8 }}
                className="text-xl sm:text-3xl font-serif text-gray-200 font-light"
              >
                "…and somehow, it brought you into my life."
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        <AnimatePresence>
          {phase >= 2 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
              className="pt-4 space-y-3"
            >
              <h1 className="text-3xl sm:text-5xl md:text-6xl font-serif text-white font-medium bg-gradient-to-r from-amber-100 via-rose-100 to-amber-200 bg-clip-text text-transparent drop-shadow-[0_0_35px_rgba(244,114,182,0.8)]">
                Happy Birthday to my favourite person. ❤️
              </h1>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {phase >= 3 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 2 }}
              className="space-y-8 pt-6"
            >
              <p className="text-xs sm:text-sm uppercase tracking-[0.3em] text-purple-300 font-mono">
                This is only the beginning… ✨
              </p>

              <button
                onClick={onReplay}
                className="px-6 py-2.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/20 text-gray-300 hover:text-white text-xs font-mono tracking-widest uppercase inline-flex items-center gap-2 transition duration-300 shadow-lg active:scale-95"
              >
                <RotateCcw className="w-3.5 h-3.5 text-purple-400" />
                <span>Replay Experience</span>
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer Signature */}
      <div className="absolute bottom-6 text-center text-[11px] text-gray-600 font-mono tracking-widest uppercase">
        Made with infinite love for {storyData.girlfriendName}
      </div>
    </motion.div>
  );
};
