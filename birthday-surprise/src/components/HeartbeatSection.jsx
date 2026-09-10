import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CONFIG } from '../data/config';

export default function HeartbeatSection() {
  const [phase, setPhase] = useState(0);
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let width = (canvas.width = canvas.parentElement.offsetWidth || window.innerWidth);
    let height = (canvas.height = 160);
    let animationFrameId;

    let x = 0;
    const points = [];

    const renderECG = () => {
      ctx.fillStyle = 'rgba(8, 8, 13, 0.15)';
      ctx.fillRect(0, 0, width, height);

      const midY = height / 2;

      x += 3;
      if (x > width) {
        x = 0;
        points.length = 0;
      }

      let y = midY;

      if (phase === 0) {
        const cycle = x % 140;
        if (cycle > 40 && cycle < 50) y = midY - 35;
        else if (cycle >= 50 && cycle < 60) y = midY + 40;
        else if (cycle >= 60 && cycle < 75) y = midY - 60;
        else if (cycle >= 75 && cycle < 85) y = midY + 20;
      } else {
        y = midY;
      }

      points.push({ x, y });

      ctx.beginPath();
      ctx.lineWidth = 2.5;
      ctx.strokeStyle = phase === 0 ? '#F9A8D4' : phase === 1 ? '#A1A1AA' : '#FBBF24';
      ctx.shadowBlur = 12;
      ctx.shadowColor = phase === 0 ? '#F9A8D4' : '#FBBF24';

      for (let i = 0; i < points.length; i++) {
        if (i === 0) ctx.moveTo(points[i].x, points[i].y);
        else ctx.lineTo(points[i].x, points[i].y);
      }
      ctx.stroke();

      animationFrameId = requestAnimationFrame(renderECG);
    };

    renderECG();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [phase]);

  const handleInView = () => {
    setTimeout(() => setPhase(1), 3500);
    setTimeout(() => setPhase(2), 7000);
  };

  return (
    <motion.section
      onViewportEnter={handleInView}
      viewport={{ once: true }}
      className="relative min-h-screen w-full flex flex-col items-center justify-center py-20 px-6 overflow-hidden bg-[#08080D] select-none"
    >
      <div className="absolute w-[450px] h-[450px] bg-rose-950/20 rounded-full blur-[160px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-4xl flex flex-col items-center text-center space-y-10">
        {/* ECG Waveform Canvas */}
        <div className="relative w-full h-40 flex items-center justify-center">
          <canvas ref={canvasRef} className="w-full h-full block" />
        </div>

        {/* Narrative Text Reveals */}
        <div className="min-h-[140px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            {phase === 0 && (
              <motion.p
                key="hb-text-1"
                initial={{ opacity: 0, y: 15, filter: 'blur(8px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -15, filter: 'blur(8px)' }}
                transition={{ duration: 1.2 }}
                className="text-xl sm:text-3xl font-serif text-gray-200 font-light tracking-wide"
              >
                "{CONFIG.heartbeatText1}"
              </motion.p>
            )}

            {phase === 1 && (
              <motion.p
                key="hb-text-2"
                initial={{ opacity: 0, y: 15, filter: 'blur(8px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -15, filter: 'blur(8px)' }}
                transition={{ duration: 1.2 }}
                className="text-xl sm:text-3xl font-serif text-gray-400 font-light tracking-wide italic"
              >
                "{CONFIG.heartbeatText2}"
              </motion.p>
            )}

            {phase === 2 && (
              <motion.div
                key="hb-text-3"
                initial={{ opacity: 0, scale: 0.85, filter: 'blur(12px)' }}
                animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col items-center gap-3"
              >
                <h2 className="text-3xl sm:text-5xl md:text-6xl font-display font-normal text-gradient-gold drop-shadow-[0_8px_30px_rgba(251,191,36,0.35)]">
                  "{CONFIG.heartbeatText3}"
                </h2>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.section>
  );
}
