import React from 'react';
import { AnimatePresence } from 'framer-motion';
import { useIntroState } from '../../hooks/useIntroState';
import DarkIntro from './DarkIntro';
import CakeScene from './CakeScene';
import CandleBlowEffect from './CandleBlowEffect';
import MagicTransition from './MagicTransition';

export default function BirthdayIntro({ onCompleteIntro }) {
  const { currentState, goToState, INTRO_STATES } = useIntroState(INTRO_STATES.DARKNESS);

  const handleStartClicked = () => {
    goToState(INTRO_STATES.CAKE_REVEAL);
  };

  const handleBlowOutClicked = () => {
    goToState(INTRO_STATES.BLOWING);
  };

  const handleCandlesExtinguished = () => {
    goToState(INTRO_STATES.MAGIC_TRANSITION);
  };

  const handleFinishWarp = () => {
    goToState(INTRO_STATES.MAIN_WEBSITE);
    onCompleteIntro();
  };

  return (
    <AnimatePresence mode="wait">
      {currentState === INTRO_STATES.DARKNESS && (
        <DarkIntro key="scene-1-darkness" onStart={handleStartClicked} />
      )}

      {currentState === INTRO_STATES.CAKE_REVEAL && (
        <CakeScene key="scene-2-cake" onBlowOut={handleBlowOutClicked} />
      )}

      {currentState === INTRO_STATES.BLOWING && (
        <CandleBlowEffect key="scene-3-blow" onComplete={handleCandlesExtinguished} />
      )}

      {currentState === INTRO_STATES.MAGIC_TRANSITION && (
        <MagicTransition key="scene-4-magic" onFinishTransition={handleFinishWarp} />
      )}
    </AnimatePresence>
  );
}
