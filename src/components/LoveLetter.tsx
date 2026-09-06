import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Heart, Sparkles, ChevronRight, Check } from 'lucide-react';
import { storyData } from '../data/story';
import { soundEngine } from '../utils/soundEngine';

interface LoveLetterProps {
  onComplete: () => void;
}

export const LoveLetter: React.FC<LoveLetterProps> = ({ onComplete }) => {
  const [isOpen, setIsOpen] = useState(false);
  const letter = storyData.letter;

  const handleOpenLetter = () => {
    setIsOpen(true);
    soundEngine.playShimmerClimax();
    soundEngine.setVolume(0.4); // Deep emotional slowdown
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, filter: 'blur(10px)' }}
      transition={{ duration: 1 }}
      className="relative z-10 flex flex-col items-center justify-center min-h-screen py-16 px-4 sm:px-6 max-w-4xl mx-auto select-none"
    >
      {/* Background Soft Aura */}
      <div className="absolute w-[500px] h-[500px] rounded-full bg-rose-500/10 blur-[120px] pointer-events-none -z-10" />

      {/* Header */}
      <div className="text-center space-y-3 mb-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-rose-500/10 border border-rose-400/20 text-rose-300 text-xs uppercase tracking-widest font-mono"
        >
          <Mail className="w-3.5 h-3.5 text-rose-300" />
          ACT VI : BIRTHDAY LETTER
        </motion.div>

        <h2 className="text-2xl sm:text-4xl font-serif text-white font-light tracking-wide italic">
          "{storyData.letterEnvelopePrompt}"
        </h2>
      </div>

      <AnimatePresence mode="wait">
        {!isOpen ? (
          /* CLOSED WAX-SEALED ENVELOPE */
          <motion.div
            key="envelope-closed"
            initial={{ opacity: 0, scale: 0.85, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 1.05, y: -20 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center space-y-8 my-auto"
          >
            {/* 3D Stylized Envelope Visual */}
            <div
              onClick={handleOpenLetter}
              className="group cursor-pointer relative w-72 sm:w-96 h-48 sm:h-60 rounded-2xl bg-gradient-to-tr from-[#1a1324] via-[#241b34] to-[#1a1324] border border-purple-400/30 p-6 flex flex-col items-center justify-center shadow-[0_20px_60px_rgba(0,0,0,0.8)] hover:shadow-[0_20px_60px_rgba(244,114,182,0.3)] transition-all duration-500 hover:scale-105"
            >
              {/* Envelope Flap Lines */}
              <div className="absolute inset-x-0 top-0 h-1/2 border-b border-purple-400/20 bg-gradient-to-b from-purple-500/5 to-transparent pointer-events-none rounded-t-2xl" />

              {/* Wax Seal with Heart */}
              <motion.div
                whileHover={{ rotate: 12, scale: 1.15 }}
                className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-tr from-rose-600 via-pink-500 to-rose-700 flex items-center justify-center text-white shadow-[0_0_25px_rgba(244,114,182,0.7)] z-10 border-2 border-rose-300/40"
              >
                <Heart className="w-7 h-7 fill-white drop-shadow" />
              </motion.div>

              <span className="mt-4 text-xs tracking-[0.2em] font-mono text-purple-200 uppercase font-semibold">
                {storyData.letterTitle}
              </span>
            </div>

            {/* Glowing Open Button */}
            <button
              onClick={handleOpenLetter}
              className="px-8 sm:px-12 py-4 rounded-full bg-gradient-to-r from-rose-500 via-pink-500 to-purple-600 hover:from-rose-400 hover:to-purple-500 text-white font-serif tracking-widest text-sm sm:text-base uppercase shadow-[0_0_30px_rgba(244,114,182,0.4)] hover:shadow-[0_0_50px_rgba(244,114,182,0.6)] transition duration-300 flex items-center gap-3 group active:scale-95"
            >
              <Heart className="w-4 h-4 fill-white group-hover:scale-125 transition-transform" />
              <span>OPEN YOUR BIRTHDAY LETTER 💌</span>
            </button>
          </motion.div>
        ) : (
          /* OPENED LETTER CONTENT (LINE BY LINE REVEAL) */
          <motion.div
            key="envelope-opened"
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-2xl bg-[#11111f]/95 backdrop-blur-2xl border border-rose-400/30 rounded-3xl p-6 sm:p-12 shadow-[0_20px_80px_rgba(0,0,0,0.8)] space-y-6 text-left relative overflow-hidden"
          >
            {/* Delicate Watermark Stamp */}
            <div className="absolute top-6 right-6 opacity-10 pointer-events-none">
              <Heart className="w-32 h-32 text-rose-300 fill-rose-300" />
            </div>

            {/* Salutation */}
            <motion.h3
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="text-2xl sm:text-3xl font-serif text-rose-200 font-medium tracking-wide"
            >
              {letter.salutation}
            </motion.h3>

            {/* Letter Paragraphs */}
            <div className="space-y-4 font-sans text-gray-200 text-sm sm:text-base leading-relaxed sm:leading-loose">
              {letter.paragraphs.map((paragraph, idx) => (
                <motion.p
                  key={`p-${idx}`}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 + idx * 0.25 }}
                  className="font-light"
                >
                  {paragraph}
                </motion.p>
              ))}
            </div>

            {/* Sign-off */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.3 + letter.paragraphs.length * 0.25 }}
              className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
            >
              <div>
                <p className="text-xs text-rose-300/80 font-serif italic">{letter.closing}</p>
                <p className="text-lg sm:text-xl font-handwriting text-white">{letter.signature}</p>
              </div>

              <button
                onClick={onComplete}
                className="px-6 py-2.5 rounded-full bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-500 hover:to-pink-400 text-white text-xs sm:text-sm font-semibold inline-flex items-center gap-2 shadow-lg transition active:scale-95"
              >
                <span>Return to the Universe</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
