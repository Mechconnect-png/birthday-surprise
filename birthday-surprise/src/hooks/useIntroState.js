import { useState, useCallback } from 'react';

export const INTRO_STATES = {
  DARKNESS: 'DARKNESS',
  START_SCREEN: 'START_SCREEN',
  CAKE_REVEAL: 'CAKE_REVEAL',
  MAKE_A_WISH: 'MAKE_A_WISH',
  BLOWING: 'BLOWING',
  CANDLES_OUT: 'CANDLES_OUT',
  MAGIC_TRANSITION: 'MAGIC_TRANSITION',
  MAIN_WEBSITE: 'MAIN_WEBSITE',
};

export function useIntroState(initialState = INTRO_STATES.DARKNESS) {
  const [currentState, setCurrentState] = useState(initialState);

  const goToState = useCallback((nextState) => {
    if (INTRO_STATES[nextState]) {
      setCurrentState(nextState);
    }
  }, []);

  return {
    currentState,
    goToState,
    INTRO_STATES,
    isMainWebsite: currentState === INTRO_STATES.MAIN_WEBSITE,
  };
}
