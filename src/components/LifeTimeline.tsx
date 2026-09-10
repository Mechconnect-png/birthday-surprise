import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Sparkles, Heart, Calendar } from 'lucide-react';
import { storyData } from '../data/story';
import { handleImageError, getSafeImageUrl } from '../utils/imageFallback';
import { soundEngine } from '../utils/soundEngine';

interface LifeTimelineProps {
  onComplete: () => void;
}

export const LifeTimeline: React.FC<LifeTimelineProps> = ({ onComplete }) => {
  const [activeIdx, setActiveIdx] = useState(0);
  const items = storyData.timeline;
  const currentItem = items[activeIdx];

  const handleSelectStage = (index: number) => {
    setActiveIdx(index);
    soundEngine.playSparkle();
  };

  const handleNext = () => {
    if (activeIdx < items.length - 1) {
      setActiveIdx(activeIdx + 1);
      soundEngine.playSparkle();
    } else {
      onComplete();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, filter: 'blur(10px)' }}
      transition={{ duration: 1 }}
      className="relative z-10 flex flex-col items-center justify-start min-h-screen py-16 px-4 sm:px-6 max-w-5xl mx-auto select-none"
    >
      {/* Header Intro */}
      <div className="text-center space-y-3 mb-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-purple-500/10 border border-purple-400/20 text-purple-300 text-xs uppercase tracking-widest font-mono"
        >
          <Sparkles className="w-3.5 h-3.5 text-purple-300" />
          ACT II : HER JOURNEY
        </motion.div>

        <h2 className="text-3xl sm:text-5xl font-serif text-white font-light tracking-wide">
          {storyData.timelineTitle}
        </h2>
        <p className="text-sm sm:text-base text-gray-400 font-sans max-w-xl mx-auto">
          "And that little girl… grew up to become the person I love today."
        </p>
      </div>

      {/* Interactive Stage Step Tabs (Mobile scrollable, Desktop pills) */}
      <div className="flex items-center justify-center gap-2 sm:gap-4 overflow-x-auto w-full pb-4 scrollbar-none mb-8">
        {items.map((item, idx) => {
          const isActive = idx === activeIdx;
          return (
            <button
              key={item.id}
              onClick={() => handleSelectStage(idx)}
              className={`px-4 sm:px-6 py-2.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 shrink-0 flex items-center gap-2 border ${
                isActive
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white border-transparent shadow-[0_0_20px_rgba(167,139,250,0.4)] scale-105'
                  : 'bg-[#10101a]/80 text-gray-400 border-white/10 hover:border-purple-400/40 hover:text-white'
              }`}
            >
              <span>{item.stage}</span>
            </button>
          );
        })}
      </div>

      {/* Main Interactive Stage Showcase Card */}
      <div className="w-full max-w-4xl">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentItem.id}
            initial={{ opacity: 0, y: 20, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.97 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center bg-[#0e0e1a]/85 backdrop-blur-xl border border-purple-500/20 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden"
          >
            {/* Ambient Background Glow */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-purple-500/10 rounded-full blur-[90px] pointer-events-none" />

            {/* Left: Polaroid Style Photo Display */}
            <div className="md:col-span-6 flex justify-center">
              <motion.div
                whileHover={{ rotate: 1, scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 200 }}
                className="relative bg-[#161626] p-3.5 sm:p-4 rounded-2xl border border-white/15 shadow-[0_20px_50px_rgba(0,0,0,0.6)] w-full max-w-sm"
              >
                <div className="aspect-[4/5] rounded-xl overflow-hidden relative bg-[#090912]">
                  <img
                    src={getSafeImageUrl(currentItem.photo, currentItem.id === 'stage-1' ? 'childhood-1' : currentItem.id === 'stage-2' ? 'childhood-2' : currentItem.id === 'stage-3' ? 'growing-up' : 'her-now')}
                    alt={currentItem.stage}
                    onError={(e) => handleImageError(e, currentItem.id === 'stage-1' ? 'childhood-1' : currentItem.id === 'stage-2' ? 'childhood-2' : currentItem.id === 'stage-3' ? 'growing-up' : 'her-now')}
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                </div>

                {/* Polaroid Bottom Label */}
                <div className="mt-3 flex items-center justify-between text-xs text-gray-400 px-1 font-serif">
                  <span className="text-purple-200">{currentItem.subtitle}</span>
                  {currentItem.year && (
                    <span className="flex items-center gap-1 font-mono text-[11px] text-amber-300">
                      <Calendar className="w-3 h-3" /> {currentItem.year}
                    </span>
                  )}
                </div>
              </motion.div>
            </div>

            {/* Right: Emotional Story Narrative */}
            <div className="md:col-span-6 flex flex-col justify-center space-y-5 text-left">
              <div className="flex items-center gap-2">
                <span className="text-xs uppercase tracking-widest text-pink-400 font-mono">
                  STAGE {activeIdx + 1} OF {items.length}
                </span>
                <span className="h-px w-12 bg-pink-400/40" />
              </div>

              <h3 className="text-2xl sm:text-4xl font-serif text-white font-medium leading-snug">
                {currentItem.stage}
              </h3>

              <p className="text-sm sm:text-base text-gray-300 font-sans leading-relaxed">
                {currentItem.caption}
              </p>

              {/* Tags */}
              {currentItem.tags && (
                <div className="flex flex-wrap gap-2 pt-2">
                  {currentItem.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-3 py-1 rounded-full bg-white/5 border border-white/10 text-purple-200"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Next Stage / Continue Button */}
              <div className="pt-4 flex items-center gap-4">
                <button
                  onClick={handleNext}
                  className="px-6 py-3 rounded-full bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-500 hover:to-pink-400 text-white font-medium text-sm flex items-center gap-2 shadow-lg shadow-purple-600/30 transition group active:scale-95"
                >
                  <span>
                    {activeIdx < items.length - 1 ? 'Next Chapter' : 'Take the Birthday Quiz'}
                  </span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
};
