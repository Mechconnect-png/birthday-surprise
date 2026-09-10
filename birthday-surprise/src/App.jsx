import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import Lenis from 'lenis';

import AmbientBackground from './components/AmbientBackground';
import CustomCursor from './components/CustomCursor';
import BirthdayIntro from './components/BirthdayIntro/BirthdayIntro';
import MainWebsite from './components/MainWebsite/MainWebsite';
import MusicPlayer from './components/MusicPlayer';
import EasterEggs from './components/EasterEggs';

export default function App() {
  const [isIntroActive, setIsIntroActive] = useState(true);
  const [autoPlayMusic, setAutoPlayMusic] = useState(false);
  const [cursorText, setCursorText] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);
  const [nameClickCount, setNameClickCount] = useState(0);

  // Initialize Lenis Smooth Scroll when main website unlocks
  useEffect(() => {
    if (isIntroActive) return;

    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.9,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, [isIntroActive]);

  const handleCompleteIntro = () => {
    setIsIntroActive(false);
    setAutoPlayMusic(true);
  };

  const handleNameClick = () => {
    setNameClickCount((prev) => prev + 1);
  };

  const handleSecretStarFound = () => {
    triggerToast("You found a secret ✨");
  };

  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const handleReplay = () => {
    setIsIntroActive(true);
    setAutoPlayMusic(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen bg-[#050505] text-gray-100 overflow-x-hidden selection:bg-purple-500/30 selection:text-white">
      {/* Ambient Starfield & Aurora Background */}
      <AmbientBackground />

      {/* Desktop Custom Trailing Cursor */}
      <CustomCursor cursorText={cursorText} />

      {/* Easter Egg Toast Notification System */}
      <EasterEggs
        toastMessage={toastMessage}
        setToastMessage={setToastMessage}
        nameClickCount={nameClickCount}
      />

      {/* Main Experience Controller */}
      <AnimatePresence mode="wait">
        {isIntroActive ? (
          <BirthdayIntro key="birthday-intro" onCompleteIntro={handleCompleteIntro} />
        ) : (
          <MainWebsite
            key="main-website"
            onNameClick={handleNameClick}
            onSecretStarFound={handleSecretStarFound}
            setCursorText={setCursorText}
            onReplay={handleReplay}
          />
        )}
      </AnimatePresence>

      {/* Floating Glass Music Player */}
      <MusicPlayer autoPlayTrigger={autoPlayMusic} />
    </div>
  );
}
