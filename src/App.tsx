import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { AmbientStarfield } from './components/AmbientStarfield';
import { CustomCursor } from './components/CustomCursor';
import { MusicController } from './components/MusicController';
import { SceneNavigator, SceneKey } from './components/SceneNavigator';
import { MysteryOpening } from './components/MysteryOpening';
import { UniverseScene } from './components/UniverseScene';
import { EarthZoomScene } from './components/EarthZoomScene';
import { BirthScene } from './components/BirthScene';
import { CakeScene } from './components/CakeScene';
import { LifeTimeline } from './components/LifeTimeline';
import { LoveQuiz } from './components/LoveQuiz';
import { LoveLetter } from './components/LoveLetter';
import { UniverseFinale } from './components/UniverseFinale';
import { FinalSurprise } from './components/FinalSurprise';
import { FinalEnding } from './components/FinalEnding';
import { EasterEggModal } from './components/EasterEggModal';

export default function App() {
  const [currentScene, setCurrentScene] = useState<SceneKey>('mystery');
  const [hasStartedMusic, setHasStartedMusic] = useState(false);
  const [isEasterEggOpen, setIsEasterEggOpen] = useState(false);

  // Transition Helpers
  const handleStartExperience = () => {
    setHasStartedMusic(true);
    setCurrentScene('universe');
  };

  const handleSceneComplete = (nextScene: SceneKey) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setCurrentScene(nextScene);
  };

  const handleReplay = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setCurrentScene('mystery');
  };

  // Determine starfield intensity based on current scene
  const getStarfieldIntensity = () => {
    switch (currentScene) {
      case 'mystery':
        return 0.4;
      case 'universe':
        return 1.0;
      case 'earth_zoom':
        return 0.8;
      case 'birth':
        return 0.3;
      case 'cake_blow':
        return 0.15;
      case 'timeline':
      case 'love_quiz':
      case 'love_letter':
        return 0.5;
      case 'universe_finale':
        return 1.0;
      case 'final_surprise':
        return 0.7;
      case 'final_ending':
        return 0.3;
      default:
        return 0.5;
    }
  };

  return (
    <div className="relative min-h-screen bg-[#050508] text-gray-100 overflow-x-hidden selection:bg-purple-500/30 selection:text-white font-sans">
      {/* Background Starfield & Cosmos */}
      <AmbientStarfield intensity={getStarfieldIntensity()} />

      {/* Desktop Trailing Glow Cursor */}
      <CustomCursor />

      {/* Top Scene Progress & Navigator Bar */}
      <SceneNavigator
        currentScene={currentScene}
        onSelectScene={(scene) => setCurrentScene(scene)}
        showNavControls={currentScene !== 'mystery'}
      />

      {/* Persistent Audio / Music Controller */}
      <MusicController autoPlayTrigger={hasStartedMusic} />

      {/* Secret Easter Egg Lightbox Modal */}
      <EasterEggModal
        isOpen={isEasterEggOpen}
        onClose={() => setIsEasterEggOpen(false)}
      />

      {/* Cinematic Scene Transition Container */}
      <main className="relative z-10 w-full min-h-screen">
        <AnimatePresence mode="wait">
          {currentScene === 'mystery' && (
            <MysteryOpening key="scene-mystery" onStart={handleStartExperience} />
          )}

          {currentScene === 'universe' && (
            <UniverseScene
              key="scene-universe"
              onNext={() => handleSceneComplete('earth_zoom')}
            />
          )}

          {currentScene === 'earth_zoom' && (
            <EarthZoomScene
              key="scene-earth-zoom"
              onComplete={() => handleSceneComplete('birth')}
            />
          )}

          {currentScene === 'birth' && (
            <BirthScene
              key="scene-birth"
              onComplete={() => handleSceneComplete('cake_blow')}
            />
          )}

          {currentScene === 'cake_blow' && (
            <CakeScene
              key="scene-cake-blow"
              onComplete={() => handleSceneComplete('timeline')}
            />
          )}

          {currentScene === 'timeline' && (
            <LifeTimeline
              key="scene-timeline"
              onComplete={() => handleSceneComplete('love_quiz')}
            />
          )}

          {currentScene === 'love_quiz' && (
            <LoveQuiz
              key="scene-love-quiz"
              onComplete={() => handleSceneComplete('love_letter')}
            />
          )}

          {currentScene === 'love_letter' && (
            <LoveLetter
              key="scene-love-letter"
              onComplete={() => handleSceneComplete('universe_finale')}
            />
          )}

          {currentScene === 'universe_finale' && (
            <UniverseFinale
              key="scene-universe-finale"
              onComplete={() => handleSceneComplete('final_surprise')}
            />
          )}

          {currentScene === 'final_surprise' && (
            <FinalSurprise
              key="scene-final-surprise"
              onComplete={() => handleSceneComplete('final_ending')}
            />
          )}

          {currentScene === 'final_ending' && (
            <FinalEnding
              key="scene-final-ending"
              onReplay={handleReplay}
              onOpenSecret={() => setIsEasterEggOpen(true)}
            />
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
