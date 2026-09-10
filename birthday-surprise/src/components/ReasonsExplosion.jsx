import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CONFIG } from '../data/config';
import { Sparkles } from 'lucide-react';

export default function ReasonsExplosion() {
  const [reasonIndex, setReasonIndex] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const canvasRef = useRef(null);

  const reasons = CONFIG.reasons || [];

  const triggerParticleExplosion = (clientX, clientY) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const rect = canvas.getBoundingClientRect();
    const originX = clientX ? clientX - rect.left : canvas.width / 2;
    const originY = clientY ? clientY - rect.top : canvas.height / 2;

    const particles = Array.from({ length: 80 }, () => {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 7 + 2;
      return {
        x: originX,
        y: originY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        size: Math.random() * 3.5 + 1.5,
        alpha: 1,
        color: Math.random() > 0.4 ? '#A78BFA' : Math.random() > 0.5 ? '#F9A8D4' : '#FBBF24'
      };
    });

    let frameId;
    const renderExplosion = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      let aliveCount = 0;
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= 0.025;

        if (p.alpha > 0) {
          aliveCount++;
          ctx.save();
          ctx.globalAlpha = p.alpha;
          ctx.fillStyle = p.color;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }
      });

      if (aliveCount > 0) {
        frameId = requestAnimationFrame(renderExplosion);
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    };

    renderExplosion();
  };

  const handleWordClick = (e) => {
    triggerParticleExplosion(e.clientX, e.clientY);

    if (reasonIndex < reasons.length - 1) {
      setReasonIndex((prev) => prev + 1);
    } else {
      setIsFinished(true);
    }
  };

  const handleReset = () => {
    setReasonIndex(0);
    setIsFinished(false);
  };

  return (
    <section className="relative min-h-screen w-full flex flex-col items-center justify-center py-20 px-6 overflow-hidden bg-[#08080D] select-none">
      <canvas
        ref={canvasRef}
        width={800}
        height={500}
        className="absolute inset-0 block w-full h-full pointer-events-none z-20"
      />

      <div className="absolute w-[450px] h-[450px] bg-amber-500/10 rounded-full blur-[150px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="text-center z-10 mb-10"
      >
        <span className="text-xs font-sans tracking-[0.35em] uppercase text-amber-300 font-medium px-4 py-1.5 rounded-full border border-amber-500/20 glass-panel">
          SECTION 04 • THINGS THAT MAKE YOU, YOU
        </span>
      </motion.div>

      <div className="relative z-10 min-h-[35vh] flex flex-col items-center justify-center text-center max-w-4xl">
        <AnimatePresence mode="wait">
          {!isFinished ? (
            <motion.div
              key={reasons[reasonIndex]?.text || 'word'}
              initial={{ opacity: 0, scale: 0.85, filter: 'blur(12px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, scale: 1.2, filter: 'blur(16px)' }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              onClick={handleWordClick}
              className="cursor-pointer group flex flex-col items-center gap-5"
            >
              {/* Giant Exploding Word */}
              <h2 className="text-4xl sm:text-6xl md:text-7xl font-display font-light text-white group-hover:text-gradient-rose tracking-wider transition-all duration-300 drop-shadow-[0_8px_30px_rgba(251,191,36,0.3)]">
                {reasons[reasonIndex]?.text}
              </h2>

              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel border border-amber-400/30 text-amber-200 text-xs font-sans tracking-widest uppercase group-hover:border-amber-300 transition-colors">
                <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-spin" />
                <span>Tap to explode into particles ✦</span>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="finished-reasons"
              initial={{ opacity: 0, y: 25, filter: 'blur(10px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 1.3, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center space-y-5"
            >
              <p className="text-xl sm:text-3xl md:text-4xl font-serif text-white leading-relaxed font-light">
                "{CONFIG.reasonsFinalText1}"
              </p>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9, duration: 1.1 }}
                className="text-lg sm:text-2xl md:text-3xl font-display text-gradient-gold italic"
              >
                "{CONFIG.reasonsFinalText2}"
              </motion.p>

              <button
                onClick={handleReset}
                className="mt-4 px-5 py-2 rounded-full border border-amber-400/30 glass-panel text-amber-200 text-xs font-sans tracking-widest uppercase hover:bg-amber-500/20 transition-all"
              >
                Replay Reasons ✦
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
