import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CONFIG } from '../data/config';
import { Mail, Sparkles, X } from 'lucide-react';

export default function SecretLoveLetter({ onHoverLetter }) {
  const [isOpen, setIsOpen] = useState(false);
  const [displayedTextIndex, setDisplayedTextIndex] = useState(0);

  const letterData = CONFIG.secretLetter;
  const paragraphs = letterData.paragraphs || [];

  // Typewriter line animation once envelope is opened
  useEffect(() => {
    if (!isOpen) {
      setDisplayedTextIndex(0);
      return;
    }

    const timer = setInterval(() => {
      setDisplayedTextIndex((prev) => {
        if (prev < paragraphs.length) return prev + 1;
        clearInterval(timer);
        return prev;
      });
    }, 450);

    return () => clearInterval(timer);
  }, [isOpen, paragraphs.length]);

  return (
    <section className="relative min-h-screen w-full flex flex-col items-center justify-center py-24 px-6 overflow-hidden bg-[#08080D] select-none">
      {/* Background Glow */}
      <div className="absolute w-[500px] h-[500px] bg-purple-900/15 rounded-full blur-[170px] pointer-events-none" />

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="text-center z-10 mb-12"
      >
        <span className="text-xs font-sans tracking-[0.4em] uppercase text-purple-300 font-medium px-4 py-1.5 rounded-full border border-purple-500/20 glass-panel">
          SECTION 06 • SECRET DIGITAL LETTER
        </span>
        <h2 className="text-2xl sm:text-4xl font-serif font-light text-gray-300 mt-4">
          "{letterData.floatingPrompt}"
        </h2>
      </motion.div>

      {/* Floating Interactive Envelope */}
      <AnimatePresence mode="wait">
        {!isOpen ? (
          <motion.div
            key="envelope-closed"
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.06, rotate: 2 }}
            onMouseEnter={() => onHoverLetter && onHoverLetter('UNFOLD LETTER')}
            onMouseLeave={() => onHoverLetter && onHoverLetter(null)}
            onClick={() => setIsOpen(true)}
            className="relative cursor-pointer z-20 flex flex-col items-center group"
          >
            {/* Pulsing Envelope Glow */}
            <div className="absolute inset-[-15px] rounded-3xl bg-gradient-to-tr from-purple-500/20 via-rose-400/20 to-amber-300/20 blur-xl group-hover:opacity-100 opacity-60 transition-opacity duration-500 pointer-events-none" />

            <div className="relative w-72 h-48 sm:w-80 sm:h-52 rounded-2xl glass-card border border-purple-400/40 shadow-2xl flex flex-col items-center justify-center p-6 text-center">
              {/* Envelope Wax Seal Icon */}
              <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-rose-500 to-purple-600 border border-rose-300/40 flex items-center justify-center shadow-lg mb-3 group-hover:scale-1.1 transition-transform">
                <Mail className="w-7 h-7 text-white" />
              </div>
              <span className="font-serif text-sm tracking-widest text-purple-200 uppercase">
                {letterData.envelopeTitle || 'FOR YOUR EYES ONLY'}
              </span>
              <span className="text-xs font-mono text-rose-300/70 mt-1">
                Tap to open ✦
              </span>
            </div>
          </motion.div>
        ) : (
          /* Realistic Unfolded Handwritten Letter Container */
          <motion.div
            key="envelope-opened"
            initial={{ opacity: 0, scale: 0.85, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 40 }}
            transition={{ type: 'spring', damping: 25, stiffness: 220 }}
            className="relative z-30 w-full max-w-2xl rounded-3xl glass-card border border-purple-400/30 p-8 sm:p-12 shadow-2xl overflow-hidden"
          >
            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-6 right-6 p-2 rounded-full glass-panel text-gray-400 hover:text-white border border-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Handwritten Paper Content */}
            <div className="space-y-6 font-handwriting text-white text-xl sm:text-2xl md:text-3xl leading-relaxed tracking-wide">
              <p className="text-2xl sm:text-3xl font-bold text-rose-300">
                {letterData.salutation}
              </p>

              <div className="space-y-4 text-gray-200">
                {paragraphs.slice(0, displayedTextIndex).map((p, idx) => (
                  <motion.p
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="typewriter-cursor"
                  >
                    {p}
                  </motion.p>
                ))}
              </div>

              {displayedTextIndex >= paragraphs.length && (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="pt-6 border-t border-white/10 flex flex-col items-end text-right"
                >
                  <p className="text-rose-300 font-sans text-sm tracking-wider uppercase">
                    {letterData.closing}
                  </p>
                  <p className="text-gradient-gold text-3xl font-bold mt-1">
                    — {letterData.signoff}
                  </p>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
