import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Layers, ChevronRight, RotateCcw } from 'lucide-react';

export type SceneKey =
  | 'mystery'
  | 'universe'
  | 'earth_zoom'
  | 'birth'
  | 'cake_blow'
  | 'timeline'
  | 'gallery'
  | 'love_quiz'
  | 'love_letter'
  | 'universe_finale'
  | 'final_surprise'
  | 'final_ending';

export interface SceneMeta {
  key: SceneKey;
  label: string;
  act: string;
}

export const SCENES: SceneMeta[] = [
  { key: 'mystery', label: 'Opening', act: 'Intro' },
  { key: 'universe', label: 'The Universe', act: 'Act I' },
  { key: 'earth_zoom', label: 'Earth Zoom', act: 'Act I' },
  { key: 'birth', label: 'Her Birth', act: 'Act I' },
  { key: 'cake_blow', label: 'Birthday Wish', act: 'Reveal' },
  { key: 'timeline', label: 'Her Journey', act: 'Act II' },
  { key: 'gallery', label: 'Gallery', act: 'Act III' },
  { key: 'love_quiz', label: 'Birthday Quiz', act: 'Act IV' },
  { key: 'love_letter', label: 'Birthday Letter', act: 'Act V' },
  { key: 'universe_finale', label: 'Universe Finale', act: 'Act VI' },
  { key: 'final_surprise', label: 'Grand Surprise', act: 'Finale' },
  { key: 'final_ending', label: 'Universe Ending', act: 'Epilogue' },
];

interface SceneNavigatorProps {
  currentScene: SceneKey;
  onSelectScene: (scene: SceneKey) => void;
  showNavControls?: boolean;
}

export const SceneNavigator: React.FC<SceneNavigatorProps> = ({
  currentScene,
  onSelectScene,
  showNavControls = true,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const currentIdx = SCENES.findIndex((s) => s.key === currentScene);
  const progressPercent = Math.round(((currentIdx + 1) / SCENES.length) * 100);

  // Don't show on opening screen until started
  if (currentScene === 'mystery' || !showNavControls) return null;

  return (
    <>
      {/* Top Subtle Cinematic Progress Bar */}
      <div className="fixed top-0 inset-x-0 z-40 h-[2px] bg-white/5 pointer-events-none">
        <motion.div
          className="h-full bg-gradient-to-r from-purple-500 via-pink-500 to-amber-400"
          initial={{ width: '0%' }}
          animate={{ width: `${progressPercent}%` }}
          transition={{ duration: 0.6 }}
        />
      </div>

      {/* Floating Scene Jumper Toggle in Top-Left */}
      <div className="fixed top-4 left-4 z-40">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#121220]/80 hover:bg-[#18182c]/90 backdrop-blur-md border border-purple-500/20 text-xs text-purple-200 shadow-lg font-mono"
          aria-label="Scene Index"
        >
          <Layers className="w-3.5 h-3.5 text-purple-400" />
          <span className="hidden sm:inline">{SCENES[currentIdx]?.label || 'Scenes'}</span>
          <span className="text-[10px] text-gray-400">({currentIdx + 1}/{SCENES.length})</span>
        </motion.button>

        {/* Scene Selection Dropdown */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              className="mt-2 w-64 max-h-[70vh] overflow-y-auto rounded-2xl bg-[#0f0f1d]/95 backdrop-blur-2xl border border-purple-500/30 p-2 shadow-2xl space-y-1"
            >
              <div className="px-3 py-1.5 text-[10px] font-mono uppercase tracking-widest text-gray-400 border-b border-white/5 flex justify-between">
                <span>Story Chapters</span>
                <span>{progressPercent}% Complete</span>
              </div>

              {SCENES.map((scene, idx) => {
                const isCurrent = scene.key === currentScene;
                return (
                  <button
                    key={scene.key}
                    onClick={() => {
                      onSelectScene(scene.key);
                      setIsOpen(false);
                    }}
                    className={`w-full px-3 py-2 rounded-xl text-left text-xs font-sans flex items-center justify-between transition ${
                      isCurrent
                        ? 'bg-purple-600/30 text-white font-medium border border-purple-400/40'
                        : 'text-gray-300 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-2 truncate">
                      <span className="text-[10px] font-mono text-purple-400 w-4">{idx + 1}.</span>
                      <span className="truncate">{scene.label}</span>
                    </div>
                    <span className="text-[10px] font-mono text-gray-500 uppercase">{scene.act}</span>
                  </button>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};
