import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, X, ChevronLeft, ChevronRight, Heart, Sparkles } from 'lucide-react';

const GALLERY_IMAGES = [
  {
    id: 1,
    url: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=1000&q=80",
    title: "Golden Hour Glow",
    caption: "Your smile outshining the sunset",
    style: "polaroid",
    rotate: "-2deg"
  },
  {
    id: 2,
    url: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=1000&q=80",
    title: "Cozy Afternoons",
    caption: "Warm coffee & sweet laughs",
    style: "modern",
    rotate: "1deg"
  },
  {
    id: 3,
    url: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1000&q=80",
    title: "Pure Happiness",
    caption: "My favorite laugh in the universe",
    style: "polaroid",
    rotate: "3deg"
  },
  {
    id: 4,
    url: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=1000&q=80",
    title: "Little Romantic Strolls",
    caption: "Holding hands wherever we go",
    style: "modern",
    rotate: "-1deg"
  },
  {
    id: 5,
    url: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1000&q=80",
    title: "Weekend Getaways",
    caption: "Exploring new horizons together",
    style: "polaroid",
    rotate: "-3deg"
  },
  {
    id: 6,
    url: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1000&q=80",
    title: "Starlit Evenings",
    caption: "Creating our own fairytale",
    style: "modern",
    rotate: "2deg"
  }
];

export default function PhotoGallery() {
  const [activeImageIndex, setActiveImageIndex] = useState(null);

  const openLightbox = (index) => setActiveImageIndex(index);
  const closeLightbox = () => setActiveImageIndex(null);

  const prevImage = (e) => {
    e.stopPropagation();
    setActiveImageIndex((prev) => (prev === 0 ? GALLERY_IMAGES.length - 1 : prev - 1));
  };

  const nextImage = (e) => {
    e.stopPropagation();
    setActiveImageIndex((prev) => (prev === GALLERY_IMAGES.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="py-24 px-4 relative z-20">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-500/10 border border-pink-500/30 text-pink-300 text-xs font-semibold uppercase tracking-widest mb-4"
          >
            <Camera className="w-3.5 h-3.5 text-pink-400" />
            <span>Captured Happiness</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl font-serif font-bold text-white mb-4"
          >
            Some Of My Favorite Memories <span className="text-gradient-romantic">📸</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-300 max-w-xl mx-auto text-base sm:text-lg"
          >
            Click any picture to open in full screen magic.
          </motion.p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {GALLERY_IMAGES.map((img, index) => (
            <motion.div
              key={img.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.03, y: -6 }}
              onClick={() => openLightbox(index)}
              style={{ rotate: img.rotate }}
              className="cursor-pointer"
            >
              {img.style === 'polaroid' ? (
                /* Polaroid Card Style */
                <div className="bg-white/95 p-4 rounded-xl shadow-2xl border border-pink-200/50 transform hover:shadow-glow-pink transition-all duration-500">
                  <div className="overflow-hidden rounded-lg h-64 relative group">
                    <img
                      src={img.url}
                      alt={img.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-pink-900/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Heart className="w-8 h-8 text-white fill-pink-500 animate-bounce" />
                    </div>
                  </div>
                  <div className="pt-4 text-center">
                    <p className="font-cursive text-2xl text-gray-800 font-bold leading-none mb-1">
                      {img.title}
                    </p>
                    <p className="text-xs text-gray-500 font-sans tracking-wide">
                      {img.caption}
                    </p>
                  </div>
                </div>
              ) : (
                /* Modern Glass Card Style */
                <div className="glass-card p-3 rounded-2xl overflow-hidden border border-pink-500/20 hover:border-pink-500/50 shadow-glass group relative">
                  <div className="overflow-hidden rounded-xl h-72 relative">
                    <img
                      src={img.url}
                      alt={img.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B0914] via-transparent to-transparent opacity-70 group-hover:opacity-40 transition-opacity" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <h4 className="text-white font-serif font-bold text-lg mb-0.5">{img.title}</h4>
                      <p className="text-pink-300 text-xs font-light">{img.caption}</p>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Fullscreen Lightbox Modal */}
      <AnimatePresence>
        {activeImageIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4"
          >
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-50"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Left Navigation Arrow */}
            <button
              onClick={prevImage}
              className="absolute left-4 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-50"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Lightbox Main Image & Details */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-4xl max-h-[85vh] flex flex-col items-center glass-panel p-4 md:p-6 rounded-3xl border border-white/20 shadow-2xl relative"
            >
              <img
                src={GALLERY_IMAGES[activeImageIndex].url}
                alt={GALLERY_IMAGES[activeImageIndex].title}
                className="max-h-[65vh] w-auto object-contain rounded-2xl shadow-glow-pink"
              />
              <div className="mt-4 text-center">
                <h3 className="text-2xl font-serif font-bold text-white mb-1">
                  {GALLERY_IMAGES[activeImageIndex].title}
                </h3>
                <p className="text-pink-300 text-sm font-light">
                  {GALLERY_IMAGES[activeImageIndex].caption}
                </p>
              </div>
            </motion.div>

            {/* Right Navigation Arrow */}
            <button
              onClick={nextImage}
              className="absolute right-4 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-50"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
