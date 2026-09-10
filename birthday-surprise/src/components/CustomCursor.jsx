import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CustomCursor({ cursorText }) {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if touch device / mobile screen
    const checkMobile = () => {
      const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0 || window.innerWidth < 1024;
      setIsMobile(isTouch);
      if (!isTouch) {
        document.body.classList.add('custom-cursor-active');
      } else {
        document.body.classList.remove('custom-cursor-active');
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    const onMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });

      // Check if hovering interactive elements
      const target = e.target;
      const isInteractive = target.closest('button, a, input, [role="button"], .interactive-hover');
      setIsHovered(!!isInteractive);
    };

    const onMouseDown = () => setIsClicking(true);
    const onMouseUp = () => setIsClicking(false);

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);

    return () => {
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.body.classList.remove('custom-cursor-active');
    };
  }, []);

  if (isMobile) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {/* Primary Glowing Cursor Dot */}
      <motion.div
        className="fixed top-0 left-0 w-3 h-3 bg-purple-300 rounded-full shadow-[0_0_15px_#A78BFA] pointer-events-none z-50 mix-blend-difference"
        animate={{
          x: position.x - 6,
          y: position.y - 6,
          scale: isClicking ? 0.6 : isHovered ? 1.8 : 1,
        }}
        transition={{ type: 'spring', damping: 30, stiffness: 400, mass: 0.1 }}
      />

      {/* Trailing Ring with Blur & Hover Expansion */}
      <motion.div
        className="fixed top-0 left-0 rounded-full border border-purple-400/40 pointer-events-none z-40 flex items-center justify-center backdrop-blur-[1px]"
        animate={{
          x: position.x - (cursorText ? 45 : isHovered ? 28 : 18),
          y: position.y - (cursorText ? 45 : isHovered ? 28 : 18),
          width: cursorText ? 90 : isHovered ? 56 : 36,
          height: cursorText ? 90 : isHovered ? 56 : 36,
          backgroundColor: cursorText
            ? 'rgba(167, 139, 250, 0.2)'
            : isHovered
            ? 'rgba(249, 168, 212, 0.15)'
            : 'rgba(167, 139, 250, 0.03)',
          borderColor: cursorText
            ? 'rgba(249, 168, 212, 0.6)'
            : isHovered
            ? 'rgba(167, 139, 250, 0.5)'
            : 'rgba(255, 255, 255, 0.2)',
        }}
        transition={{ type: 'spring', damping: 25, stiffness: 250, mass: 0.2 }}
      >
        <AnimatePresence>
          {cursorText && (
            <motion.span
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              className="text-[10px] font-medium tracking-widest text-white uppercase text-center px-2 font-sans drop-shadow-md"
            >
              {cursorText}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
