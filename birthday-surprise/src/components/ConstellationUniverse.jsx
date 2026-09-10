import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CONFIG } from '../data/config';
import { X, Sparkles, Calendar } from 'lucide-react';

export default function ConstellationUniverse({ onSecretStarFound }) {
  const [selectedMemory, setSelectedMemory] = useState(null);

  const memories = CONFIG.memories || [];

  const handleStarClick = (mem) => {
    setSelectedMemory(mem);
  };

  return (
    <section className="relative min-h-screen w-full flex flex-col items-center justify-center py-24 px-6 overflow-hidden bg-[#08080D] select-none">
      {/* Background Deep Space Atmosphere */}
      <div className="absolute w-[600px] h-[600px] bg-purple-900/15 rounded-full blur-[170px] pointer-events-none" />

      {/* Header Title */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="text-center z-10 mb-12 max-w-2xl"
      >
        <span className="text-xs font-sans tracking-[0.4em] uppercase text-purple-300 font-medium px-4 py-1.5 rounded-full border border-purple-500/20 glass-panel">
          SECTION 02 • THE CONSTELLATION
        </span>
        <h2 className="text-4xl sm:text-6xl font-display font-normal text-white mt-4 tracking-wide">
          {CONFIG.constellationTitle}
        </h2>
        <p className="text-base sm:text-lg font-sans font-light text-gray-400 mt-2">
          {CONFIG.constellationSubtitle}
        </p>
      </motion.div>

      {/* Constellation Canvas Container */}
      <div className="relative w-full max-w-5xl h-[65vh] rounded-3xl glass-panel border border-white/10 overflow-hidden shadow-2xl flex items-center justify-center">
        {/* SVG Constellation Connecting Lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
          <defs>
            <linearGradient id="constellationLine" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#A78BFA" stopOpacity="0.4" />
              <stop offset="50%" stopColor="#F9A8D4" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#FBBF24" stopOpacity="0.4" />
            </linearGradient>
          </defs>

          {/* Draw connecting lines between memory nodes */}
          {memories.map((mem, idx) => {
            if (idx === memories.length - 1) return null;
            const nextMem = memories[idx + 1];
            return (
              <line
                key={`line-${mem.id}-${nextMem.id}`}
                x1={`${mem.x}%`}
                y1={`${mem.y}%`}
                x2={`${nextMem.x}%`}
                y2={`${nextMem.y}%`}
                stroke="url(#constellationLine)"
                strokeWidth="1.5"
                strokeDasharray="4 4"
                className="animate-pulse-subtle"
              />
            );
          })}
        </svg>

        {/* Hidden Secret Easter Egg Star */}
        <motion.div
          onClick={onSecretStarFound}
          whileHover={{ scale: 1.5 }}
          className="absolute left-[12%] top-[82%] cursor-pointer z-10 p-2 text-amber-300/40 hover:text-amber-300 transition-colors"
          title="Secret Star"
        >
          ✦
        </motion.div>

        {/* Floating Star Nodes */}
        {memories.map((mem) => {
          const isSelected = selectedMemory?.id === mem.id;

          return (
            <motion.div
              key={mem.id}
              style={{ left: `${mem.x}%`, top: `${mem.y}%` }}
              className="absolute -translate-x-1/2 -translate-y-1/2 z-10"
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: mem.id * 0.15 }}
            >
              <button
                onClick={() => handleStarClick(mem)}
                className="group relative flex flex-col items-center focus:outline-none"
              >
                {/* Glowing Star Pulse Ring */}
                <div className="absolute inset-[-10px] rounded-full bg-purple-500/20 blur-md group-hover:bg-rose-400/40 transition-all duration-500" />

                {/* Star Icon */}
                <motion.div
                  animate={{
                    scale: [1, 1.25, 1],
                    rotate: [0, 15, -15, 0]
                  }}
                  transition={{ repeat: Infinity, duration: 4 + mem.id, ease: 'easeInOut' }}
                  className={`w-10 h-10 rounded-full border flex items-center justify-center backdrop-blur-md shadow-lg transition-all duration-300 ${
                    mem.starType === 'gold'
                      ? 'border-amber-400/50 bg-amber-500/10 text-amber-300 shadow-[0_0_20px_rgba(251,191,36,0.3)]'
                      : mem.starType === 'rose'
                      ? 'border-rose-400/50 bg-rose-500/10 text-rose-300 shadow-[0_0_20px_rgba(249,168,212,0.3)]'
                      : 'border-purple-400/50 bg-purple-500/10 text-purple-300 shadow-[0_0_20px_rgba(167,139,250,0.3)]'
                  }`}
                >
                  <Sparkles className="w-5 h-5 group-hover:scale-1.2 transition-transform" />
                </motion.div>

                {/* Star Title Badge */}
                <span className="mt-2 text-xs font-serif tracking-wider text-gray-200 group-hover:text-rose-200 whitespace-nowrap glass-panel px-3 py-1 rounded-full border border-white/10 transition-colors">
                  ✦ {mem.title}
                </span>
              </button>
            </motion.div>
          );
        })}
      </div>

      {/* Expanded Memory Modal when star is clicked */}
      <AnimatePresence>
        {selectedMemory && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#08080D]/80 backdrop-blur-xl"
            onClick={() => setSelectedMemory(null)}
          >
            <motion.div
              initial={{ scale: 0.85, y: 30, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.85, y: 30, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 250 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-xl rounded-3xl glass-card border border-purple-400/30 overflow-hidden p-6 sm:p-8 shadow-2xl"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedMemory(null)}
                className="absolute top-5 right-5 p-2 rounded-full glass-panel text-gray-300 hover:text-white border border-white/10 transition-colors z-20"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Memory Image */}
              <div className="relative w-full h-56 sm:h-64 rounded-2xl overflow-hidden mb-6 border border-white/10">
                <img
                  src={selectedMemory.image}
                  alt={selectedMemory.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#10101A] via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 inline-flex items-center gap-2 px-3 py-1 rounded-full glass-panel text-xs text-rose-300 font-sans border border-rose-500/20">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{selectedMemory.date}</span>
                </div>
              </div>

              {/* Memory Details */}
              <div className="space-y-3">
                <h3 className="text-2xl sm:text-3xl font-serif text-white font-medium">
                  {selectedMemory.title}
                </h3>
                <p className="text-sm sm:text-base font-sans font-light text-rose-200/90 italic">
                  "{selectedMemory.shortDescription}"
                </p>
                <p className="text-sm font-sans font-light text-gray-300 leading-relaxed pt-2 border-t border-white/10">
                  {selectedMemory.fullStory}
                </p>
              </div>

              {/* Modal Return Prompt */}
              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => setSelectedMemory(null)}
                  className="px-5 py-2 rounded-full bg-purple-500/20 hover:bg-purple-500/30 border border-purple-400/30 text-purple-200 text-xs font-sans tracking-wider uppercase transition-all"
                >
                  Return to Constellation ✦
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
