import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, X, ChevronLeft, ChevronRight, MapPin, Calendar, Image as ImageIcon } from 'lucide-react';
import { storyData, GalleryPhoto } from '../data/story';
import { handleImageError, getSafeImageUrl } from '../utils/imageFallback';
import { soundEngine } from '../utils/soundEngine';

interface MemoryGalleryProps {
  onComplete: () => void;
}

export const MemoryGallery: React.FC<MemoryGalleryProps> = ({ onComplete }) => {
  const [activePhotoIdx, setActivePhotoIdx] = useState<number | null>(null);
  const photos = storyData.gallery;

  const handleOpenPhoto = (idx: number) => {
    setActivePhotoIdx(idx);
    soundEngine.playSparkle();
  };

  const handleClose = () => {
    setActivePhotoIdx(null);
  };

  const handlePrev = useCallback(() => {
    if (activePhotoIdx === null) return;
    setActivePhotoIdx((activePhotoIdx - 1 + photos.length) % photos.length);
    soundEngine.playSparkle();
  }, [activePhotoIdx, photos.length]);

  const handleNext = useCallback(() => {
    if (activePhotoIdx === null) return;
    setActivePhotoIdx((activePhotoIdx + 1) % photos.length);
    soundEngine.playSparkle();
  }, [activePhotoIdx, photos.length]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activePhotoIdx === null) return;
      if (e.key === 'Escape') handleClose();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activePhotoIdx, handlePrev, handleNext]);

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
          className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-amber-500/10 border border-amber-400/20 text-amber-300 text-xs uppercase tracking-widest font-mono"
        >
          <ImageIcon className="w-3.5 h-3.5 text-amber-300" />
          ACT IV : MEMORY GALLERY
        </motion.div>

        <h2 className="text-3xl sm:text-5xl font-serif text-white font-light tracking-wide">
          {storyData.galleryTitle}
        </h2>
        <p className="text-sm sm:text-base text-gray-400 font-sans max-w-xl mx-auto">
          {storyData.gallerySubtitle}
        </p>
      </div>

      {/* Masonry / Responsive Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full mb-14">
        {photos.map((photo, idx) => (
          <motion.div
            key={photo.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: idx * 0.08 }}
            whileHover={{ y: -5, scale: 1.01 }}
            onClick={() => handleOpenPhoto(idx)}
            className="group cursor-pointer relative bg-[#0e0e1b] rounded-3xl overflow-hidden border border-purple-500/20 hover:border-amber-400/50 shadow-xl transition-all duration-300"
          >
            <div className="aspect-[4/5] overflow-hidden relative">
              <img
                src={getSafeImageUrl(photo.src, `gallery-${(idx % 6) + 1}`)}
                alt={photo.title}
                onError={(e) => handleImageError(e, `gallery-${(idx % 6) + 1}`)}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

              {/* Card Overlay Text */}
              <div className="absolute bottom-0 inset-x-0 p-5 space-y-1">
                <div className="flex items-center justify-between text-[11px] text-amber-300/90 font-mono">
                  {photo.date && (
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" /> {photo.date}
                    </span>
                  )}
                  {photo.location && (
                    <span className="flex items-center gap-1 text-gray-400">
                      <MapPin className="w-3 h-3 text-rose-400" /> {photo.location}
                    </span>
                  )}
                </div>
                <h3 className="text-lg font-serif text-white font-medium group-hover:text-amber-200 transition">
                  {photo.title}
                </h3>
                <p className="text-xs text-gray-300 font-sans line-clamp-1">
                  {photo.caption}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Advance Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onComplete}
        className="px-8 py-3.5 rounded-full bg-gradient-to-r from-purple-600 to-pink-500 text-white font-medium text-sm flex items-center gap-2 shadow-xl shadow-purple-900/30 transition group"
      >
        <span>Take the Birthday Quiz</span>
        <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </motion.button>

      {/* Fullscreen Lightbox Modal with Keyboard & Touch Support */}
      <AnimatePresence>
        {activePhotoIdx !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-black/90 backdrop-blur-xl"
          >
            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute top-6 right-6 p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition z-20"
              aria-label="Close Lightbox"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Prev Button */}
            <button
              onClick={handlePrev}
              className="absolute left-4 sm:left-8 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition z-20 hidden sm:flex"
              aria-label="Previous Photo"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Next Button */}
            <button
              onClick={handleNext}
              className="absolute right-4 sm:right-8 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition z-20 hidden sm:flex"
              aria-label="Next Photo"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Current Photo Details */}
            <motion.div
              key={activePhotoIdx}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.25 }}
              className="relative max-w-4xl w-full max-h-[85vh] flex flex-col items-center"
            >
              <div className="relative rounded-2xl overflow-hidden max-h-[65vh] shadow-2xl bg-black border border-white/15">
                <img
                  src={getSafeImageUrl(photos[activePhotoIdx].src, `gallery-${(activePhotoIdx % 6) + 1}`)}
                  alt={photos[activePhotoIdx].title}
                  onError={(e) => handleImageError(e, `gallery-${(activePhotoIdx % 6) + 1}`)}
                  className="max-h-[65vh] w-auto object-contain mx-auto"
                />
              </div>

              {/* Caption & Metadata */}
              <div className="mt-4 text-center space-y-1.5 max-w-lg">
                <div className="flex items-center justify-center gap-3 text-xs text-amber-300 font-mono">
                  <span>Photo {activePhotoIdx + 1} of {photos.length}</span>
                  {photos[activePhotoIdx].date && <span>• {photos[activePhotoIdx].date}</span>}
                </div>
                <h3 className="text-xl sm:text-2xl font-serif text-white font-medium">
                  {photos[activePhotoIdx].title}
                </h3>
                <p className="text-xs sm:text-sm text-gray-300 font-sans">
                  {photos[activePhotoIdx].caption}
                </p>
              </div>

              {/* Mobile swipe touch controls */}
              <div className="flex sm:hidden items-center justify-center gap-6 mt-4">
                <button
                  onClick={handlePrev}
                  className="px-4 py-2 rounded-full bg-white/10 text-white text-xs"
                >
                  ← Prev
                </button>
                <button
                  onClick={handleNext}
                  className="px-4 py-2 rounded-full bg-white/10 text-white text-xs"
                >
                  Next →
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
