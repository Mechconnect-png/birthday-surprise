import React from 'react';
import { motion } from 'framer-motion';

export default function CandleFlame({ isBlowing, isExtinguished, delay = 0 }) {
  if (isExtinguished) return null;

  return (
    <motion.div
      initial={{ opacity: 1, scale: 1 }}
      animate={
        isBlowing
          ? {
              rotate: [-25, 30, -20, 25, -35],
              scaleY: [0.8, 0.4, 0.7, 0.3, 0],
              scaleX: [1.3, 1.6, 0.8, 1.4, 0],
              opacity: [0.9, 0.5, 0.8, 0.3, 0],
            }
          : {
              rotate: [-3, 4, -2, 3, 0],
              scaleY: [1, 1.15, 0.95, 1.1, 1],
              scaleX: [1, 0.9, 1.05, 0.95, 1],
              opacity: [0.95, 1, 0.9, 1, 0.95],
            }
      }
      transition={
        isBlowing
          ? { duration: 0.75, delay }
          : { repeat: Infinity, duration: 1.2 + delay * 0.3, ease: 'easeInOut' }
      }
      className="relative flex items-center justify-center pointer-events-none"
    >
      {/* SVG Flame Layer */}
      <svg
        width="24"
        height="36"
        viewBox="0 0 24 36"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="drop-shadow-[0_0_15px_#F59E0B]"
      >
        <defs>
          <radialGradient id={`flameGrad-${delay}`} cx="50%" cy="80%" r="60%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="30%" stopColor="#FDE047" />
            <stop offset="70%" stopColor="#F59E0B" />
            <stop offset="100%" stopColor="#EF4444" stopOpacity="0.8" />
          </radialGradient>
        </defs>
        <path
          d="M12 0C12 0 20 12 20 22C20 28.6274 16.4183 34 12 34C7.58172 34 4 28.6274 4 22C4 12 12 0 12 0Z"
          fill={`url(#flameGrad-${delay})`}
        />
        <ellipse cx="12" cy="24" rx="4" ry="7" fill="#FFFFFF" opacity="0.85" />
      </svg>

      {/* Warm Ambient Box Shadow Glow on Cake */}
      <div className="absolute inset-[-8px] rounded-full bg-amber-400/30 blur-md pointer-events-none" />
    </motion.div>
  );
}
