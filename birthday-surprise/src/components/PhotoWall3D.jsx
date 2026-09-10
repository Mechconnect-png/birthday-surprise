import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CONFIG } from '../data/config';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

export default function PhotoWall3D({ onHoverPhoto }) {
  const [selectedIndex, setSelectedIndex] = useState(null);

  const photos = CONFIG.photoGallery || [];

  const handleOpenPhoto = (idx) => {
    setSelectedIndex(idx);
  };

  const handlePrev = (e) => {
    e.stopPropagation();
    setSelectedIndex((prev) => (prev === 0 ? photos.length - 1 : prev - 1));
  };

  const handleNext = (e) => {
    e.stopPropagation();
    setSelectedIndex((prev) => (prev === photos.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="relative min-h-screen w-full flex flex-col items-center justify-center py-24 px-6 overflow-hidden bg-[#08080D] select-none">
      {/* Background Ambient Atmosphere */}
      <div className="absolute w-[550px] h-[550px] bg-rose-900/15 rounded-full blur-[170px] pointer-events-none" />

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="text-center z-10 mb-16 max-w-2xl"
      >
        <span className="text-xs font-sans tracking-[0.4em] uppercase text-rose-300 font-medium px-4 py-1.5 rounded-full border border-rose-500/20 glass-panel">
          SECTION 03 • MEMORY REPOSITORY
        </span>
        <h2 className="text-4xl sm:text-6xl font-display font-normal text-white mt-4 tracking-wide">
          {CONFIG.photosTitle}
        </h2>
        <p className="text-base sm:text-lg font-sans font-light text-gray-400 mt-2">
          {CONFIG.photosSubtitle}
        </p>
      </motion.div>

      {/* Floating 3D Photo Wall Layout */}
      <div className="relative w-full max-w-6xl min-h-[60vh] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 p-4">
        {photos.map((item, idx) => {
          // Dynamic rotation, speed parallax offsets, and depth
          const rotationClass =
            idx % 3 === 0
              ? 'rotate-[-3deg] hover:rotate-0'
              : idx % 2 === 0
              ? 'rotate-[4deg] hover:rotate-0'
              : 'rotate-[-2deg] hover:rotate-0';

          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: idx * 0.15 }}
              whileHover={{ scale: 1.04, zIndex: 30 }}
              onMouseEnter={() => onHoverPhoto('VIEW MEMORY')}
              onMouseLeave={() => onHoverPhoto(null)}
              onClick={() => handleOpenPhoto(idx)}
              className={`relative cursor-pointer transition-all duration-500 rounded-3xl p-3 glass-card border border-white/10 ${rotationClass}`}
            >
              {/* Photo Frame Container */}
              <div className="relative w-full h-72 sm:h-80 rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#08080D]/90 via-transparent to-transparent opacity-60 hover:opacity-40 transition-opacity" />

                {/* Photo Tag */}
                <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center text-xs">
                  <span className="font-serif text-white text-lg font-light drop-shadow">
                    {item.title}
                  </span>
                  <span className="font-mono text-purple-200/80 glass-panel px-2.5 py-1 rounded-full border border-white/10">
                    {item.date}
                  </span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Cinematic Fullscreen Lightbox Modal */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#08080D]/90 backdrop-blur-2xl"
            onClick={() => setSelectedIndex(null)}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedIndex(null)}
              className="absolute top-6 right-6 p-3 rounded-full glass-panel text-white hover:text-rose-300 border border-white/20 z-50 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Previous Arrow */}
            <button
              onClick={handlePrev}
              className="absolute left-4 sm:left-8 p-3 rounded-full glass-panel text-white hover:text-rose-300 border border-white/20 z-50 transition-colors"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Next Arrow */}
            <button
              onClick={handleNext}
              className="absolute right-4 sm:right-8 p-3 rounded-full glass-panel text-white hover:text-rose-300 border border-white/20 z-50 transition-colors"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Modal Content */}
            <motion.div
              key={photos[selectedIndex].id}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-3xl rounded-3xl glass-card border border-rose-500/30 overflow-hidden shadow-2xl p-6 sm:p-8"
            >
              <div className="w-full max-h-[60vh] rounded-2xl overflow-hidden mb-6 border border-white/10">
                <img
                  src={photos[selectedIndex].image}
                  alt={photos[selectedIndex].title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <h3 className="text-2xl sm:text-4xl font-serif text-white">
                    {photos[selectedIndex].title}
                  </h3>
                  <span className="text-xs font-mono text-rose-300 glass-panel px-3 py-1 rounded-full border border-rose-500/20">
                    {photos[selectedIndex].date}
                  </span>
                </div>
                <p className="text-base font-sans font-light text-gray-300 leading-relaxed pt-2 border-t border-white/10">
                  {photos[selectedIndex].description}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
