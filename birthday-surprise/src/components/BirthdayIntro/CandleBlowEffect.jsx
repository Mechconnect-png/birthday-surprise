import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CONFIG } from '../../data/config';
import SmokeParticles from './SmokeParticles';

export default function CandleBlowEffect({ onComplete }) {
  const [phase, setPhase] = useState('WIND_BUILDUP'); // 'WIND_BUILDUP' | 'FLAME_REACTION' | 'EXTINGUISH' | 'EMOTIONAL_PAUSE' | 'CELEBRATE_TEXT'
  const [extinguishedCandles, setExtinguishedCandles] = useState([false, false, false]);
  const windCanvasRef = useRef(null);

  useEffect(() => {
    // 0ms-400ms: Wind buildup
    // 400ms-900ms: Flame reaction (bending & rapid flicker)
    const timer1 = setTimeout(() => setPhase('FLAME_REACTION'), 400);

    // 900ms: Staggered extinguish
    const timer2 = setTimeout(() => {
      setPhase('EXTINGUISH');
      // Candle 1 off
      setExtinguishedCandles([true, false, false]);
      // Candle 2 off (100ms)
      setTimeout(() => setExtinguishedCandles([true, true, false]), 100);
      // Candle 3 off (200ms)
      setTimeout(() => setExtinguishedCandles([true, true, true]), 200);
    }, 900);

    // 2.2s: Emotional Pause & "WISH UNLOCKED."
    const timer3 = setTimeout(() => setPhase('EMOTIONAL_PAUSE'), 2200);

    // 4.8s: "Now let's celebrate you."
    const timer4 = setTimeout(() => setPhase('CELEBRATE_TEXT'), 4800);

    // 7.4s: Trigger Magic Spark & Light Burst Explosion
    const timer5 = setTimeout(() => onComplete(), 7400);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
      clearTimeout(timer5);
    };
  }, [onComplete]);

  // Wind Particle Wave Canvas Effect
  useEffect(() => {
    if (phase !== 'WIND_BUILDUP' && phase !== 'FLAME_REACTION') return;

    const canvas = windCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    let animationFrameId;

    const streaks = Array.from({ length: 50 }, () => ({
      x: Math.random() * (width / 2),
      y: height / 2 + (Math.random() - 0.5) * 180,
      length: Math.random() * 90 + 50,
      speed: Math.random() * 20 + 14,
      alpha: Math.random() * 0.7 + 0.3,
    }));

    const renderWind = () => {
      ctx.clearRect(0, 0, width, height);

      streaks.forEach((s) => {
        s.x += s.speed;

        ctx.save();
        ctx.globalAlpha = s.alpha;
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.75)';
        ctx.lineWidth = 2;
        ctx.shadowBlur = 12;
        ctx.shadowColor = '#A78BFA';
        ctx.beginPath();
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(s.x + s.length, s.y);
        ctx.stroke();
        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(renderWind);
    };

    renderWind();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [phase]);

  const isBlowing = phase === 'WIND_BUILDUP' || phase === 'FLAME_REACTION';

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, filter: 'blur(16px)' }}
      transition={{ duration: 1 }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#030305] px-6 text-center select-none overflow-hidden"
    >
      {/* Wind Wave Particles Canvas */}
      {isBlowing && (
        <canvas ref={windCanvasRef} className="fixed inset-0 block w-full h-full pointer-events-none z-30" />
      )}

      {/* Smoke & Embers Particles Canvas when flames are extinguished */}
      {phase !== 'WIND_BUILDUP' && phase !== 'FLAME_REACTION' && <SmokeParticles />}

      {/* Cake Container with Candles */}
      <div className="relative z-10 flex flex-col items-center mb-12">
        {/* Candles on Cake Top */}
        <div className="flex justify-center gap-6 sm:gap-8 mb-[-4px] z-20">
          {[0, 1, 2].map((idx) => (
            <div key={idx} className="relative flex flex-col items-center">
              {/* Flame Component with Staggered Extinguish */}
              <AnimatePresence>
                {!extinguishedCandles[idx] && (
                  <motion.div
                    animate={
                      isBlowing
                        ? {
                            rotate: [-30, 35, -25, 30, -40],
                            scaleY: [0.7, 0.3, 0.6, 0.2, 0],
                            scaleX: [1.4, 1.7, 0.9, 1.5, 0],
                            opacity: [0.9, 0.4, 0.8, 0.2, 0],
                          }
                        : { opacity: 1 }
                    }
                    transition={{ duration: 0.6 }}
                    className="w-4 h-7 rounded-full bg-gradient-to-t from-amber-500 via-yellow-300 to-white shadow-[0_0_20px_#F59E0B]"
                  />
                )}
              </AnimatePresence>

              {/* Candle Stick */}
              <div className="w-2.5 h-12 bg-gradient-to-b from-rose-200 via-purple-300 to-purple-400 rounded-t-sm shadow-md border-x border-white/20" />
            </div>
          ))}
        </div>

        {/* Cake Silhouette in Dimmed Room */}
        <div className="relative flex flex-col items-center opacity-75 transition-opacity duration-1000">
          <div className="w-36 sm:w-44 h-16 rounded-t-2xl bg-gradient-to-b from-[#141026] via-[#100C1F] to-[#0A0714] border-t-2 border-rose-400/20" />
          <div className="w-52 sm:w-64 h-20 bg-gradient-to-b from-[#100C1F] via-[#0D091A] to-[#080510] border-t-2 border-purple-400/20" />
          <div className="w-68 sm:w-84 h-24 rounded-b-2xl bg-gradient-to-b from-[#0D091A] via-[#080510] to-[#040208] border-t-2 border-amber-400/20" />
        </div>
      </div>

      {/* Emotional Pause Typography Reveals */}
      <div className="relative z-40 min-h-[90px] flex items-center justify-center max-w-xl">
        <AnimatePresence mode="wait">
          {phase === 'EMOTIONAL_PAUSE' && (
            <motion.p
              key="wish-unlocked"
              initial={{ opacity: 0, y: 15, filter: 'blur(8px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -15, filter: 'blur(8px)' }}
              transition={{ duration: 1.4 }}
              className="text-2xl sm:text-4xl font-serif uppercase tracking-[0.3em] font-light text-rose-300"
            >
              "{CONFIG.wishUnlocked}"
            </motion.p>
          )}

          {phase === 'CELEBRATE_TEXT' && (
            <motion.p
              key="celebrate-text"
              initial={{ opacity: 0, y: 15, filter: 'blur(8px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 1.4 }}
              className="text-3xl sm:text-5xl font-display font-light text-gradient-gold tracking-wide"
            >
              "{CONFIG.celebrateText}"
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
