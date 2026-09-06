import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Heart, X, Play } from 'lucide-react';
import { storyData } from '../data/story';
import { soundEngine } from '../utils/soundEngine';

interface EasterEggModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const EasterEggModal: React.FC<EasterEggModalProps> = ({ isOpen, onClose }) => {
  const [videoError, setVideoError] = useState(false);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/90 backdrop-blur-xl select-none">
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 20 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-xl bg-[#121224] border border-amber-400/40 rounded-3xl p-6 sm:p-8 shadow-[0_0_60px_rgba(251,191,36,0.3)] text-center space-y-6"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Glowing Secret Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/20 border border-amber-300/40 text-amber-300 text-xs font-mono uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              SECRET EASTER EGG FOUND
            </div>

            <h3 className="text-2xl sm:text-3xl font-serif text-white font-medium">
              You found the hidden secret. ❤️
            </h3>

            {/* Video Player or Fallback Text Surprise */}
            {storyData.secretVideo && !videoError ? (
              <div className="rounded-2xl overflow-hidden bg-black border border-white/10 aspect-video relative">
                <video
                  src={storyData.secretVideo}
                  controls
                  autoPlay
                  onError={() => setVideoError(true)}
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <div className="p-6 rounded-2xl bg-gradient-to-tr from-amber-500/10 via-pink-500/10 to-transparent border border-pink-400/20 text-left space-y-3">
                <p className="text-sm sm:text-base text-gray-200 font-sans leading-relaxed">
                  {storyData.secretMessage}
                </p>
                <div className="flex items-center gap-2 text-rose-400 font-serif text-sm">
                  <Heart className="w-4 h-4 fill-rose-400" />
                  <span>Forever yours, {storyData.senderName}</span>
                </div>
              </div>
            )}

            <button
              onClick={onClose}
              className="px-6 py-2.5 rounded-full bg-gradient-to-r from-amber-400 to-pink-500 text-white font-medium text-xs sm:text-sm shadow-lg hover:opacity-90 transition active:scale-95"
            >
              Close Secret ✦
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
