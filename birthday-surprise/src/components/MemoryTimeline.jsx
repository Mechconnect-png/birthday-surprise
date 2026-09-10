import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Calendar, Heart } from 'lucide-react';
import { MEMORIES } from '../data/memories';

export default function MemoryTimeline() {
  return (
    <section className="py-24 px-4 relative z-20 overflow-hidden">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-500/10 border border-pink-500/30 text-pink-300 text-xs font-semibold uppercase tracking-widest mb-4"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Timeline Of Love</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl font-serif font-bold text-white mb-4"
          >
            Our Little Story <span className="text-gradient-romantic">❤️</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-300 max-w-xl mx-auto text-base sm:text-lg"
          >
            Every memory with you is a precious gem I carry close to my heart.
          </motion.p>
        </div>

        {/* Vertical Timeline Container */}
        <div className="relative">
          {/* Central Glowing Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 top-4 bottom-4 w-1 bg-gradient-to-b from-pink-500/20 via-pink-500/80 to-rose-500/20 rounded-full hidden md:block" />

          <div className="space-y-12 md:space-y-24">
            {MEMORIES.map((memory, index) => {
              const isEven = index % 2 === 0;
              return (
                <motion.div
                  key={memory.id}
                  initial={{ opacity: 0, x: isEven ? -40 : 40, y: 30 }}
                  whileInView={{ opacity: 1, x: 0, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className={`flex flex-col md:flex-row items-center ${
                    isEven ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  {/* Memory Card */}
                  <div className="w-full md:w-1/2 p-2">
                    <div className="glass-card glass-card-hover rounded-3xl p-6 sm:p-8 relative overflow-hidden group">
                      {/* Top Date Badge */}
                      <div className="flex items-center justify-between mb-4">
                        <span className="inline-flex items-center gap-1.5 text-xs font-mono font-medium px-3 py-1 rounded-full bg-pink-500/20 text-pink-300 border border-pink-500/30">
                          <Calendar className="w-3.5 h-3.5" />
                          {memory.date}
                        </span>
                        <span className="text-xs uppercase tracking-wider text-amber-300 font-semibold px-2.5 py-0.5 rounded-md bg-amber-400/10 border border-amber-400/20">
                          {memory.badge}
                        </span>
                      </div>

                      {/* Memory Title */}
                      <h3 className="text-2xl font-serif font-bold text-white mb-3 group-hover:text-pink-200 transition-colors">
                        {memory.title}
                      </h3>

                      {/* Memory Description */}
                      <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-6 font-light">
                        {memory.description}
                      </p>

                      {/* Memory Image */}
                      {memory.image && (
                        <div className="relative rounded-2xl overflow-hidden h-48 sm:h-56 border border-white/10 shadow-lg">
                          <img
                            src={memory.image}
                            alt={memory.title}
                            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                            loading="lazy"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#0B0914]/80 via-transparent to-transparent opacity-60" />
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Central Node Indicator */}
                  <div className="hidden md:flex items-center justify-center relative z-10 w-12 h-12 rounded-full bg-gradient-to-tr from-pink-500 to-rose-400 border-4 border-[#0B0914] shadow-glow-pink">
                    <Heart className="w-5 h-5 text-white fill-white animate-pulse" />
                  </div>

                  {/* Spacer for 2-column timeline */}
                  <div className="hidden md:block w-1/2" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
