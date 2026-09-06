import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Crown, Heart, CheckCircle2, ChevronRight, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { storyData, QuizQuestion } from '../data/story';
import { soundEngine } from '../utils/soundEngine';

interface LoveQuizProps {
  onComplete: () => void;
}

export const LoveQuiz: React.FC<LoveQuizProps> = ({ onComplete }) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<{ label: string; reaction: string } | null>(null);
  const [isCompleted, setIsCompleted] = useState(false);

  const questions = storyData.quizQuestions;
  const currentQ = questions[currentIdx];

  const handleSelectOption = (opt: { label: string; reaction: string }) => {
    setSelectedAnswer(opt);
    soundEngine.playSparkle();

    // Trigger soft confetti burst
    confetti({
      particleCount: 35,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#F472B6', '#A78BFA', '#FBBF24', '#FFFFFF'],
      disableForReducedMotion: true,
    });
  };

  const handleNextQuestion = () => {
    setSelectedAnswer(null);
    if (currentIdx < questions.length - 1) {
      setCurrentIdx(currentIdx + 1);
    } else {
      setIsCompleted(true);
      soundEngine.playShimmerClimax();
      confetti({
        particleCount: 70,
        spread: 90,
        origin: { y: 0.6 },
        colors: ['#F472B6', '#A78BFA', '#FBBF24', '#38BDF8'],
        disableForReducedMotion: true,
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, filter: 'blur(10px)' }}
      transition={{ duration: 1 }}
      className="relative z-10 flex flex-col items-center justify-center min-h-screen py-16 px-4 sm:px-6 max-w-3xl mx-auto select-none"
    >
      {/* Header */}
      <div className="text-center space-y-3 mb-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-amber-500/10 border border-amber-400/20 text-amber-300 text-xs uppercase tracking-widest font-mono"
        >
          <Crown className="w-3.5 h-3.5 text-amber-400" />
          ACT V : BIRTHDAY GIRL QUIZ
        </motion.div>

        <h2 className="text-3xl sm:text-5xl font-serif text-white font-light tracking-wide">
          {storyData.quizTitle}
        </h2>
        <p className="text-sm sm:text-base text-gray-400 font-sans max-w-md mx-auto">
          {storyData.quizSubtitle}
        </p>
      </div>

      {!isCompleted ? (
        <div className="w-full">
          {/* Question Counter Progress */}
          <div className="flex items-center justify-between text-xs text-gray-400 font-mono mb-4 px-2">
            <span>QUESTION {currentIdx + 1} OF {questions.length}</span>
            <div className="flex gap-1">
              {questions.map((_, i) => (
                <span
                  key={`dot-${i}`}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    i === currentIdx ? 'bg-pink-400 scale-125' : i < currentIdx ? 'bg-purple-500' : 'bg-gray-700'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Question Card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentQ.id}
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.98 }}
              transition={{ duration: 0.4 }}
              className="bg-[#0f0f1d]/90 backdrop-blur-xl border border-purple-500/20 rounded-3xl p-6 sm:p-10 shadow-2xl space-y-8"
            >
              <h3 className="text-2xl sm:text-3xl font-serif text-white text-center font-normal leading-relaxed">
                {currentQ.question}
              </h3>

              {/* Options */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {currentQ.options.map((opt, idx) => {
                  const isChosen = selectedAnswer?.label === opt.label;
                  return (
                    <button
                      key={`opt-${idx}`}
                      onClick={() => handleSelectOption(opt)}
                      className={`p-5 rounded-2xl border text-center font-medium text-base sm:text-lg transition-all duration-300 flex items-center justify-center gap-3 ${
                        isChosen
                          ? 'bg-gradient-to-r from-pink-600 to-purple-600 text-white border-pink-400 shadow-[0_0_25px_rgba(244,114,182,0.5)] scale-102'
                          : 'bg-[#151528] hover:bg-[#1c1c36] text-gray-200 border-white/10 hover:border-pink-400/40'
                      }`}
                    >
                      <span>{opt.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Romantic / Playful Reaction Box */}
              <AnimatePresence>
                {selectedAnswer && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.4 }}
                    className="p-5 rounded-2xl bg-gradient-to-r from-pink-500/15 via-purple-500/15 to-transparent border border-pink-500/30 text-center space-y-4"
                  >
                    <p className="text-sm sm:text-base text-pink-100 font-sans font-medium">
                      {selectedAnswer.reaction}
                    </p>

                    <button
                      onClick={handleNextQuestion}
                      className="px-6 py-2.5 rounded-full bg-pink-500 hover:bg-pink-600 text-white text-xs sm:text-sm font-semibold inline-flex items-center gap-2 shadow-lg shadow-pink-500/30 transition active:scale-95"
                    >
                      <span>
                        {currentIdx < questions.length - 1 ? 'Next Question' : 'See Results'}
                      </span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </AnimatePresence>
        </div>
      ) : (
        /* Quiz Complete Card */
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-[#0f0f1d]/90 backdrop-blur-xl border border-pink-500/30 rounded-3xl p-8 sm:p-12 text-center space-y-6 max-w-xl shadow-2xl"
        >
          <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-tr from-pink-500 to-purple-500 flex items-center justify-center text-white shadow-[0_0_30px_rgba(244,114,182,0.6)]">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <h3 className="text-2xl sm:text-4xl font-serif text-white font-medium">
            100% Score! 🎉
          </h3>

          <p className="text-base sm:text-lg text-pink-200 font-sans leading-relaxed">
            {storyData.quizPassedMessage}
          </p>

          <button
            onClick={onComplete}
            className="px-8 py-3.5 rounded-full bg-gradient-to-r from-purple-600 via-pink-600 to-amber-500 hover:opacity-90 text-white font-medium text-sm flex items-center gap-2 mx-auto shadow-xl shadow-purple-900/30 transition active:scale-95"
          >
            <span>Read My Personal Letter</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </motion.div>
      )}
    </motion.div>
  );
};
