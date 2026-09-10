import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CONFIG } from '../data/config';
import { RotateCcw } from 'lucide-react';

export default function FinalScreen({ onReplay }) {
  const [step, setStep] = useState(0); // 0: "One last thing...", 1: "Thank you for existing.", 2: Signoff & Replay

  const finalData = CONFIG.finalScreen;

  const handleInView = () => {
    setTimeout(() => setStep(1), 3200);
    setTimeout(() => setStep(2), 6400);
  };

  return (
    <motion.section
      onViewportEnter={handleInView}
      viewport={{ once: true }}
      className="relative min-h-screen w-full flex flex-col items-center justify-center py-24 px-6 overflow-hidden bg-[#08080D] text-center select-none"
    >
      <div className="relative z-10 max-w-xl flex flex-col items-center space-y-8">
        <AnimatePresence mode="wait">
          {step === 0 && (
            <motion.p
              key="final-msg-0"
              initial={{ opacity: 0, y: 15, filter: 'blur(8px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -15, filter: 'blur(8px)' }}
              transition={{ duration: 1.4 }}
              className="text-xl sm:text-2xl font-serif text-gray-400 tracking-widest font-light"
            >
              {finalData.text1}
            </motion.p>
          )}

          {step === 1 && (
            <motion.p
              key="final-msg-1"
              initial={{ opacity: 0, y: 15, filter: 'blur(8px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -15, filter: 'blur(8px)' }}
              transition={{ duration: 1.4 }}
              className="text-3xl sm:text-5xl font-display text-white tracking-wider font-light"
            >
              "{finalData.text2}"
            </motion.p>
          )}

          {step === 2 && (
            <motion.div
              key="final-msg-2"
              initial={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              transition={{ duration: 1.6 }}
              className="flex flex-col items-center space-y-10"
            >
              <div className="space-y-2">
                <p className="text-3xl sm:text-5xl font-display text-white tracking-wider font-light">
                  "{finalData.text2}"
                </p>
                <p className="text-sm font-sans text-purple-300/80 tracking-[0.3em] uppercase pt-4">
                  {finalData.madeWithLove}
                </p>
              </div>

              {/* Replay Button */}
              <motion.button
                onClick={onReplay}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-3 px-6 py-3 rounded-full border border-purple-400/30 glass-panel text-gray-300 hover:text-white text-xs font-sans tracking-widest uppercase transition-all duration-300 hover:border-purple-300 hover:shadow-[0_0_30px_rgba(167,139,250,0.3)]"
              >
                <RotateCcw className="w-4 h-4 text-purple-300" />
                <span>{finalData.replayButton}</span>
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.section>
  );
}
