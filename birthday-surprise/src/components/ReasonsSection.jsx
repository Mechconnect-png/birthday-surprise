import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Heart, RefreshCw, Smile, Sun, Globe, Star, Coffee } from 'lucide-react';
import { REASONS } from '../data/reasons';

const ICON_MAP = {
  Smile,
  Sparkles,
  Heart,
  Sun,
  Globe,
  Star,
  Coffee
};

export default function ReasonsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextReason = () => {
    setCurrentIndex((prev) => (prev + 1) % REASONS.length);
  };

  const currentCard = REASONS[currentIndex];
  const IconComponent = ICON_MAP[currentCard.icon] || Heart;

  return (
    <section className="py-24 px-4 relative z-20 overflow-hidden">
      <div className="max-w-4xl mx-auto text-center">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-500/10 border border-pink-500/30 text-pink-300 text-xs font-semibold uppercase tracking-widest mb-4"
        >
          <Heart className="w-3.5 h-3.5 text-pink-400 fill-pink-400" />
          <span>Infinite Reasons</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-4xl sm:text-5xl font-serif font-bold text-white mb-4"
        >
          Things I Love About You <span className="text-gradient-romantic">❤️</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-gray-300 max-w-xl mx-auto text-base sm:text-lg mb-14"
        >
          There are a million reasons, but here are just a few secret notes for you to open...
        </motion.p>

        {/* Interactive Card Stack Container */}
        <div className="relative max-w-xl mx-auto min-h-[340px] flex items-center justify-center">
          {/* Background Card Stack Shadows */}
          <div className="absolute inset-0 bg-pink-500/10 rounded-3xl transform rotate-3 scale-95 border border-pink-500/20 pointer-events-none" />
          <div className="absolute inset-0 bg-purple-500/10 rounded-3xl transform -rotate-3 scale-95 border border-purple-500/20 pointer-events-none" />

          {/* Active Card with AnimatePresence */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentCard.id}
              initial={{ opacity: 0, scale: 0.8, rotate: -6, y: 30 }}
              animate={{ opacity: 1, scale: 1, rotate: 0, y: 0 }}
              exit={{ opacity: 0, scale: 0.85, rotate: 8, y: -40 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className={`w-full glass-card p-8 sm:p-10 rounded-3xl border border-pink-500/30 shadow-glow-rose relative overflow-hidden bg-gradient-to-br ${currentCard.gradient}`}
            >
              {/* Card Numbering Badge */}
              <div className="flex items-center justify-between mb-6">
                <span className="text-xs font-mono font-semibold uppercase tracking-widest text-pink-300/80 bg-pink-500/10 px-3 py-1 rounded-full border border-pink-500/20">
                  REASON #{currentCard.id} OF {REASONS.length}
                </span>
                <Sparkles className="w-5 h-5 text-amber-300 animate-spin" style={{ animationDuration: '8s' }} />
              </div>

              {/* Icon */}
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-pink-500 to-rose-400 flex items-center justify-center mx-auto mb-6 shadow-glow-pink">
                <IconComponent className="w-8 h-8 text-white" />
              </div>

              {/* Title */}
              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white mb-4">
                {currentCard.title}
              </h3>

              {/* Description */}
              <p className="text-gray-200 text-base sm:text-lg leading-relaxed font-light mb-2">
                "{currentCard.text}"
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Action Button to cycle card */}
        <motion.div className="mt-10">
          <motion.button
            whileHover={{ scale: 1.06, boxShadow: '0 0 35px rgba(255, 75, 145, 0.5)' }}
            whileTap={{ scale: 0.95 }}
            onClick={nextReason}
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-pink-500 via-rose-500 to-purple-600 text-white font-medium text-lg tracking-wide shadow-glow-pink border border-white/20"
          >
            <RefreshCw className="w-5 h-5 animate-spin-slow" />
            <span>Tell Me Another One ✨</span>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
