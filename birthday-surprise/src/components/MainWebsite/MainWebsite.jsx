import React, { useRef } from 'react';
import { motion } from 'framer-motion';

import Hero from './Hero';
import BirthdayGirlSection from '../BirthdayGirlSection';
import Memories from './Memories';
import Gallery from './Gallery';
import Reasons from './Reasons';
import HeartbeatSection from '../HeartbeatSection';
import LoveLetter from './LoveLetter';
import GiftSurprise from '../GiftSurprise';
import FinalWish from './FinalWish';

export default function MainWebsite({
  onNameClick,
  onSecretStarFound,
  setCursorText,
  onReplay,
}) {
  const heroNextRef = useRef(null);

  const handleScrollToNext = () => {
    if (heroNextRef.current) {
      heroNextRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
      className="relative z-10"
    >
      {/* Hero Birthday Section */}
      <Hero scrollToNext={handleScrollToNext} onNameClick={onNameClick} />

      {/* Section 1: Portrait Focus */}
      <div ref={heroNextRef}>
        <BirthdayGirlSection />
      </div>

      {/* Section 2: Constellation Memory Universe */}
      <Memories onSecretStarFound={onSecretStarFound} />

      {/* Section 3: 3D Floating Photo Gallery */}
      <Gallery onHoverPhoto={setCursorText} />

      {/* Section 4: Things That Make You, You */}
      <Reasons />

      {/* Section 5: Heartbeat ECG Line */}
      <HeartbeatSection />

      {/* Section 6: Secret Handwritten Love Letter */}
      <LoveLetter onHoverLetter={setCursorText} />

      {/* Section 7: Mysterious Gift & Confetti Climax */}
      <GiftSurprise />

      {/* Final Screen & Replay */}
      <FinalWish onReplay={onReplay} />
    </motion.main>
  );
}
