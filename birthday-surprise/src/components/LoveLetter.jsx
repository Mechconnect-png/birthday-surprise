import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Heart, Sparkles } from 'lucide-react';
import { CONFIG } from '../data/config';

export default function LoveLetter() {
  const [isOpen, setIsOpen] = useState(false);
  const [typedText, setTypedText] = useState('');
  const [isTypingComplete, setIsTypingComplete] = useState(false);

  const fullLetterContent = CONFIG.secretLetter.paragraphs.join("\n\n");

  useEffect(() => {
    if (!isOpen) return;

    let index = 0;
    setTypedText('');
    setIsTypingComplete(false);

    const timer = setInterval(() => {
      if (index < fullLetterContent.length) {
        setTypedText((prev) => prev + fullLetterContent.charAt(index));
        index++;
      } else {
        setIsTypingComplete(true);
        clearInterval(timer);
      }
    }, 25); // Typewriter speed

    return () => clearInterval(timer);
  }, [isOpen, fullLetterContent]);

  return (
    <section className="py-24 px-4 relative z-20 overflow-hidden">
      <div className="max-w-3xl mx-auto text-center">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-500/10 border border-pink-500/30 text-pink-300 text-xs font-semibold uppercase tracking-widest mb-4"
        >
          <Mail className="w-3.5 h-3.5 text-pink-400" />
          <span>From My Heart</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-4xl sm:text-5xl font-serif font-bold text-white mb-4"
        >
          I wrote something for you... <span className="text-gradient-romantic">💌</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-gray-300 max-w-lg mx-auto text-base sm:text-lg mb-12"
        >
          {isOpen ? "Here is my secret letter to you..." : "Tap the envelope to break the seal & read your birthday letter."}
        </motion.p>

        {/* Envelope / Letter Card */}
        <div className="relative flex justify-center">
          <AnimatePresence mode="wait">
            {!isOpen ? (
              /* Sealed Envelope */
              <motion.div
                key="envelope"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 1.05, opacity: 0, y: -20 }}
                whileHover={{ scale: 1.04, rotate: 1 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => setIsOpen(true)}
                className="w-full max-w-md bg-gradient-to-tr from-rose-950/80 via-pink-900/60 to-purple-950/80 p-8 rounded-3xl border-2 border-pink-500/40 shadow-glow-rose cursor-pointer flex flex-col items-center justify-center relative overflow-hidden group"
              >
                {/* Envelope Flap visual */}
                <div className="w-0 h-0 border-l-[180px] border-l-transparent border-r-[180px] border-r-transparent border-t-[100px] border-t-pink-500/20 absolute top-0" />

                {/* Wax Seal Icon */}
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-pink-500 to-rose-600 border-4 border-amber-300/60 flex items-center justify-center shadow-2xl my-6 group-hover:scale-110 transition-transform">
                  <Heart className="w-10 h-10 text-white fill-white animate-pulse" />
                </div>

                <p className="font-serif text-xl text-pink-100 font-semibold tracking-wide mb-1">
                  Private & Confidential
                </p>
                <p className="text-xs font-mono text-pink-300/80 uppercase tracking-widest">
                  Tap To Open 💌
                </p>
              </motion.div>
            ) : (
              /* Unfolded Handwritten Letter */
              <motion.div
                key="letter"
                initial={{ opacity: 0, scale: 0.9, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="w-full glass-card p-8 sm:p-12 rounded-3xl border border-pink-500/30 shadow-glow-pink text-left relative overflow-hidden bg-gradient-to-b from-[#1C152D]/90 to-[#120E24]/90"
              >
                {/* Decorative Stamp */}
                <div className="absolute top-6 right-6 border border-pink-400/40 p-2 rounded-lg bg-pink-500/10 flex flex-col items-center text-pink-300 text-[10px] uppercase font-mono">
                  <Sparkles className="w-4 h-4 text-amber-300 mb-0.5" />
                  <span>FOR {CONFIG.girlfriendName.toUpperCase()}</span>
                </div>

                {/* Salutation */}
                <h3 className="font-cursive text-3xl sm:text-4xl text-gradient-romantic font-bold mb-6">
                  {CONFIG.secretLetter.salutation}
                </h3>

                {/* Typewriter Body */}
                <div className="font-serif text-gray-200 text-base sm:text-lg leading-relaxed whitespace-pre-line min-h-[180px] typewriter-cursor font-light">
                  {typedText}
                </div>

                {/* Sign-off */}
                {isTypingComplete && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="mt-8 pt-6 border-t border-pink-500/20 flex flex-col items-end"
                  >
                    <p className="font-serif italic text-pink-300 text-sm">{CONFIG.secretLetter.signoff}</p>
                    <p className="font-cursive text-3xl font-bold text-gradient-romantic mt-1">
                      {CONFIG.yourName} ❤️
                    </p>
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
