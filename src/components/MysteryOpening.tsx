import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Heart, Search } from 'lucide-react';
import confetti from 'canvas-confetti';
import { storyData } from '../data/story';
import { soundEngine } from '../utils/soundEngine';

interface MysteryOpeningProps {
  onStart: () => void;
}

export const MysteryOpening: React.FC<MysteryOpeningProps> = ({ onStart }) => {
  /**
   * The 5 Sequential Stages:
   * 1. 'darkness'        -> Deep black cosmos, silence.
   * 2. 'cupid_arrives'   -> Cupid arrives on the left & searches with golden beam.
   * 3. 'heart_appears'   -> Heart appears right in front of Cupid on the right!
   * 4. 'ready_to_shoot'  -> Cupid locks aim, glowing shoot button appears.
   * 5. 'shooting'        -> Arrow flies from Cupid straight into the heart center.
   * 6. 'hit' / 'unlocked'-> Confetti explosion, music starts, universe opens!
   */
  const [stage, setStage] = useState<
    | 'darkness'
    | 'cupid_arrives'
    | 'heart_appears'
    | 'ready_to_shoot'
    | 'shooting'
    | 'hit'
    | 'unlocked'
  >('darkness');

  useEffect(() => {
    // 1. Darkness -> Cupid arrives (0.8s)
    const t1 = setTimeout(() => {
      setStage('cupid_arrives');
      soundEngine.playSparkle();
    }, 800);

    // 2. Cupid searches -> Heart appears directly in front (3.6s)
    const t2 = setTimeout(() => {
      setStage('heart_appears');
      soundEngine.playSparkle();
    }, 3600);

    // 3. Ready to shoot button (5.2s)
    const t3 = setTimeout(() => {
      setStage('ready_to_shoot');
    }, 5200);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  const handleShoot = () => {
    if (stage !== 'ready_to_shoot' && stage !== 'heart_appears') return;

    setStage('shooting');
    soundEngine.playSparkle();

    // Arrow flight: 500ms
    setTimeout(() => {
      setStage('hit');
      soundEngine.playShimmerClimax();

      // Confetti & Love Sparks Explosion from the heart
      confetti({
        particleCount: 90,
        spread: 100,
        origin: { x: 0.7, y: 0.5 },
        colors: ['#F472B6', '#FBBF24', '#A78BFA', '#FFFFFF', '#FDA4AF'],
        disableForReducedMotion: true,
      });

      // Transition to Universe scene
      setTimeout(() => {
        setStage('unlocked');
        setTimeout(() => {
          onStart();
        }, 1100);
      }, 1500);
    }, 500);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.1, filter: 'blur(12px)' }}
      transition={{ duration: 1.2 }}
      className="relative z-10 flex flex-col items-center justify-center min-h-screen w-full px-4 sm:px-6 py-6 text-center select-none overflow-hidden bg-[#030306]"
    >
      {/* Background Soft Glow Spotlight */}
      <div
        className={`absolute w-[500px] sm:w-[700px] h-[500px] sm:h-[700px] rounded-full bg-gradient-to-tr from-purple-900/20 via-pink-900/20 to-amber-600/15 blur-[140px] pointer-events-none -z-10 transition-opacity duration-1000 ${
          stage === 'darkness' ? 'opacity-0' : 'opacity-100 animate-pulse-glow'
        }`}
      />

      {/* COMPACT CENTERED CONTAINER */}
      <div className="w-full max-w-3xl flex flex-col items-center justify-center space-y-4 my-auto">
        {/* 1. HEADER NARRATIVE TEXT */}
        <div className="space-y-1.5 min-h-[68px] flex flex-col items-center justify-center">
          <AnimatePresence mode="wait">
            {stage === 'darkness' && (
              <motion.p
                key="t-dark"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.7 }}
                exit={{ opacity: 0 }}
                className="text-xs sm:text-sm font-mono tracking-widest text-gray-500 uppercase"
              >
                In the quiet expanse of the cosmos…
              </motion.p>
            )}

            {stage === 'cupid_arrives' && (
              <motion.div
                key="t-search"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="space-y-1"
              >
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-400/20 text-amber-300 text-xs font-mono tracking-wider">
                  <Search className="w-3 h-3 animate-spin" style={{ animationDuration: '4s' }} />
                  <span>CUPID ARRIVES</span>
                </div>
                <h2 className="text-lg sm:text-2xl font-serif text-gray-200 font-light tracking-wide">
                  Searching for the most special heart in the universe…
                </h2>
              </motion.div>
            )}

            {(stage === 'heart_appears' || stage === 'ready_to_shoot') && (
              <motion.div
                key="t-found"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-1"
              >
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-500/15 border border-pink-400/30 text-pink-300 text-xs font-mono tracking-widest uppercase shadow-lg">
                  <Sparkles className="w-3 h-3 text-amber-300" />
                  <span>HEART FOUND</span>
                </div>
                <h1 className="text-xl sm:text-3xl font-serif text-white font-medium tracking-wide drop-shadow-md">
                  There it is! Shoot Cupid’s Arrow to Begin 🏹
                </h1>
              </motion.div>
            )}

            {(stage === 'shooting' || stage === 'hit' || stage === 'unlocked') && (
              <motion.div
                key="t-unlocked"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-1"
              >
                <h1 className="text-2xl sm:text-4xl font-serif text-amber-200 font-medium tracking-wide drop-shadow-[0_0_30px_rgba(251,191,36,0.6)]">
                  Heart Unlocked! Unveiling Ilakkiya's World… ✨
                </h1>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* 2. UNIFIED SVG ARENA: CUPID ON LEFT (x=140) -> HEART IN FRONT ON RIGHT (x=460) */}
        <div
          onClick={handleShoot}
          className="relative w-full max-w-2xl h-[240px] sm:h-[280px] bg-[#0c0814]/80 backdrop-blur-md rounded-3xl border border-purple-500/25 shadow-[0_15px_50px_rgba(0,0,0,0.8)] flex items-center justify-center p-2 cursor-pointer group hover:border-pink-400/50 transition-all duration-300"
        >
          <svg
            viewBox="0 0 640 280"
            className="w-full h-full overflow-visible select-none pointer-events-none"
          >
            <defs>
              {/* Golden Wing Gradient */}
              <linearGradient id="cupidWingGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFFDF0" />
                <stop offset="60%" stopColor="#FDE68A" />
                <stop offset="100%" stopColor="#F59E0B" />
              </linearGradient>

              {/* Arrow Glow Gradient */}
              <linearGradient id="arrowGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#FDE68A" />
                <stop offset="50%" stopColor="#F472B6" />
                <stop offset="100%" stopColor="#F43F5E" />
              </linearGradient>

              {/* Heart Radial Glow */}
              <radialGradient id="heartGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#F43F5E" stopOpacity="0.8" />
                <stop offset="60%" stopColor="#DB2777" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#000000" stopOpacity="0" />
              </radialGradient>

              {/* Searching Light Cone Gradient */}
              <linearGradient id="searchBeamGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#FDE68A" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#F59E0B" stopOpacity="0" />
              </linearGradient>
            </defs>

            {/* ================= A. CUPID (POSITIONED ON LEFT: x=140, y=140) ================= */}
            {stage !== 'darkness' && (
              <g transform="translate(140, 140)">
                {/* Searching Light Cone (Pointing forward to where the heart will be) */}
                {stage === 'cupid_arrives' && (
                  <motion.polygon
                    points="30,-10 280,-70 300,70"
                    fill="url(#searchBeamGrad)"
                    animate={{ opacity: [0.2, 0.6, 0.2], rotate: [-8, 12, -8], transformOrigin: '30px 0px' }}
                    transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                  />
                )}

                {/* Fluttering Left Wing */}
                <motion.path
                  animate={{ rotate: [-8, 12, -8], transformOrigin: '-10px -10px' }}
                  transition={{ duration: 0.8, repeat: Infinity, ease: 'easeInOut' }}
                  d="M-15,-15 C-45,-40 -55,-15 -45,10 C-35,25 -20,15 -10,0 Z"
                  fill="url(#cupidWingGrad)"
                  opacity="0.95"
                />
                {/* Fluttering Right Wing */}
                <motion.path
                  animate={{ rotate: [10, -10, 10], transformOrigin: '0px -15px' }}
                  transition={{ duration: 0.8, repeat: Infinity, ease: 'easeInOut' }}
                  d="M-5,-20 C-15,-50 -35,-45 -40,-25 C-45,-10 -25,0 -5,-10 Z"
                  fill="url(#cupidWingGrad)"
                  opacity="0.85"
                />

                {/* Cupid Head & Hair */}
                <circle cx="10" cy="-25" r="14" fill="#FFE4B5" />
                <circle cx="5" cy="-36" r="6" fill="#F59E0B" />
                <circle cx="15" cy="-36" r="5.5" fill="#F59E0B" />
                <circle cx="1" cy="-30" r="5" fill="#F59E0B" />

                {/* Cupid Body */}
                <ellipse cx="5" cy="5" rx="12" ry="16" fill="#FFE4B5" />
                {/* Legs */}
                <path d="M-2,18 C-8,32 -16,36 -24,32" stroke="#FFE4B5" strokeWidth="7" strokeLinecap="round" fill="none" />
                <path d="M10,18 C14,32 22,36 30,34" stroke="#FFE4B5" strokeWidth="7" strokeLinecap="round" fill="none" />

                {/* Golden Bow in Hands */}
                <path
                  d="M26,-30 C44,-10 44,20 26,40"
                  stroke="#FBBF24"
                  strokeWidth="5"
                  strokeLinecap="round"
                  fill="none"
                />
                {/* Bowstring */}
                <path
                  d={stage === 'ready_to_shoot' ? 'M26,-30 L12,5 L26,40' : 'M26,-30 L26,5 L26,40'}
                  stroke="#FDE68A"
                  strokeWidth="2"
                  strokeDasharray="3,2"
                  fill="none"
                />

                {/* Ready Arrow in Bow */}
                {(stage === 'heart_appears' || stage === 'ready_to_shoot') && (
                  <g>
                    <line x1="12" y1="5" x2="48" y2="5" stroke="#FDE68A" strokeWidth="3.5" />
                    <path d="M48,5 L40,-1 L42,5 L40,11 Z" fill="#F43F5E" />
                  </g>
                )}

                {/* Cupid Label */}
                <text x="5" y="60" textAnchor="middle" fill="#FDE68A" fontSize="11" fontFamily="monospace" letterSpacing="2" fontWeight="600">
                  CUPID
                </text>
              </g>
            )}

            {/* ================= B. THE HEART (RIGHT IN FRONT OF CUPID: x=460, y=140) ================= */}
            {stage !== 'darkness' && stage !== 'cupid_arrives' && (
              <g transform="translate(460, 140)">
                <motion.g
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
                >
                  {/* Outer Pulsing Glow Aura */}
                  <circle cx="0" cy="0" r="75" fill="url(#heartGlow)" opacity={stage === 'hit' || stage === 'unlocked' ? '0.9' : '0.5'}>
                    <animate attributeName="r" values="65;85;65" dur="2s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.4;0.7;0.4" dur="2s" repeatCount="indefinite" />
                  </circle>

                  {/* Target Aim Ring (Dashed) */}
                  {stage === 'ready_to_shoot' && (
                    <circle cx="0" cy="0" r="50" fill="none" stroke="#FBBF24" strokeWidth="1.5" strokeDasharray="5,4" opacity="0.7">
                      <animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="10s" repeatCount="indefinite" />
                    </circle>
                  )}

                  {/* Heart SVG Silhouette */}
                  <g transform="scale(1.2)">
                    <path
                      d="M0,18 C-30,-15 -25,-40 0,-25 C25,-40 30,-15 0,18 Z"
                      fill="#F43F5E"
                      stroke="#FDA4AF"
                      strokeWidth="2.5"
                      className="filter drop-shadow-[0_0_12px_#F43F5E]"
                    />
                  </g>

                  {/* Inner Beating Heart Highlight */}
                  <path
                    d="M0,10 C-18,-10 -15,-25 0,-15 C15,-25 18,-10 0,10 Z"
                    fill="#FFF1F2"
                    opacity="0.4"
                  />

                  {/* Heart Label */}
                  <text x="0" y="55" textAnchor="middle" fill="#FDA4AF" fontSize="12" fontFamily="serif" fontWeight="600" letterSpacing="1">
                    {stage === 'hit' || stage === 'unlocked' ? '✨ Ilakkiya’s Heart ✨' : 'Ilakkiya’s Heart'}
                  </text>
                </motion.g>
              </g>
            )}

            {/* ================= C. THE FLYING / LODGED ARROW (FROM CUPID x=180 TO HEART x=460) ================= */}
            {stage !== 'darkness' && stage !== 'cupid_arrives' && stage !== 'heart_appears' && stage !== 'ready_to_shoot' && (
              <g>
                {/* Arrow moves smoothly from Cupid's Bow (x=180, y=145) to Heart Center (x=460, y=145) */}
                <motion.g
                  initial={{ x: 180, y: 145 }}
                  animate={{ x: 460, y: 145 }}
                  transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
                >
                  <g transform="translate(-70, 0)">
                    {/* Fletching (Feathers on left tail) */}
                    <path d="M0,-8 L12,0 L0,8" stroke="#FDE68A" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                    <path d="M8,-8 L20,0 L8,8" stroke="#FDE68A" strokeWidth="2.5" fill="none" strokeLinecap="round" />

                    {/* Luminous Shaft */}
                    <line x1="0" y1="0" x2="135" y2="0" stroke="url(#arrowGrad)" strokeWidth="4" strokeLinecap="round" />

                    {/* Pointed Heart Arrowhead piercing on the right */}
                    <path d="M125,-8 L145,0 L125,8 L130,0 Z" fill="#F43F5E" stroke="#FDE68A" strokeWidth="1.5" />
                    <circle cx="145" cy="0" r="3" fill="#FFFBEB" />
                  </g>
                </motion.g>

                {/* Impact Sparkle burst */}
                {(stage === 'hit' || stage === 'unlocked') && (
                  <g transform="translate(460, 145)">
                    <circle cx="0" cy="0" r="25" fill="#FBBF24" opacity="0.3">
                      <animate attributeName="r" values="10;35;0" dur="0.8s" repeatCount="1" />
                      <animate attributeName="opacity" values="0.8;0;0" dur="0.8s" repeatCount="1" />
                    </circle>
                  </g>
                )}
              </g>
            )}
          </svg>
        </div>

        {/* 3. INTERACTIVE BUTTON / PROGRESS TEXT */}
        <div className="min-h-[70px] flex flex-col items-center justify-center pt-1">
          <AnimatePresence mode="wait">
            {stage === 'ready_to_shoot' && (
              <motion.div
                key="shoot-btn"
                initial={{ opacity: 0, y: 10, scale: 0.92 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.92 }}
                transition={{ duration: 0.4 }}
                className="flex flex-col items-center"
              >
                <button
                  onClick={handleShoot}
                  className="relative px-10 py-3.5 rounded-full bg-gradient-to-r from-pink-600 via-rose-500 to-amber-500 text-white font-serif tracking-widest text-xs sm:text-sm uppercase shadow-[0_0_35px_rgba(244,63,94,0.6)] hover:shadow-[0_0_50px_rgba(251,191,36,0.8)] hover:scale-105 active:scale-95 transition-all duration-300 flex items-center gap-2.5 font-semibold group"
                >
                  <span>RELEASE CUPID'S ARROW 🏹</span>
                  <Sparkles className="w-4 h-4 text-amber-200 group-hover:rotate-45 transition-transform" />
                </button>
                <p className="mt-2 text-[10px] text-gray-500 font-mono tracking-widest uppercase">
                  Click the Button or Arena to Shoot
                </p>
              </motion.div>
            )}

            {stage === 'cupid_arrives' && (
              <motion.p
                key="searching-hint"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.7 }}
                className="text-[11px] text-amber-300/80 font-mono tracking-widest uppercase animate-pulse"
              >
                Cupid is looking across the stars…
              </motion.p>
            )}

            {(stage === 'shooting' || stage === 'hit' || stage === 'unlocked') && (
              <motion.div
                key="opening-txt"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-xs sm:text-sm font-mono tracking-[0.25em] text-amber-300 uppercase flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-amber-300 animate-spin" />
                <span>Opening Ilakkiya's Birthday Universe…</span>
                <Sparkles className="w-4 h-4 text-amber-300 animate-spin" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};
