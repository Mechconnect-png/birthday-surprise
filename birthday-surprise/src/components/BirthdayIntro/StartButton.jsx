import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function StartButton({ onClick, label = "LET'S START ✦" }) {
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - (rect.left + rect.width / 2)) * 0.25;
    const y = (e.clientY - (rect.top + rect.height / 2)) * 0.25;
    setMouseOffset({ x, y });
  };

  const handleMouseLeave = () => {
    setMouseOffset({ x: 0, y: 0 });
  };

  return (
    <motion.button
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: mouseOffset.x, y: mouseOffset.y }}
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.94 }}
      transition={{ type: 'spring', damping: 20, stiffness: 300 }}
      className="relative group px-10 py-5 rounded-full border border-purple-400/30 bg-gradient-to-b from-purple-500/10 to-rose-500/10 backdrop-blur-xl shadow-[0_0_40px_rgba(167,139,250,0.15)] hover:border-purple-300 hover:shadow-[0_0_60px_rgba(249,168,212,0.35)] transition-all duration-500 select-none"
    >
      {/* Outer Breathing Ring */}
      <div className="absolute inset-[-6px] rounded-full border border-rose-400/20 animate-pulse pointer-events-none opacity-40" />

      {/* Button Label */}
      <span className="relative z-10 font-display text-xl sm:text-2xl text-white tracking-[0.3em] font-light group-hover:text-rose-200 transition-colors">
        {label}
      </span>

      {/* Glowing Backdrop */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-600/30 to-rose-400/30 opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-sm pointer-events-none" />
    </motion.button>
  );
}
