import React from 'react';
import { motion } from 'framer-motion';
import { Heart, RotateCcw, Sparkles, Star } from 'lucide-react';
import { CONFIG } from '../data/config';

export default function FinalWish({ onReplay }) {
  return (
    <section className="py-28 px-4 relative z-20 text-center overflow-hidden border-t border-pink-500/10">
      <div className="max-w-4xl mx-auto flex flex-col items-center">

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-lg sm:text-xl font-serif text-pink-300 tracking-widest uppercase mb-4"
        >
          One More Time...
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl sm:text-7xl md:text-8xl font-serif font-black text-gradient-romantic tracking-tight mb-8"
        >
          HAPPY BIRTHDAY<br />
          <span className="text-gradient-gold">{CONFIG.girlfriendName.toUpperCase()}</span> ❤️
        </motion.h2>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="flex items-center gap-3 text-pink-400 mb-12"
        >
          <Star className="w-5 h-5 fill-amber-300 text-amber-300 animate-spin" style={{ animationDuration: '6s' }} />
          <span className="text-gray-300 font-light text-base sm:text-lg">
            {CONFIG.finalWish.subtitle}
          </span>
          <Star className="w-5 h-5 fill-amber-300 text-amber-300 animate-spin" style={{ animationDuration: '6s' }} />
        </motion.div>

        {/* Footer Credit */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="text-sm text-pink-300/70 font-mono mb-10 flex items-center gap-2"
        >
          <span>{CONFIG.finalWish.footerText}</span>
        </motion.p>

        {/* Replay Button */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          whileHover={{ scale: 1.06, boxShadow: '0 0 30px rgba(255, 118, 206, 0.4)' }}
          whileTap={{ scale: 0.95 }}
          onClick={onReplay}
          className="inline-flex items-center gap-3 px-8 py-4 rounded-full glass-card text-pink-200 hover:text-white border border-pink-500/30 hover:border-pink-500/60 font-medium text-base tracking-wide transition-all shadow-glass"
        >
          <RotateCcw className="w-5 h-5 text-pink-400" />
          <span>Experience Again ↻</span>
        </motion.button>
      </div>
    </section>
  );
}
