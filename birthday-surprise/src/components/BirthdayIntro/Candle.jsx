import React from 'react';
import CandleFlame from './CandleFlame';

export default function Candle({ isBlowing, isExtinguished, delay = 0 }) {
  return (
    <div className="relative flex flex-col items-center select-none">
      {/* Flame */}
      <div className="mb-[-6px] z-30">
        <CandleFlame isBlowing={isBlowing} isExtinguished={isExtinguished} delay={delay} />
      </div>

      {/* Candle Stick */}
      <div className="relative w-3 h-14 bg-gradient-to-b from-rose-200 via-purple-300 to-purple-500 rounded-t-sm border-x border-white/30 shadow-md">
        {/* Soft Decorative Stripes */}
        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.3)_50%,transparent_75%)] bg-[length:10px_10px]" />
      </div>

      {/* Candle Shadow Base */}
      <div className="w-4 h-1.5 rounded-full bg-purple-950/60 blur-[1px] mt-[-2px]" />
    </div>
  );
}
