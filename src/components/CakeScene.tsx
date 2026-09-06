import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Mic } from 'lucide-react';
import confetti from 'canvas-confetti';
import { storyData } from '../data/story';
import { soundEngine } from '../utils/soundEngine';

interface CakeSceneProps {
  onComplete: () => void;
}

export const CakeScene: React.FC<CakeSceneProps> = ({ onComplete }) => {
  /**
   * Sequence Steps:
   * 1: 'darkness' - near black & silence
   * 2: 'cake_appear' - cake slowly materializes with rim lighting
   * 3: 'lighting_candles' - candles light one by one
   * 4: 'make_a_wish' - "Make a wish… ✨" displayed (2-3s)
   * 5: 'show_blow_button' - "BLOW THE CANDLES 🕯️" button visible
   * 6: 'blowing' - flames bend, extinguish, rising smoke wisps
   * 7: 'complete_darkness' - 1s complete pitch black silence
   * 8: 'climax_reveal' - Golden Light Burst -> ONLY: # HAPPY BIRTHDAY ❤️ (held for 4s)
   */
  const [step, setStep] = useState<
    | 'darkness'
    | 'cake_appear'
    | 'lighting_candles'
    | 'make_a_wish'
    | 'show_blow_button'
    | 'blowing'
    | 'complete_darkness'
    | 'climax_reveal'
  >('darkness');

  const [litCandles, setLitCandles] = useState<number[]>([]);
  const [isBlown, setIsBlown] = useState(false);
  const [micActive, setMicActive] = useState(false);
  const micStreamRef = useRef<MediaStream | null>(null);
  const totalCandles = 5;

  // Step 1 -> Step 2: Sudden darkness -> Cake appears
  useEffect(() => {
    soundEngine.setVolume(0.2); // Soften ambient music

    const t1 = setTimeout(() => {
      setStep('cake_appear');
    }, 1800);

    const t2 = setTimeout(() => {
      setStep('lighting_candles');
    }, 3800);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      if (micStreamRef.current) {
        micStreamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  // Step 3: Candle lighting sequence
  useEffect(() => {
    if (step !== 'lighting_candles') return;

    let index = 0;
    const interval = setInterval(() => {
      if (index < totalCandles) {
        const candleNum = index;
        setLitCandles((prev) => [...prev, candleNum]);
        soundEngine.playCandleLight();
        index++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          setStep('make_a_wish');
        }, 1200);
      }
    }, 700);

    return () => clearInterval(interval);
  }, [step]);

  // Step 4 -> Step 5: Make a wish -> Show button after 2.5 seconds
  useEffect(() => {
    if (step !== 'make_a_wish') return;

    const timer = setTimeout(() => {
      setStep('show_blow_button');
    }, 2800);

    return () => clearTimeout(timer);
  }, [step]);

  // Optional Microphone Blow Detection (Enhancement, completely optional)
  const enableMicrophone = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      micStreamRef.current = stream;
      setMicActive(true);

      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const audioCtx = new AudioCtx();
      const analyser = audioCtx.createAnalyser();
      const microphone = audioCtx.createMediaStreamSource(stream);
      analyser.fftSize = 512;
      microphone.connect(analyser);

      const dataArray = new Uint8Array(analyser.frequencyBinCount);

      const checkBlow = () => {
        if (isBlown) return;
        analyser.getByteFrequencyData(dataArray);
        let sum = 0;
        // Low frequency wind sound check
        for (let i = 0; i < 30; i++) {
          sum += dataArray[i];
        }
        const average = sum / 30;
        if (average > 65) {
          handleBlow();
        } else {
          requestAnimationFrame(checkBlow);
        }
      };
      requestAnimationFrame(checkBlow);
    } catch {
      // Microphone denied or unavailable - button is primary
      setMicActive(false);
    }
  };

  // Step 5: Blow interaction
  const handleBlow = () => {
    if (isBlown || (step !== 'show_blow_button' && step !== 'make_a_wish')) return;
    setIsBlown(true);
    setStep('blowing');
    soundEngine.playBlowSound();

    if (micStreamRef.current) {
      micStreamRef.current.getTracks().forEach((track) => track.stop());
    }

    // After 1.8s of smoke and flames going out -> 1s Pitch black darkness
    setTimeout(() => {
      setStep('complete_darkness');
      setLitCandles([]);
    }, 2000);

    // After 1.2s of silence -> Golden Light Climax Reveal
    setTimeout(() => {
      setStep('climax_reveal');
      soundEngine.setVolume(0.8);
      soundEngine.playShimmerClimax();

      // Golden Confetti & Star explosion
      confetti({
        particleCount: 80,
        spread: 100,
        origin: { y: 0.6 },
        colors: ['#FBBF24', '#F472B6', '#E879F9', '#FFFFFF', '#FDE68A'],
        disableForReducedMotion: true,
      });

      // Hold # HAPPY BIRTHDAY ❤️ for 4.5s before moving to timeline
      setTimeout(() => {
        onComplete();
      }, 4800);
    }, 3300);
  };

  return (
    <div className="relative z-20 flex flex-col items-center justify-center min-h-screen px-6 text-center select-none overflow-hidden bg-[#030306]">
      {/* STEP 7 / 8: GOLDEN BURST & HAPPY BIRTHDAY REVEAL */}
      <AnimatePresence>
        {step === 'climax_reveal' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/95 px-6"
          >
            {/* Burst Glow Halo */}
            <motion.div
              initial={{ scale: 0.2, opacity: 0 }}
              animate={{ scale: [0.2, 2.5, 2], opacity: [0, 0.8, 0.4] }}
              transition={{ duration: 2.2 }}
              className="absolute w-[400px] sm:w-[650px] h-[400px] sm:h-[650px] rounded-full bg-gradient-to-tr from-amber-400/40 via-rose-400/30 to-purple-500/20 blur-[100px] pointer-events-none"
            />

            {/* ONLY: HAPPY BIRTHDAY ❤️ */}
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 1.8, delay: 0.3, ease: 'easeOut' }}
              className="relative z-10 space-y-4"
            >
              <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-serif text-white tracking-wider font-medium drop-shadow-[0_0_40px_rgba(251,191,36,0.8)] bg-gradient-to-r from-amber-100 via-rose-100 to-amber-200 bg-clip-text text-transparent">
                HAPPY BIRTHDAY ❤️
              </h1>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.5, delay: 1 }}
                className="flex items-center justify-center gap-2 text-amber-300/80"
              >
                <Sparkles className="w-5 h-5 text-amber-300 animate-pulse" />
                <span className="text-xs uppercase tracking-[0.3em] font-mono">
                  A new chapter begins
                </span>
                <Sparkles className="w-5 h-5 text-amber-300 animate-pulse" />
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* COMPLETE DARKNESS PAUSE (Step 7) */}
      {step === 'complete_darkness' && (
        <div className="fixed inset-0 bg-black z-40 transition-opacity duration-700" />
      )}

      {/* STEPS 2 TO 6: THE CAKE & CANDLE INTERACTION */}
      {step !== 'complete_darkness' && step !== 'climax_reveal' && (
        <div className="relative flex flex-col items-center justify-center max-w-xl w-full mx-auto my-auto">
          {/* Subtle Cake Warm Glow Spotlight */}
          <div
            className={`w-[320px] sm:w-[480px] h-[320px] sm:h-[480px] rounded-full bg-radial from-amber-500/20 via-rose-500/5 to-transparent blur-[80px] absolute -z-10 transition-opacity duration-1000 ${
              step === 'cake_appear' || step === 'lighting_candles' || step === 'make_a_wish' || step === 'show_blow_button'
                ? 'opacity-100'
                : 'opacity-0'
            }`}
          />

          {/* THE CAKE ILLUSTRATION / CONTAINER */}
          <AnimatePresence>
            {step !== 'darkness' && (
              <motion.div
                initial={{ opacity: 0, y: 40, scale: 0.9 }}
                animate={{
                  opacity: step === 'blowing' ? 0.7 : 1,
                  y: 0,
                  scale: 1,
                }}
                transition={{ duration: 1.5, ease: 'easeOut' }}
                className="relative flex flex-col items-center justify-center mt-6"
              >
                {/* CANDLES ROW */}
                <div className="flex items-end justify-center gap-4 sm:gap-6 mb-[-6px] relative z-20">
                  {Array.from({ length: totalCandles }).map((_, idx) => {
                    const isLit = litCandles.includes(idx) && !isBlown;
                    const candleHeight = idx === 2 ? 52 : idx % 2 === 1 ? 46 : 40;

                    return (
                      <div key={`candle-${idx}`} className="flex flex-col items-center relative">
                        {/* FLAME & GLOW */}
                        <div className="h-10 flex items-center justify-center relative">
                          <AnimatePresence>
                            {isLit && (
                              <motion.div
                                initial={{ scale: 0, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{
                                  scale: [1, 1.4, 0],
                                  opacity: [1, 0.8, 0],
                                  x: [0, (idx - 2) * 8, (idx - 2) * 15],
                                }}
                                transition={{ duration: step === 'blowing' ? 0.4 : 0.6 }}
                                className="relative flex flex-col items-center"
                              >
                                {/* Flame teardrop */}
                                <motion.div
                                  animate={{
                                    scaleY: [1, 1.15, 0.95, 1],
                                    scaleX: [1, 0.9, 1.05, 1],
                                    rotate: [-2, 2, -1, 0],
                                  }}
                                  transition={{
                                    duration: 1.2 + idx * 0.15,
                                    repeat: Infinity,
                                    ease: 'easeInOut',
                                  }}
                                  className="w-3.5 h-6 rounded-full bg-gradient-to-t from-amber-500 via-yellow-300 to-white shadow-[0_0_15px_#F59E0B,0_0_30px_#FBBF24]"
                                />
                                {/* Soft ambient flame aura */}
                                <div className="absolute -inset-2 rounded-full bg-amber-400/30 blur-md pointer-events-none" />
                              </motion.div>
                            )}
                          </AnimatePresence>

                          {/* RISING SMOKE PARTICLES AFTER BLOW */}
                          <AnimatePresence>
                            {step === 'blowing' && (
                              <motion.div
                                initial={{ opacity: 0, y: 0, scale: 0.5 }}
                                animate={{ opacity: [0, 0.8, 0], y: -50, scale: 2, x: (idx - 2) * 10 }}
                                transition={{ duration: 1.4, delay: idx * 0.08 }}
                                className="absolute -top-4 w-4 h-8 bg-gray-400/40 rounded-full blur-[3px]"
                              />
                            )}
                          </AnimatePresence>
                        </div>

                        {/* Candle Wick */}
                        <div className="w-0.5 h-2 bg-gray-800 -mb-0.5 z-10" />

                        {/* Candle Wax Body with gold stripes */}
                        <div
                          style={{ height: `${candleHeight}px` }}
                          className="w-3 sm:w-3.5 rounded-t-sm bg-gradient-to-b from-rose-200 via-pink-100 to-rose-200 shadow-md border-x border-pink-300/40 relative overflow-hidden"
                        >
                          {/* Candle Striping */}
                          <div className="absolute inset-0 opacity-40 bg-[repeating-linear-gradient(45deg,#FBBF24,#FBBF24_2px,transparent_2px,transparent_6px)]" />
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* CAKE BASE - 2 TIERS WITH GOLD RIM LIGHTING */}
                <div className="relative flex flex-col items-center">
                  {/* Top Tier */}
                  <div className="w-48 sm:w-60 h-16 sm:h-20 rounded-t-2xl bg-gradient-to-b from-[#2A1728] via-[#1E1020] to-[#140816] border-t-2 border-x border-amber-300/60 shadow-[0_0_30px_rgba(251,191,36,0.25)] relative overflow-hidden flex items-start justify-around px-3 pt-2">
                    {/* Cream Frosting Swags */}
                    {Array.from({ length: 7 }).map((_, i) => (
                      <div
                        key={`frosting-top-${i}`}
                        className="w-5 h-4 -mt-2 rounded-full bg-gradient-to-b from-rose-200 to-pink-100/80 shadow-sm"
                      />
                    ))}
                    {/* Decorative gold pearls */}
                    <div className="absolute bottom-2 inset-x-0 flex justify-around px-4">
                      {Array.from({ length: 6 }).map((_, i) => (
                        <div key={`pearl-${i}`} className="w-1.5 h-1.5 rounded-full bg-amber-300 shadow-[0_0_6px_#FBBF24]" />
                      ))}
                    </div>
                  </div>

                  {/* Bottom Tier */}
                  <div className="w-64 sm:w-80 h-20 sm:h-24 rounded-t-2xl bg-gradient-to-b from-[#381B34] via-[#241022] to-[#120614] border-t-2 border-x border-amber-300/50 shadow-[0_10px_40px_rgba(0,0,0,0.8)] relative overflow-hidden flex items-start justify-around px-4 pt-2">
                    {/* Cream Frosting Swags */}
                    {Array.from({ length: 9 }).map((_, i) => (
                      <div
                        key={`frosting-bot-${i}`}
                        className="w-6 h-5 -mt-2 rounded-full bg-gradient-to-b from-rose-200 to-pink-100/90 shadow-sm"
                      />
                    ))}
                    {/* Delicate golden filigree line */}
                    <div className="absolute bottom-4 inset-x-8 h-px bg-gradient-to-r from-transparent via-amber-300/70 to-transparent" />
                  </div>

                  {/* Cake Stand / Plate with Golden Rim */}
                  <div className="w-72 sm:w-96 h-5 rounded-full bg-gradient-to-r from-amber-400/40 via-amber-200/90 to-amber-400/40 border-t border-amber-100 shadow-[0_10px_30px_rgba(251,191,36,0.3)] relative -mt-1" />
                  <div className="w-32 sm:w-44 h-4 bg-gradient-to-b from-amber-300/50 to-transparent mx-auto rounded-b-xl" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* STEP 4 & 5: "Make a wish… ✨" and "BLOW THE CANDLES 🕯️" BUTTON */}
          <div className="mt-8 min-h-[120px] flex flex-col items-center justify-center space-y-4">
            <AnimatePresence mode="wait">
              {(step === 'make_a_wish' || step === 'show_blow_button') && (
                <motion.div
                  key="wish-prompt"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 1.2 }}
                  className="space-y-2"
                >
                  <h2 className="text-3xl sm:text-5xl font-serif text-amber-200 tracking-wide font-normal drop-shadow-[0_0_25px_rgba(251,191,36,0.5)]">
                    {storyData.candlePrompt}
                  </h2>
                  <p className="text-xs sm:text-sm uppercase tracking-[0.25em] text-gray-400 font-sans font-light">
                    Take a deep breath and make a special birthday wish
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Glowing Interactive Blow Button */}
            <AnimatePresence>
              {step === 'show_blow_button' && !isBlown && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.85, y: 15 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.8 }}
                  className="flex flex-col items-center gap-3 pt-2"
                >
                  <button
                    onClick={handleBlow}
                    className="relative group px-8 sm:px-12 py-4 rounded-full bg-gradient-to-r from-amber-500 via-rose-500 to-purple-600 text-white font-serif tracking-widest text-sm sm:text-base uppercase shadow-[0_0_40px_rgba(251,191,36,0.4)] hover:shadow-[0_0_60px_rgba(244,114,182,0.6)] hover:scale-105 active:scale-95 transition-all duration-300"
                  >
                    <span className="flex items-center gap-3 font-semibold">
                      {storyData.blowButtonText}
                    </span>
                  </button>

                  {/* Optional Microphone Trigger Button */}
                  {!micActive && (
                    <button
                      onClick={enableMicrophone}
                      className="text-[11px] text-gray-400 hover:text-amber-300 flex items-center gap-1.5 transition underline decoration-dotted"
                    >
                      <Mic className="w-3 h-3" /> Enable microphone to blow into mic
                    </button>
                  )}
                  {micActive && (
                    <span className="text-[11px] text-emerald-400 flex items-center gap-1 animate-pulse">
                      <Mic className="w-3 h-3" /> Listening for your breath...
                    </span>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      )}
    </div>
  );
};
