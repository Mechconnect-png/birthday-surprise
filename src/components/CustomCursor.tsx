import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface CustomCursorProps {
  cursorText?: string | null;
}

export const CustomCursor: React.FC<CustomCursorProps> = ({ cursorText }) => {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [isPointer, setIsPointer] = useState(false);
  const [isTouch, setIsTouch] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  useEffect(() => {
    // Check if touch device
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
      setIsTouch(true);
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });

      const target = e.target as HTMLElement | null;
      if (!target) return;

      const isInteractive =
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.onclick !== null ||
        target.getAttribute('role') === 'button' ||
        target.closest('button') !== null ||
        target.closest('a') !== null;

      setIsPointer(isInteractive);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  if (isTouch) return null;

  return (
    <>
      {/* Outer Glow Ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-50 rounded-full border border-purple-400/40"
        style={{
          boxShadow: isPointer
            ? '0 0 25px rgba(249, 168, 212, 0.6), inset 0 0 15px rgba(167, 139, 250, 0.4)'
            : '0 0 15px rgba(167, 139, 250, 0.3)',
          background: isPointer ? 'rgba(167, 139, 250, 0.12)' : 'transparent',
        }}
        animate={{
          x: pos.x - (isPointer ? 24 : 16),
          y: pos.y - (isPointer ? 24 : 16),
          width: isPointer ? 48 : 32,
          height: isPointer ? 48 : 32,
          scale: isClicking ? 0.85 : 1,
        }}
        transition={{ type: 'spring', damping: 25, stiffness: 280, mass: 0.5 }}
      />

      {/* Center Point */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-50 w-2 h-2 rounded-full bg-gradient-to-tr from-purple-300 via-rose-300 to-amber-200 shadow-[0_0_10px_#fff]"
        animate={{
          x: pos.x - 4,
          y: pos.y - 4,
          scale: isPointer ? 1.5 : 1,
        }}
        transition={{ type: 'spring', damping: 40, stiffness: 600 }}
      />

      {/* Cursor Floating Badge Label if set */}
      {cursorText && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1, x: pos.x + 14, y: pos.y + 14 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="fixed pointer-events-none z-50 px-2.5 py-1 rounded-full text-[11px] font-medium tracking-wider uppercase bg-black/80 backdrop-blur-md border border-purple-400/30 text-purple-200 shadow-xl"
        >
          {cursorText}
        </motion.div>
      )}
    </>
  );
};
