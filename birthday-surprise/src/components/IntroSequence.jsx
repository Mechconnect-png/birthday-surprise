import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CONFIG } from '../data/config';

export default function IntroSequence({ onEnter }) {
  const [step, setStep] = useState(0); // 0: Msg 1, 1: Msg 2, 2: Ready & Button, 3: Zoom Warp Transition
  const canvasRef = useRef(null);

  useEffect(() => {
    // Step 0 -> Step 1 after 3.8s
    const timer1 = setTimeout(() => {
      setStep(1);
    }, 3800);

    // Step 1 -> Step 2 after 7.6s
    const timer2 = setTimeout(() => {
      setStep(2);
    }, 7600);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  // Warp Canvas particle effect when entering universe
  useEffect(() => {
    if (step !== 3) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    let animationFrameId;

    const stars = Array.from({ length: 250 }, () => ({
      x: (Math.random() - 0.5) * width,
      y: (Math.random() - 0.5) * height,
      z: Math.random() * width,
      color: Math.random() > 0.5 ? '#A78BFA' : Math.random() > 0.5 ? '#F9A8D4' : '#FBBF24'
    }));

    let speed = 2;

    const render = () => {
      speed += 1.2;
      ctx.fillStyle = 'rgba(8, 8, 13, 0.25)';
      ctx.fillRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;

      stars.forEach((star) => {
        star.z -= speed;
        if (star.z <= 0) {
          star.z = width;
          star.x = (Math.random() - 0.5) * width;
          star.y = (Math.random() - 0.5) * height;
        }

        const k = 128 / star.z;
        const px = star.x * k + cx;
        const py = star.y * k + cy;

        if (px >= 0 && px <= width && py >= 0 && py <= height) {
          const size = Math.max(0.5, (1 - star.z / width) * 5);
          ctx.fillStyle = star.color;
          ctx.beginPath();
          ctx.arc(px, py, size, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    const triggerTimer = setTimeout(() => {
      onEnter();
    }, 1400);

    return () => {
      cancelAnimationFrame(animationFrameId);
      clearTimeout(triggerTimer);
    };
  }, [step, onEnter]);

  const handleEnterClick = () => {
    setStep(3);
  };

  return (
    <motion.div
      exit={{ opacity: 0, scale: 1.1, filter: 'blur(20px)' }}
      transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#08080D] px-6 text-center select-none overflow-hidden"
    >
      {/* Warp Speed Canvas Effect during Step 3 */}
      {step === 3 && (
        <canvas ref={canvasRef} className="absolute inset-0 block w-full h-full z-40 pointer-events-none" />
      )}

      {/* Floating Ambient Glowing Particle */}
      <motion.div
        animate={{
          x: [0, 20, -15, 10, 0],
          y: [0, -25, 15, -10, 0],
          scale: [1, 1.4, 0.9, 1.3, 1],
          opacity: [0.4, 0.9, 0.5, 0.8, 0.4]
        }}
        transition={{ repeat: Infinity, duration: 8, ease: 'easeInOut' }}
        className="absolute w-32 h-32 bg-purple-500/20 rounded-full blur-3xl pointer-events-none"
      />

      <AnimatePresence mode="wait">
        {/* Step 0: "Some people deserve more than just a birthday message." */}
        {step === 0 && (
          <motion.div
            key="intro-msg-1"
            initial={{ opacity: 0, y: 15, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -15, filter: 'blur(10px)' }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-xl text-center"
          >
            <p className="text-xl md:text-3xl font-display font-light text-gray-200 tracking-wide leading-relaxed">
              "{CONFIG.introMessage1}"
            </p>
          </motion.div>
        )}

        {/* Step 1: "So I made you something." */}
        {step === 1 && (
          <motion.div
            key="intro-msg-2"
            initial={{ opacity: 0, y: 15, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -15, filter: 'blur(10px)' }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-xl text-center"
          >
            <p className="text-xl md:text-3xl font-display font-light text-purple-200 tracking-wide leading-relaxed">
              "{CONFIG.introMessage2}"
            </p>
          </motion.div>
        )}

        {/* Step 2: Heartbeat pulse & Massive Circular "ENTER ✦" Button */}
        {step === 2 && (
          <motion.div
            key="intro-ready-button"
            initial={{ opacity: 0, scale: 0.9, filter: 'blur(12px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, scale: 1.3, filter: 'blur(20px)' }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center justify-center"
          >
            {/* Heartbeat Pulse Indicator */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
              className="text-xs md:text-sm font-mono tracking-[0.3em] uppercase text-rose-300/80 mb-8"
            >
              {CONFIG.introMessage3}
            </motion.p>

            {/* Massive Circular ENTER Button */}
            <motion.button
              onClick={handleEnterClick}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.94 }}
              className="group relative flex items-center justify-center w-40 h-40 md:w-52 md:h-52 rounded-full border border-purple-400/40 bg-gradient-to-b from-purple-500/10 to-rose-500/10 backdrop-blur-md shadow-[0_0_50px_rgba(167,139,250,0.2)] transition-all duration-500 hover:border-purple-300 hover:shadow-[0_0_80px_rgba(249,168,212,0.4)]"
            >
              {/* Outer Pulsing Ring */}
              <div className="absolute inset-[-8px] rounded-full border border-rose-400/20 animate-ping opacity-30 pointer-events-none" />

              {/* Inside Button Content */}
              <div className="flex flex-col items-center gap-1 z-10">
                <span className="font-display text-2xl md:text-3xl text-white tracking-[0.25em] font-light group-hover:text-rose-200 transition-colors">
                  ENTER
                </span>
                <span className="text-lg text-gold-300 text-amber-300 animate-pulse">✦</span>
              </div>

              {/* Glowing Ambient Background on Hover */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-purple-600/30 to-rose-500/30 opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-sm" />
            </motion.button>
          </motion.div>
        )}

        {/* Step 3: Zoom Light Burst Overlay */}
        {step === 3 && (
          <motion.div
            key="intro-warp-burst"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 3 }}
            transition={{ duration: 1.4, ease: [0.7, 0, 0.84, 0] }}
            className="absolute inset-0 flex items-center justify-center bg-gradient-to-r from-purple-600/40 via-rose-500/40 to-amber-400/40 backdrop-blur-2xl pointer-events-none z-50"
          >
            <div className="w-96 h-96 rounded-full bg-white blur-3xl opacity-80 animate-pulse" />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
