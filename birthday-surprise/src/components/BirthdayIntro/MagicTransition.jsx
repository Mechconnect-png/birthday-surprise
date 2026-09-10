import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

export default function MagicTransition({ onFinishTransition }) {
  const [phase, setPhase] = useState('SPARK'); // 'SPARK' | 'BOOM'
  const canvasRef = useRef(null);

  useEffect(() => {
    // 0.6s -> BOOM light explosion & confetti
    const timer1 = setTimeout(() => {
      setPhase('BOOM');
      confetti({
        particleCount: 160,
        spread: 130,
        origin: { y: 0.5 },
        colors: ['#FBBF24', '#F9A8D4', '#A78BFA', '#FFFFFF']
      });
    }, 600);

    // 2.4s -> Complete transition to main website
    const timer2 = setTimeout(() => {
      onFinishTransition();
    }, 2400);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [onFinishTransition]);

  // Warp Tunnel Flying Particle Engine
  useEffect(() => {
    if (phase !== 'BOOM') return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    let animationFrameId;

    const stars = Array.from({ length: 320 }, () => ({
      x: (Math.random() - 0.5) * width,
      y: (Math.random() - 0.5) * height,
      z: Math.random() * width,
      color: Math.random() > 0.4 ? '#FBBF24' : Math.random() > 0.5 ? '#F9A8D4' : '#A78BFA'
    }));

    let speed = 5;

    const renderWarp = () => {
      speed += 1.8;
      ctx.fillStyle = 'rgba(5, 5, 5, 0.2)';
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
          const size = Math.max(0.5, (1 - star.z / width) * 6.5);
          ctx.fillStyle = star.color;
          ctx.beginPath();
          ctx.arc(px, py, size, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      animationFrameId = requestAnimationFrame(renderWarp);
    };

    renderWarp();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [phase]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.2, filter: 'blur(20px)' }}
      transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#050505] overflow-hidden select-none"
    >
      {/* Warp Speed Camera Particle Canvas during BOOM */}
      {phase === 'BOOM' && (
        <canvas ref={canvasRef} className="fixed inset-0 block w-full h-full pointer-events-none z-30" />
      )}

      <AnimatePresence mode="wait">
        {/* Tiny Pulsing Spark Phase */}
        {phase === 'SPARK' && (
          <motion.div
            key="tiny-spark"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: [0.5, 1.5, 1], opacity: [0.4, 1, 0.8] }}
            exit={{ scale: 6, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="w-5 h-5 rounded-full bg-amber-300 shadow-[0_0_30px_#FBBF24] z-40 pointer-events-none"
          />
        )}

        {/* Light Explosion Burst Ring */}
        {phase === 'BOOM' && (
          <motion.div
            key="boom-ring"
            initial={{ scale: 0.1, opacity: 0.2 }}
            animate={{ scale: 4.5, opacity: 1 }}
            transition={{ duration: 1.5, ease: [0.7, 0, 0.84, 0] }}
            className="w-96 h-96 rounded-full bg-gradient-to-r from-amber-400 via-rose-500 to-purple-600 blur-3xl opacity-80 pointer-events-none z-20"
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}
