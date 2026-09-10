import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { CONFIG } from '../data/config';
import { Sparkles, Heart } from 'lucide-react';

export default function EasterEggs({ toastMessage, setToastMessage, nameClickCount }) {
  const compliments = CONFIG.compliments || [
    "Your happiness is contagious ✨",
    "You have the most beautiful soul ❤️",
    "You make every single day brighter 🌟"
  ];

  // Trigger confetti burst if girlfriend's name is clicked multiple times
  useEffect(() => {
    if (nameClickCount > 0 && nameClickCount % 4 === 0) {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.2 },
        colors: ['#F9A8D4', '#A78BFA', '#FBBF24']
      });
      setToastMessage("Secret Name Combo! 🎉❤️");
    }
  }, [nameClickCount, setToastMessage]);

  // Konami Code listener (Up Up Down Down Left Right Left Right B A)
  useEffect(() => {
    const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    let index = 0;

    const handleKeyDown = (e) => {
      if (e.key.toLowerCase() === konamiCode[index].toLowerCase()) {
        index++;
        if (index === konamiCode.length) {
          confetti({ particleCount: 100, spread: 90, origin: { y: 0.5 } });
          setToastMessage("🎮 Konami Code Unlocked: I love you past infinity!");
          index = 0;
        }
      } else {
        index = 0;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setToastMessage]);

  return (
    <AnimatePresence>
      {toastMessage && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.9 }}
          className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 px-6 py-3 rounded-full glass-card border border-amber-400/40 text-amber-200 text-xs sm:text-sm font-sans tracking-wide shadow-2xl flex items-center gap-2 pointer-events-none"
        >
          <Sparkles className="w-4 h-4 text-amber-300 animate-spin" />
          <span>{toastMessage}</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
