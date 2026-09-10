import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CONFIG } from '../../data/config';
import StartButton from './StartButton';

export default function DarkIntro({ onStart }) {
  const [step, setStep] = useState(1); // 1: "Hey...", 2: "I have something special for you.", 3: Show Button
  const canvasRef = useRef(null);

  useEffect(() => {
    // 2.0s -> "I have something special for you."
    const timer1 = setTimeout(() => setStep(2), 2000);

    // 4.5s -> Fades to reveal "LET'S START ✦"
    const timer2 = setTimeout(() => setStep(3), 4500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  // Subtle Floating Dust Particles Canvas Effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    let animationFrameId;

    const particles = Array.from({ length: 45 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 1.5 + 0.5,
      alpha: Math.random() * 0.5 + 0.1,
      speedY: Math.random() * -0.2 - 0.05,
      speedX: (Math.random() - 0.5) * 0.1,
    }));

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;

        if (p.y < 0) p.y = height;
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;

        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = '#A78BFA';
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // Allow fast forward if user taps anywhere on screen before button appears
  const handleScreenClick = () => {
    if (step < 3) {
      setStep(3);
    }
  };

  return (
    <motion.div
      onClick={handleScreenClick}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, filter: 'blur(20px)' }}
      transition={{ duration: 1.2 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#050505] px-6 text-center select-none overflow-hidden cursor-pointer"
    >
      {/* Dust Particles Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 block w-full h-full pointer-events-none z-0" />

      {/* Subtle Grain Overlay */}
      <div className="absolute inset-0 bg-grain opacity-25 mix-blend-overlay pointer-events-none" />

      {/* Soft Center Ambient Glow */}
      <div className="absolute w-[450px] h-[450px] bg-purple-900/15 rounded-full blur-[160px] pointer-events-none" />

      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div
            key="text-hey"
            initial={{ opacity: 0, filter: 'blur(10px)', y: 15 }}
            animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
            exit={{ opacity: 0, filter: 'blur(10px)', y: -15 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="z-10"
          >
            <p className="text-3xl sm:text-5xl font-display font-light text-gray-200 tracking-widest drop-shadow-md">
              "{CONFIG.introDarkText1}"
            </p>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            key="text-special"
            initial={{ opacity: 0, filter: 'blur(10px)', y: 15 }}
            animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
            exit={{ opacity: 0, filter: 'blur(10px)', y: -15 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="z-10 max-w-xl"
          >
            <p className="text-2xl sm:text-4xl font-display font-light text-purple-200/90 tracking-wide leading-relaxed drop-shadow-md">
              "{CONFIG.introDarkText2}"
            </p>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div
            key="start-button-wrapper"
            initial={{ opacity: 0, scale: 0.9, filter: 'blur(12px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="z-10 flex flex-col items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <StartButton onClick={onStart} label={CONFIG.introStartButton} />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
