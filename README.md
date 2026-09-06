# 🌟 The Day My World Was Born — Cinematic Interactive Birthday Experience

A premium, interactive, cinematic love journey created for a birthday celebration. Built with React, TypeScript, Tailwind CSS, Framer Motion, Three.js / Canvas, Web Audio API, and Lucide React.

---

## ✨ The Cinematic Journey Flow

1. **Scene 1: Mystery Opening** — Dark cosmos, shimmering stars, *"You have a surprise waiting for you… ✨"*, and a glowing *"LET'S START ✨"* button that starts ambient music and initiates the journey.
2. **Scene 2: The Universe** — Immersive celestial nebula, stars, stardust drift, and timed narrative reveals: *"Before you were born… The universe was already preparing something beautiful."*
3. **Scene 3: Earth Zoom** — Cinematic camera descent: `SPACE → EARTH → ATMOSPHERE → CLOUDS → LAND → CITY LIGHTS → A WARM LIGHT`.
4. **Scene 4: Her Birth** — Symbolic newborn baby girl silhouette with warm golden halo, celestial crescent cradle, glowing particles: *"And then… Someone very special was born."*
5. **Scene 5: Cake & Candle Blow Sequence (Emotional Peak)**:
   - Sudden cinematic darkness & volume softening
   - Elegant two-tier birthday cake appears with warm golden rim lighting
   - Candles ignite one by one with glowing flickering flames and chimes
   - *"Make a wish… ✨"* (held in anticipation)
   - Glowing *"BLOW THE CANDLES 🕯️"* button (+ optional microphone blow detection)
   - Blow interaction: flames bend and extinguish, realistic rising smoke wisps, candle glow fades to dark
   - 1-second complete darkness & breathless silence
   - Sudden Golden Light Burst & Confetti Explosion revealing ONLY:
     # HAPPY BIRTHDAY ❤️ (held for 4–5s in cinematic purity)
6. **Scene 6: Her Life Timeline** — *"And that little girl… grew up to become the person I love today."* Interactive stage progression (`👶 Little Her` → `🌸 Growing Up` → `✨ Becoming Her` → `❤️ And Then… Me`) with Polaroid cards, tags, dates, and captions.
7. **Scene 7: Our Story** — 6 Milestones: *First Conversation*, *First Meeting*, *First Photo*, *Funniest Moment*, *Sweetest Moment*, *Unforgettable Memory* with interactive story modals.
8. **Scene 8: Memory Gallery** — Responsive masonry grid with fullscreen lightbox image viewer (keyboard arrow keys & mobile swipe gestures supported).
9. **Scene 9: Interactive Love Quiz** — *"One Question… ❤️"* with playful, witty, romantic answers for both options and celebration score badge.
10. **Scene 10: Love Letter** — Emotional slowdown, 3D wax-sealed envelope with *"OPEN MY LETTER 💌"*, gentle ambient music, and line-by-line reveal.
11. **Scene 11: Universe Finale** — Camera zooms back out to the cosmos, central portrait inside orbiting star rings: *"Out of billions of people… somehow, I found you. AND I'D CHOOSE YOU AGAIN. ❤️"*
12. **Scene 12: Final Surprise** — Glowing gift box, *"OPEN IT"*, explosion of fireworks and confetti: *"HAPPY BIRTHDAY, [HER NAME] ❤️"*, best photo showcase, and heartfelt message.
13. **Scene 13: Secret Easter Egg** — Tiny glowing star in the corner: *"You found the secret. ❤️"* (plays custom video `/public/assets/videos/final-surprise.mp4` or displays a private romantic secret message).
14. **Scene 14: Final Ending** — Peaceful cosmic fade: *"The universe created you… and somehow, it brought you into my life. Happy Birthday to my favourite person. ❤️ This is only the beginning… ✨"* with a Replay Experience button.

---

## 📁 Project Structure

```text
birthday-surprise/
├── public/
│   └── assets/
│       ├── photos/      <-- Put your custom JPG/PNG photos here
│       ├── music/       <-- Put your birthday song MP3 here (birthday-song.mp3)
│       ├── videos/      <-- Optional secret Easter Egg video (final-surprise.mp4)
│       └── images/      <-- Other custom imagery
├── src/
│   ├── components/
│   │   ├── AmbientStarfield.tsx  # Dynamic twinkling starfield & nebula canvas
│   │   ├── BirthScene.tsx        # Symbolic birth silhouette with golden halo
│   │   ├── CakeScene.tsx         # Cake lighting, candle blowing & golden reveal
│   │   ├── CustomCursor.tsx      # Desktop trailing glow cursor
│   │   ├── EarthZoomScene.tsx    # Cinematic Earth approach & atmosphere descent
│   │   ├── EasterEggModal.tsx    # Hidden secret star modal (video/message)
│   │   ├── FinalEnding.tsx       # Universe ending & replay controller
│   │   ├── FinalSurprise.tsx     # 3D Gift box & grand birthday climax
│   │   ├── LifeTimeline.tsx      # Her childhood to present day timeline
│   │   ├── LoveLetter.tsx        # Wax-sealed envelope & intimate letter
│   │   ├── LoveQuiz.tsx          # Romantic interactive questions & reactions
│   │   ├── MemoryGallery.tsx     # Masonry grid & fullscreen lightbox
│   │   ├── MusicController.tsx   # Persistent glassmorphism audio player
│   │   ├── MysteryOpening.tsx    # Opening mystery screen & start trigger
│   │   ├── OurStory.tsx          # 6 relationship chapter story cards
│   │   ├── SceneNavigator.tsx    # Top progress bar & chapter jumper
│   │   ├── UniverseFinale.tsx    # Orbiting constellation rings & climax
│   │   └── UniverseScene.tsx     # Cosmic opening with timed quote reveals
│   ├── data/
│   │   └── story.ts              # 🌟 SINGLE FILE TO EDIT ALL NAMES, DATES & TEXT
│   ├── utils/
│   │   ├── imageFallback.ts      # Graceful fallback images (never crashes)
│   │   └── soundEngine.ts        # Web Audio synth fallback + SFX
│   ├── App.tsx                   # Master cinematic orchestrator
│   ├── main.jsx                  # React DOM entry
│   └── index.css                 # Tailwind CSS & custom cinematic styles
├── index.html
├── package.json
├── tailwind.config.js
└── vite.config.js
```

---

## 🚀 How to Run the Website

In the `birthday-surprise` folder:

1. **Start development server:**
   ```bash
   npm run dev
   ```
2. Open the URL shown in your terminal (usually `http://localhost:5173/`).

3. **Build for production:**
   ```bash
   npm run build
   ```

---

## 🎨 How to Personalize the Website

You only need to edit **one file**:
👉 [`src/data/story.ts`](file:///c:/Users/sarat/.gemini/antigravity/scratch/birthday-surprise/src/data/story.ts)

### 1. Her Name & Dates
```typescript
girlfriendName: "Ilakkiya",
nickname: "My Star ✨",
birthdayDate: "2026-09-14",
birthdayFormatted: "September 14",
senderName: "Joe",
```

### 2. Add Photos
Drop your photos into `/public/assets/photos/`:
- `childhood-1.jpg` — Her baby/toddler photo
- `childhood-2.jpg` — Her school/growing up photo
- `growing-up.jpg` — Her recent photo
- `her-now.jpg` — Beautiful photo of her now
- `first-conversation.jpg` / `first-meeting.jpg` / `first-photo.jpg` — Relationship milestones
- `best-photo.jpg` — The ultimate best photo shown at the finale
*(If any photo is missing, romantic high-res placeholders load automatically).*

### 3. Add Music
Drop an MP3 file into:
`/public/assets/music/birthday-song.mp3`
*(If no file is provided, an ethereal synthesized ambient chord progression will play automatically).*

### 4. Edit the Personal Love Letter
In `src/data/story.ts`, customize the `letter` object:
```typescript
letter: {
  salutation: "To My Dearest...",
  paragraphs: [
    "Your custom lines here...",
  ],
  closing: "Forever and always yours,",
  signature: "Your Name ❤️"
}
```

### 5. Optional Secret Video (Easter Egg)
Drop an MP4 video into:
`/public/assets/videos/final-surprise.mp4`
When she clicks the tiny blinking star in the final scene, this secret video will open in a private theater modal!
