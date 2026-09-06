import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, MessageCircle, Eye, Camera, Laugh, Smile, Compass, X, ChevronRight } from 'lucide-react';
import { storyData, MemoryChapter } from '../data/story';
import { handleImageError } from '../utils/imageFallback';
import { soundEngine } from '../utils/soundEngine';

interface OurStoryProps {
  onComplete: () => void;
}

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  'first-chat': <MessageCircle className="w-4 h-4 text-purple-400" />,
  'first-meeting': <Eye className="w-4 h-4 text-rose-400" />,
  'first-photo': <Camera className="w-4 h-4 text-amber-400" />,
  'funniest': <Laugh className="w-4 h-4 text-yellow-400" />,
  'sweetest': <Heart className="w-4 h-4 text-pink-400" />,
  'unforgettable': <Sparkles className="w-4 h-4 text-indigo-400" />,
};

export const OurStory: React.FC<OurStoryProps> = ({ onComplete }) => {
  const [selectedMemory, setSelectedMemory] = useState<MemoryChapter | null>(null);

  const handleOpenMemory = (mem: MemoryChapter) => {
    setSelectedMemory(mem);
    soundEngine.playSparkle();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, filter: 'blur(10px)' }}
      transition={{ duration: 1 }}
      className="relative z-10 flex flex-col items-center justify-start min-h-screen py-16 px-4 sm:px-6 max-w-6xl mx-auto select-none"
    >
      {/* Header */}
      <div className="text-center space-y-3 mb-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-rose-500/10 border border-rose-400/20 text-rose-300 text-xs uppercase tracking-widest font-mono"
        >
          <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400/40" />
          ACT III : OUR STORY
        </motion.div>

        <h2 className="text-3xl sm:text-5xl font-serif text-white font-light tracking-wide">
          {storyData.storyTitle}
        </h2>
        <p className="text-sm sm:text-base text-gray-400 font-sans max-w-xl mx-auto italic">
          "{storyData.storySubtitle}"
        </p>
      </div>

      {/* 6 Memory Chapters Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full mb-14">
        {storyData.memories.map((mem, idx) => (
          <motion.div
            key={mem.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: idx * 0.1 }}
            whileHover={{ y: -6, transition: { duration: 0.25 } }}
            onClick={() => handleOpenMemory(mem)}
            className="group cursor-pointer bg-[#0f0f1c]/80 hover:bg-[#151528] backdrop-blur-md border border-purple-500/20 hover:border-pink-500/40 rounded-3xl p-5 shadow-xl transition-all duration-300 flex flex-col justify-between"
          >
            {/* Image Preview Container */}
            <div className="aspect-[16/10] rounded-2xl overflow-hidden relative mb-4 bg-[#080811]">
              <img
                src={mem.photo}
                alt={mem.title}
                onError={(e) => handleImageError(e, mem.category)}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

              {/* Category Badge */}
              <div className="absolute top-3 left-3 flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-xs text-white">
                {CATEGORY_ICONS[mem.category]}
                <span className="capitalize text-[11px] tracking-wide font-sans">{mem.title}</span>
              </div>
            </div>

            {/* Content */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-purple-300/80 font-mono">
                <span>{mem.date || 'Chapter Memory'}</span>
                <span className="text-[11px] text-gray-500 group-hover:text-pink-300 transition">Read Story ➔</span>
              </div>
              <p className="text-sm text-gray-300 font-sans line-clamp-2">
                {mem.shortCaption}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Next Section Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onComplete}
        className="px-8 py-3.5 rounded-full bg-gradient-to-r from-purple-600 via-pink-600 to-amber-500 text-white font-medium text-sm flex items-center gap-2 shadow-xl shadow-purple-900/30 transition group"
      >
        <span>Explore Memory Gallery</span>
        <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </motion.button>

      {/* Memory Detail Lightbox Modal */}
      <AnimatePresence>
        {selectedMemory && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.3 }}
              className="relative w-full max-w-2xl bg-[#121222] border border-purple-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden"
            >
              <button
                onClick={() => setSelectedMemory(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-pink-400 font-mono mb-2">
                {CATEGORY_ICONS[selectedMemory.category]}
                <span>{selectedMemory.date || 'Cherished Chapter'}</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-serif text-white font-medium mb-4">
                {selectedMemory.title}
              </h3>

              <div className="aspect-[16/9] rounded-2xl overflow-hidden mb-5 bg-[#080811]">
                <img
                  src={selectedMemory.photo}
                  alt={selectedMemory.title}
                  onError={(e) => handleImageError(e, selectedMemory.category)}
                  className="w-full h-full object-cover"
                />
              </div>

              <p className="text-sm sm:text-base text-gray-200 font-sans leading-relaxed">
                {selectedMemory.fullStory}
              </p>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
