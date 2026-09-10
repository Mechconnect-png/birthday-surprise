import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import DarkIntro from './DarkIntro';
import CakeScene from './CakeScene';
import CandleBlowEffect from './CandleBlowEffect';
import MagicTransition from './MagicTransition';

export default function IntroContainer({ onCompleteIntro }) {
  const [introState, setIntroState] = useState('DARKNESS'); // 'DARKNESS' | 'CAKE_REVEAL' | 'CANDLE_BLOW' | 'MAGIC_TRANSITION'

  const handleStartClicked = () => {
    setIntroState('CAKE_REVEAL');
  };

  const handleBlowOutClicked = () => {
    setIntroState('CANDLE_BLOW');
  };

  const handleCandlesExtinguished = () => {
    setIntroState('MAGIC_TRANSITION');
  };

  const handleFinishWarp = () => {
    onCompleteIntro();
  };

  return (
    <AnimatePresence mode="wait">
      {introState === 'DARKNESS' && (
        <DarkIntro key="scene-1-darkness" onStart={handleStartClicked} />
      )}

      {introState === 'CAKE_REVEAL' && (
        <CakeScene key="scene-2-cake" onBlowOut={handleBlowOutClicked} />
      )}

      {introState === 'CANDLE_BLOW' && (
        <CandleBlowEffect key="scene-3-blow" onComplete={handleCandlesExtinguished} />
      )}

      {introState === 'MAGIC_TRANSITION' && (
        <MagicTransition key="scene-4-magic" onFinishTransition={handleFinishWarp} />
      )}
    </AnimatePresence>
  );
}
