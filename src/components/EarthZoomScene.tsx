import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Compass, Sparkles, MapPin } from 'lucide-react';
import { storyData } from '../data/story';
import { soundEngine } from '../utils/soundEngine';

interface EarthZoomSceneProps {
  onComplete: () => void;
}

export const EarthZoomScene: React.FC<EarthZoomSceneProps> = ({ onComplete }) => {
  // Stages: 0: Space / Orbit Earth, 1: Atmosphere, 2: Clouds & City, 3: The Warm Light
  const [zoomStage, setZoomStage] = useState(0);

  useEffect(() => {
    // Automatic cinematic zoom timeline
    const t1 = setTimeout(() => {
      setZoomStage(1); // Atmosphere
    }, 2800);

    const t2 = setTimeout(() => {
      setZoomStage(2); // Clouds & City Lights
      soundEngine.playSparkle();
    }, 6200);

    const t3 = setTimeout(() => {
      setZoomStage(3); // A Warm Light
      soundEngine.playSparkle();
    }, 9800);

    const t4 = setTimeout(() => {
      onComplete(); // Advance to Birth scene
    }, 13200);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, filter: 'blur(16px)' }}
      transition={{ duration: 1.2 }}
      className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 text-center select-none overflow-hidden"
    >
      {/* 3D Stylized Planet Earth / Atmosphere Canvas Effect */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center overflow-hidden">
        {/* Deep Space Background Layer */}
        <motion.div
          animate={{
            scale: zoomStage === 0 ? 1 : zoomStage === 1 ? 2.2 : zoomStage === 2 ? 5 : 12,
            opacity: zoomStage === 3 ? 0 : 1,
          }}
          transition={{ duration: 3.5, ease: [0.25, 1, 0.5, 1] }}
          className="relative flex items-center justify-center"
        >
          {/* Earth Outer Atmosphere Halo */}
          <div className="w-[300px] sm:w-[420px] h-[300px] sm:h-[420px] rounded-full bg-gradient-to-tr from-[#1E3A8A] via-[#0284C7] to-[#38BDF8] shadow-[0_0_90px_rgba(56,189,248,0.5),inset_0_0_60px_rgba(0,0,0,0.8)] relative overflow-hidden">
            {/* Continent / Cloud Silhouettes */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-0 opacity-40 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-400 via-teal-900 to-transparent"
              style={{
                backgroundImage: `radial-gradient(circle at 30% 40%, rgba(52, 211, 153, 0.4) 0%, transparent 40%),
                                  radial-gradient(circle at 70% 60%, rgba(16, 185, 129, 0.35) 0%, transparent 50%),
                                  radial-gradient(circle at 50% 80%, rgba(255, 255, 255, 0.3) 0%, transparent 30%)`,
              }}
            />

            {/* Atmosphere Rim Lighting */}
            <div className="absolute inset-0 rounded-full border-2 border-sky-300/40 shadow-[inset_0_0_30px_rgba(255,255,255,0.4)]" />

            {/* Glowing Golden Destination Beacon on Planet */}
            <div className="absolute top-[38%] left-[58%] -translate-x-1/2 -translate-y-1/2">
              <motion.div
                animate={{ scale: [1, 2, 1], opacity: [0.8, 1, 0.8] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="w-4 h-4 rounded-full bg-amber-300 shadow-[0_0_20px_#FBBF24]"
              />
              <div className="absolute -inset-2 rounded-full border border-amber-300/60 animate-ping" />
            </div>
          </div>
        </motion.div>

        {/* Atmosphere Clouds Transit Layer */}
        {zoomStage >= 1 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: zoomStage === 1 ? 0.7 : zoomStage === 2 ? 0.9 : 0, scale: 1.5 }}
            transition={{ duration: 2.5 }}
            className="absolute inset-0 bg-gradient-to-b from-sky-400/10 via-purple-300/10 to-amber-200/10 backdrop-blur-[2px] pointer-events-none"
          />
        )}

        {/* Stage 3: The Golden Warm Light Horizon */}
        {zoomStage >= 2 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: zoomStage === 3 ? 2.5 : 1 }}
            transition={{ duration: 3, ease: 'easeOut' }}
            className="absolute w-[400px] h-[400px] sm:w-[600px] sm:h-[600px] rounded-full bg-gradient-to-tr from-amber-400/30 via-rose-400/20 to-transparent blur-[80px]"
          />
        )}
      </div>

      {/* Stage Indicators */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="mb-8 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/40 border border-sky-400/30 backdrop-blur-md"
      >
        <Compass className="w-3.5 h-3.5 text-sky-400 animate-spin" style={{ animationDuration: '10s' }} />
        <span className="text-xs uppercase tracking-[0.25em] text-sky-200/90 font-mono">
          {zoomStage === 0 && 'ORBITING EARTH'}
          {zoomStage === 1 && 'ENTERING ATMOSPHERE'}
          {zoomStage === 2 && 'APPROACHING DESTINATION'}
          {zoomStage === 3 && 'A SPECIAL LIGHT FOUND'}
        </span>
      </motion.div>

      {/* Narrative Quotes */}
      <div className="max-w-xl mx-auto min-h-[140px] flex flex-col items-center justify-center space-y-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={`stage-text-${zoomStage}`}
            initial={{ opacity: 0, y: 20, filter: 'blur(6px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -20, filter: 'blur(6px)' }}
            transition={{ duration: 1.2 }}
            className="space-y-3"
          >
            {zoomStage === 0 && (
              <h2 className="text-2xl sm:text-4xl font-serif text-white leading-tight drop-shadow-md">
                {storyData.earthZoomQuotes[0] || 'From the infinite expanse of the universe…'}
              </h2>
            )}
            {zoomStage === 1 && (
              <h2 className="text-2xl sm:text-4xl font-serif text-sky-100 leading-tight drop-shadow-md">
                {storyData.earthZoomQuotes[1] || 'Down through the gentle atmosphere…'}
              </h2>
            )}
            {zoomStage === 2 && (
              <h2 className="text-2xl sm:text-4xl font-serif text-amber-100 leading-tight drop-shadow-md">
                {storyData.earthZoomQuotes[2] || 'To one specific place, and one specific moment in time.'}
              </h2>
            )}
            {zoomStage === 3 && (
              <h2 className="text-3xl sm:text-5xl font-serif text-amber-200 leading-tight drop-shadow-[0_0_30px_rgba(251,191,36,0.6)] flex items-center justify-center gap-3">
                <Sparkles className="w-6 h-6 text-amber-300" />
                Where everything began.
              </h2>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Manual Skip/Next Button if user prefers faster transition */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.7 }}
        whileHover={{ opacity: 1, scale: 1.05 }}
        onClick={onComplete}
        className="mt-12 text-xs uppercase tracking-widest text-gray-400 hover:text-white border-b border-gray-600 hover:border-white pb-0.5 transition"
      >
        Skip sequence ➔
      </motion.button>
    </motion.div>
  );
};
