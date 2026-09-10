import { useState, useCallback } from 'react';
import { soundEngine } from '../effects/sound';

export function useSound() {
  const [isMuted, setIsMuted] = useState(true);

  const toggleMute = useCallback(() => {
    setIsMuted((prev) => {
      const next = !prev;
      soundEngine.isMuted = next;
      if (!next) {
        soundEngine.init();
      }
      return next;
    });
  }, []);

  const playWind = useCallback(() => {
    soundEngine.playWindWhoosh();
  }, []);

  const playChime = useCallback(() => {
    soundEngine.playSparkleChime();
  }, []);

  return {
    isMuted,
    toggleMute,
    playWind,
    playChime,
  };
}
