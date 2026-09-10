import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CONFIG } from '../data/config';

export default function BirthdayGirlSection() {
  const [wordIndex, setWordIndex] = useState(0);
  const [isFocused, setIsFocused] = useState(false);

  const words = CONFIG.portraitWords || ["Kind.", "Beautiful.", "Chaotic.", "Unforgettable."];

  useEffect(() => {
    const focusTimer = setTimeout(() => {
      setIsFocused(true);
    }, 600);

    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % (words.length + 1));
    }, 2400);

    return () => {
      clearTimeout(focusTimer);
      clearInterval(interval);
    };
  }, [words.length]);

  return (
    <section className="relative min-h-screen w-full flex items-center justify-center py-20 px-6 overflow-hidden bg-[#08080D]">
      <div className="absolute w-[450px] h-[450px] bg-purple-900/20 rounded-full blur-[150px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        {/* Portrait Image Frame */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1.4 }}
          className="lg:col-span-7 relative group flex items-center justify-center"
        >
          <div className="absolute inset-[-10px] rounded-3xl bg-gradient-to-tr from-purple-500/20 via-rose-500/20 to-amber-300/20 blur-xl opacity-60 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

          <div className="relative w-full aspect-[4/5] sm:aspect-[3/4] max-h-[70vh] rounded-2xl overflow-hidden border border-white/10 glass-panel shadow-2xl">
            <motion.img
              src={CONFIG.portraitImage}
              alt={CONFIG.girlfriendName}
              initial={{ filter: 'blur(30px) scale(1.15)', opacity: 0.4 }}
              animate={{
                filter: isFocused ? 'blur(0px) scale(1)' : 'blur(20px) scale(1.1)',
                opacity: isFocused ? 0.9 : 0.5
              }}
              transition={{ duration: 2.2, ease: [0.16, 1, 0.3, 1] }}
              className="w-full h-full object-cover object-center transition-all"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#08080D] via-[#08080D]/40 to-transparent" />

            <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end">
              <span className="text-xs font-mono tracking-widest text-purple-200/80 uppercase glass-panel px-3 py-1 rounded-full border border-white/10">
                01 • THE BIRTHDAY GIRL
              </span>
              <span className="text-xs font-sans tracking-widest text-rose-300/80 uppercase">
                {CONFIG.girlfriendName}
              </span>
            </div>
          </div>
        </motion.div>

        {/* Dynamic Typographic Overlay Column */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.3 }}
          className="lg:col-span-5 flex flex-col justify-center text-left space-y-5"
        >
          <span className="text-xs font-sans tracking-[0.35em] uppercase text-rose-300 font-medium">
            PORTRAIT OF MAGIC
          </span>

          <h2 className="text-3xl sm:text-5xl font-serif font-light text-white tracking-wide">
            {CONFIG.portraitHeading}
          </h2>

          {/* Word Replacement Carousel */}
          <div className="h-24 flex items-center overflow-hidden">
            <AnimatePresence mode="wait">
              {wordIndex < words.length ? (
                <motion.span
                  key={words[wordIndex]}
                  initial={{ opacity: 0, y: 25, filter: 'blur(8px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, y: -25, filter: 'blur(8px)' }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  className="text-3xl sm:text-5xl md:text-6xl font-display italic text-gradient-rose drop-shadow-md"
                >
                  "{words[wordIndex]}"
                </motion.span>
              ) : (
                <motion.span
                  key="final-word"
                  initial={{ opacity: 0, y: 25, filter: 'blur(8px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, y: -25, filter: 'blur(8px)' }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  className="text-2xl sm:text-4xl font-serif text-gradient-gold font-light leading-snug"
                >
                  {CONFIG.portraitFinal}
                </motion.span>
              )}
            </AnimatePresence>
          </div>

          <p className="text-sm sm:text-base font-sans font-light text-gray-300/90 leading-relaxed pt-3 border-t border-white/10">
            A celebration of every quiet smile, chaotic laugh, and unforgettable moment that makes her who she is.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
