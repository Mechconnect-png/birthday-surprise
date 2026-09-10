import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, PartyPopper, Gift, Sparkles } from 'lucide-react';
import { CONFIG } from '../data/config';

export default function CountdownSection() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isBirthday: false
  });

  useEffect(() => {
    const calculateTime = () => {
      const target = new Date(CONFIG.birthdayDate);
      const now = new Date();

      // Check if same day (ignoring year or on/after target)
      const diff = target.getTime() - now.getTime();

      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isBirthday: true });
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / 1000 / 60) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setTimeLeft({ days, hours, minutes, seconds, isBirthday: false });
    };

    calculateTime();
    const timer = setInterval(calculateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const headline = "Today is all about you 🎂";
  const words = headline.split(" ");

  return (
    <section className="py-20 px-4 relative z-20">
      <div className="max-w-4xl mx-auto">
        <div className="glass-card rounded-3xl p-8 md:p-12 text-center border border-pink-500/20 shadow-glow-pink relative overflow-hidden">
          {/* Subtle glowing backdrop circle */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-pink-500/10 rounded-full blur-[90px] pointer-events-none" />

          {/* Title Word-by-Word Animation */}
          <div className="flex flex-wrap justify-center items-center gap-x-3 gap-y-2 mb-8">
            {words.map((word, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-white"
              >
                {word === "you" || word === "you 🎂" ? (
                  <span className="text-gradient-romantic">{word}</span>
                ) : (
                  word
                )}
              </motion.span>
            ))}
          </div>

          <p className="text-gray-300 max-w-xl mx-auto mb-10 text-base md:text-lg">
            Every second bringing us closer to celebrating the most wonderful human being in my world.
          </p>

          {/* Countdown Display or Celebration Banner */}
          {timeLeft.isBirthday ? (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="py-8 px-6 rounded-2xl bg-gradient-to-r from-pink-500/20 via-rose-500/30 to-purple-500/20 border border-pink-400/40 shadow-glow-rose flex flex-col items-center"
            >
              <PartyPopper className="w-16 h-16 text-amber-300 animate-bounce mb-3" />
              <h3 className="text-4xl md:text-6xl font-serif font-black text-gradient-gold tracking-wide mb-2">
                IT'S YOUR DAY! 🎉
              </h3>
              <p className="text-pink-200 text-lg">Make a wish, my love... The universe is listening!</p>
            </motion.div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 md:gap-6 max-w-2xl mx-auto">
              {[
                { label: 'Days', value: timeLeft.days },
                { label: 'Hours', value: timeLeft.hours },
                { label: 'Minutes', value: timeLeft.minutes },
                { label: 'Seconds', value: timeLeft.seconds }
              ].map((unit, index) => (
                <motion.div
                  key={unit.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="glass-panel p-4 md:p-6 rounded-2xl border border-white/10 hover:border-pink-500/40 transition-colors flex flex-col items-center"
                >
                  <span className="text-3xl sm:text-4xl md:text-5xl font-mono font-bold text-gradient-romantic mb-1">
                    {String(unit.value).padStart(2, '0')}
                  </span>
                  <span className="text-xs uppercase tracking-widest text-pink-300/80 font-medium">
                    {unit.label}
                  </span>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
