import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CONFIG } from '../data/config';
import { ChevronDown } from 'lucide-react';

export default function HeroSection({ scrollToNext, onNameClick }) {
  const [showScroll, setShowScroll] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // Show scroll indicator after letting the moment breathe
    const timer = setTimeout(() => {
      setShowScroll(true);
    }, 3200);

    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const x = (clientX / window.innerWidth - 0.5) * 30;
      const y = (clientY / window.innerHeight - 0.5) * 30;
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Split Name Letters for directional reveal animation
  const nameLetters = CONFIG.girlfriendName.split('');

  return (
    <section className="relative min-h-screen w-full flex flex-col items-center justify-center px-4 overflow-hidden select-none">
      {/* Dynamic Parallax Aurora Layer */}
      <motion.div
        animate={{
          x: mousePos.x * -1.2,
          y: mousePos.y * -1.2,
        }}
        transition={{ type: 'spring', damping: 40, stiffness: 90 }}
        className="absolute w-[500px] h-[500px] rounded-full aurora-glow-1 blur-[130px] opacity-50 pointer-events-none"
      />

      {/* Main Content Box with Parallax Effect */}
      <motion.div
        animate={{
          x: mousePos.x * 0.8,
          y: mousePos.y * 0.8,
        }}
        transition={{ type: 'spring', damping: 30, stiffness: 100 }}
        className="relative z-10 flex flex-col items-center text-center max-w-4xl mx-auto py-12"
      >
        {/* Top Tagline */}
        <motion.div
          initial={{ opacity: 0, y: -20, filter: 'blur(8px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 1.2, delay: 0.4 }}
          className="mb-6"
        >
          <span className="text-xs font-sans tracking-[0.35em] uppercase text-purple-300/80 font-light px-4 py-1.5 rounded-full border border-purple-500/20 glass-panel">
            {CONFIG.birthdayDateDisplay}
          </span>
        </motion.div>

        {/* Animated Typography: H A P P Y  B I R T H D A Y */}
        <motion.div className="flex flex-col items-center justify-center leading-none tracking-widest my-2">
          {/* HAPPY */}
          <motion.div
            initial={{ opacity: 0, y: 25, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 1.3, delay: 0.7 }}
            className="text-3xl sm:text-5xl md:text-6xl font-serif font-extralight text-white tracking-[0.3em] drop-shadow-xl"
          >
            H A P P Y
          </motion.div>

          {/* BIRTHDAY */}
          <motion.div
            initial={{ opacity: 0, y: 25, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 1.3, delay: 1.1 }}
            className="text-3xl sm:text-5xl md:text-6xl font-serif font-extralight text-gradient-rose tracking-[0.3em] mt-2 drop-shadow-xl"
          >
            B I R T H D A Y
          </motion.div>
        </motion.div>

        {/* ELEGANT SERIF NAME REVEAL WITH AMBIENT GLOW */}
        <div className="relative my-4 group cursor-pointer" onClick={onNameClick}>
          {/* Subtle Glowing Light Behind Name */}
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/30 via-rose-400/30 to-amber-300/30 blur-2xl opacity-70 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

          <motion.h1 className="relative z-10 flex items-center justify-center gap-2 sm:gap-3 md:gap-4 text-5xl sm:text-7xl md:text-8xl font-display font-normal text-white drop-shadow-[0_8px_30px_rgba(167,139,250,0.45)]">
            {nameLetters.map((char, index) => {
              const dirX = index % 2 === 0 ? -30 : 30;
              const dirY = index % 3 === 0 ? -20 : 20;

              return (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, x: dirX, y: dirY, scale: 0.7, filter: 'blur(12px)' }}
                  animate={{ opacity: 1, x: 0, y: 0, scale: 1, filter: 'blur(0px)' }}
                  transition={{
                    duration: 1.5,
                    delay: 1.4 + index * 0.1,
                    ease: [0.16, 1, 0.3, 1]
                  }}
                  whileHover={{ scale: 1.08, color: '#F9A8D4' }}
                  className="inline-block transition-colors duration-300"
                >
                  {char === ' ' ? '\u00A0' : char}
                </motion.span>
              );
            })}
          </motion.h1>
        </div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 1.3, delay: 2.3 }}
          className="text-base sm:text-lg md:text-xl font-sans font-light text-gray-300 tracking-wider max-w-xl mt-3"
        >
          "{CONFIG.heroSubtitle}"
        </motion.p>
      </motion.div>

      {/* Floating Scroll Indicator Prompt */}
      <AnimatePresence>
        {showScroll && (
          <motion.button
            onClick={scrollToNext}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 1 }}
            className="absolute bottom-8 z-20 flex flex-col items-center gap-2 group cursor-pointer text-purple-200/70 hover:text-white"
          >
            <span className="text-xs font-sans tracking-[0.25em] uppercase group-hover:tracking-[0.35em] transition-all">
              {CONFIG.heroPrompt}
            </span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
              className="p-2 rounded-full border border-purple-500/30 glass-panel group-hover:border-purple-300"
            >
              <ChevronDown className="w-4 h-4 text-purple-300" />
            </motion.div>
          </motion.button>
        )}
      </AnimatePresence>
    </section>
  );
}
