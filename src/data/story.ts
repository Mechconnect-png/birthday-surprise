/**
 * =========================================================================
 * 🌟 CINEMATIC BIRTHDAY WEBSITE CONFIGURATION FILE (story.ts) 🌟
 * =========================================================================
 * 
 * Edit this single file to personalize the entire experience for your girlfriend!
 * 
 * HOW TO ADD YOUR OWN ASSETS:
 * - Photos: Add your JPG/PNG files to /public/assets/photos/ (e.g. photo1.jpg, photo2.jpg)
 * - Music: Add your MP3 file to /public/assets/music/birthday-song.mp3
 * - Video (Optional Secret): Add /public/assets/videos/final-surprise.mp4
 * - If any file is missing, high-quality romantic placeholders are used automatically.
 */

export interface TimelineItem {
  id: string;
  stage: string;       // e.g. "👶 Little Her", "🌸 Growing Up", "✨ Becoming Her", "❤️ And Then… Me"
  subtitle: string;    // e.g. "The earliest spark"
  year?: string;       // e.g. "2003"
  photo: string;       // Path or URL to photo
  caption: string;     // Short emotional description
  tags?: string[];
}

export interface MemoryChapter {
  id: string;
  title: string;       // e.g. "First Conversation", "First Meeting", etc.
  category: "first-chat" | "first-meeting" | "first-photo" | "funniest" | "sweetest" | "unforgettable";
  date?: string;
  photo: string;
  shortCaption: string;
  fullStory: string;
}

export interface GalleryPhoto {
  id: string;
  title: string;
  caption: string;
  date?: string;
  location?: string;
  src: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: {
    label: string;      // e.g. "Me 😌" or "You 😏"
    reaction: string;   // Romantic / playful response
  }[];
}

export interface StoryData {
  girlfriendName: string;
  nickname: string;
  birthdayDate: string; // "YYYY-MM-DD" or formatted
  birthdayFormatted: string;
  senderName: string;

  // Scene 1: Mystery
  mysteryPrompt: string;
  startButtonText: string;

  // Scene 2 & 3: Universe & Earth
  universeQuotes: string[];
  earthZoomQuotes: string[];

  // Scene 4 & 5: Birth & Candle Wish
  birthQuotes: string[];
  candlePrompt: string;
  blowButtonText: string;

  // Scene 6: Her Life Timeline
  timelineTitle: string;
  timelineSubtitle: string;
  timeline: TimelineItem[];

  // Scene 7: Our Relationship Chapters
  storyTitle: string;
  storySubtitle: string;
  memories: MemoryChapter[];

  // Scene 8: Memory Gallery
  galleryTitle: string;
  gallerySubtitle: string;
  gallery: GalleryPhoto[];

  // Scene 9: Love Quiz
  quizTitle: string;
  quizSubtitle: string;
  quizQuestions: QuizQuestion[];
  quizPassedMessage: string;

  // Scene 10: Love Letter
  letterEnvelopePrompt: string;
  letterTitle: string;
  letter: {
    salutation: string;
    paragraphs: string[];
    closing: string;
    signature: string;
  };

  // Scene 11: Universe Finale
  universeFinaleQuote1: string;
  universeFinaleQuote2: string;
  universeFinaleClimax: string;

  // Scene 12: Final Surprise
  surprisePrompt: string;
  bestPhoto: {
    src: string;
    caption: string;
  };
  finalMessage: {
    heading: string;
    body1: string;
    body2: string;
    quote: string;
  };

  // Secret Easter Egg
  secretVideo?: string; // e.g. "/assets/videos/final-surprise.mp4"
  secretMessage: string;

  // Music System
  favoriteSong: {
    title: string;
    artist: string;
    src: string; // e.g. "/assets/music/birthday-song.mp3"
  };
}

export const storyData: StoryData = {
  // 1. Basic Personal Info (REPLACE WITH HER ACTUAL NAME)
  girlfriendName: "Ilakkiya",
  nickname: "My Star ✨",
  birthdayDate: "2026-09-14",
  birthdayFormatted: "September 14",
  senderName: "Joe",

  // 2. Scene 1 — Mystery Opening
  mysteryPrompt: "You have a surprise waiting for you… ✨",
  startButtonText: "LET'S START ✨",

  // 3. Scene 2 & 3 — The Universe & Earth Zoom
  universeQuotes: [
    "Before you were born…",
    "The universe was already preparing something beautiful.",
    "Trillions of stars in motion, creating the exact spark that would become you."
  ],
  earthZoomQuotes: [
    "From the vastness of the cosmos…",
    "Down through the blue atmosphere…",
    "To one specific corner of our planet."
  ],

  // 4. Scene 4 & 5 — Her Birth & Candle Wish
  birthQuotes: [
    "And then…",
    "Someone extraordinarily special was born into this world.",
    "A life that would forever change mine."
  ],
  candlePrompt: "Make a wish… ✨",
  blowButtonText: "BLOW THE CANDLES 🕯️",

  // 5. Scene 6 — Her Life Timeline
  timelineTitle: "A Beautiful Life…",
  timelineSubtitle: "The journey that brought you to who you are today",
  timeline: [
    {
      id: "stage-1",
      stage: "👶 Little Her",
      subtitle: "The very first chapter",
      year: "The Beginning",
      photo: "/assets/photos/childhood-1.jpg",
      caption: "Tiny hands, big curious eyes, and a sweet innocent smile that would one day conquer the world.",
      tags: ["Pure Joy", "Innocence"]
    },
    {
      id: "stage-2",
      stage: "🌸 Growing Up",
      subtitle: "Finding her voice & dreams",
      year: "School & Adventures",
      photo: "/assets/photos/childhood-2.jpg",
      caption: "Learning, dreaming big, laughing carelessly, and collecting childhood memories under sunny skies.",
      tags: ["Adventures", "Bright Dreams"]
    },
    {
      id: "stage-3",
      stage: "✨ Becoming Her",
      subtitle: "Grace, strength & kindness",
      year: "Recent Years",
      photo: "/assets/photos/growing-up.jpg",
      caption: "Stepping into her own light—compassionate, strong, breathtakingly beautiful, and full of quiet courage.",
      tags: ["Elegance", "Radiance"]
    },
    {
      id: "stage-4",
      stage: "❤️ And Then… Me",
      subtitle: "The moment our universes collided",
      year: "Today & Forever",
      photo: "/assets/photos/her-now.jpg",
      caption: "And somehow, through all of time and space, your story intertwined with mine.",
      tags: ["Our Beginning", "Home"]
    }
  ],

  // 6. Scene 7 — Our Relationship Story
  storyTitle: "Our Story",
  storySubtitle: "And somehow… our paths crossed in this vast world.",
  memories: [
    {
      id: "mem-1",
      title: "First Conversation",
      category: "first-chat",
      date: "The Spark",
      photo: "/assets/photos/first-conversation.jpg",
      shortCaption: "Talking until 3 AM without realizing time existed.",
      fullStory: "We started talking about silly little things and suddenly it was 3:00 AM. In that instant, I knew you were someone rare."
    },
    {
      id: "mem-2",
      title: "First Meeting",
      category: "first-meeting",
      date: "The Day We Met",
      photo: "/assets/photos/first-meeting.jpg",
      shortCaption: "Seeing your smile in person for the very first time.",
      fullStory: "My heart raced. The moment you turned around and smiled, every single doubt vanished. The world felt quiet."
    },
    {
      id: "mem-3",
      title: "First Photo Together",
      category: "first-photo",
      date: "Captured Forever",
      photo: "/assets/photos/first-photo.jpg",
      shortCaption: "A little shy, but completely happy.",
      fullStory: "We didn't know yet how many memories were ahead of us, but this picture holds the beginning of everything."
    },
    {
      id: "mem-4",
      title: "Funniest Moment",
      category: "funniest",
      date: "Uncontrollable Laughter",
      photo: "/assets/photos/funniest-moment.jpg",
      shortCaption: "When we laughed until our stomachs hurt.",
      fullStory: "Neither of us could breathe from laughing so hard. Your genuine, unrestricted laugh is my favorite soundtrack."
    },
    {
      id: "mem-5",
      title: "Sweetest Moment",
      category: "sweetest",
      date: "Pure Comfort",
      photo: "/assets/photos/sweetest-moment.jpg",
      shortCaption: "Resting your head on my shoulder in peaceful silence.",
      fullStory: "No words needed. Just your hand holding mine, feeling completely at peace with the person I love most."
    },
    {
      id: "mem-6",
      title: "Unforgettable Memory",
      category: "unforgettable",
      date: "Starry Night",
      photo: "/assets/photos/unforgettable.jpg",
      shortCaption: "Looking at the stars and knowing I found my home.",
      fullStory: "Under a blanket of stars, I realized home wasn't a place anymore. Home was sitting right next to me."
    }
  ],

  // 7. Scene 8 — Memory Gallery
  galleryTitle: "Moments Suspended in Time",
  gallerySubtitle: "Every picture holds a thousand unspoken feelings.",
  gallery: [
    {
      id: "gal-1",
      title: "Golden Hour Glow",
      caption: "The sunlight was beautiful, but you outshined everything around you.",
      date: "Summer Afternoons",
      location: "By the Waterfront",
      src: "/assets/photos/gallery-1.jpg"
    },
    {
      id: "gal-2",
      title: "Spontaneous Adventures",
      caption: "Getting lost together will always be my favorite journey.",
      date: "Weekend Getaway",
      location: "Road Trip",
      src: "/assets/photos/gallery-2.jpg"
    },
    {
      id: "gal-3",
      title: "Unfiltered Happiness",
      caption: "The purest smile that instantly melts away any bad day.",
      date: "Coffee & Rain",
      location: "Our Favorite Corner",
      src: "/assets/photos/gallery-3.jpg"
    },
    {
      id: "gal-4",
      title: "Quiet Evenings",
      caption: "Just you, me, and conversations that could go on forever.",
      date: "Late Nights",
      location: "City Lights",
      src: "/assets/photos/gallery-4.jpg"
    },
    {
      id: "gal-5",
      title: "That Radiant Laugh",
      caption: "Caught in the middle of a joke only the two of us understand.",
      date: "Autumn Days",
      location: "Park Walk",
      src: "/assets/photos/gallery-5.jpg"
    },
    {
      id: "gal-6",
      title: "Favorite View",
      caption: "Out of everything in this world, looking at you is what I love most.",
      date: "Sunset View",
      location: "Overlook",
      src: "/assets/photos/gallery-6.jpg"
    }
  ],

  // 8. Scene 9 — Interactive Birthday Girl Quiz
  quizTitle: "The Birthday Girl Quiz 👑",
  quizSubtitle: "How well do you know yourself, Ilakkiya? (Spoiler: 100% iconic!)",
  quizQuestions: [
    {
      id: "q1",
      question: "What is Ilakkiya's real daily superpower? ✨",
      options: [
        { label: "Her radiant, room-brightening smile 🌟", reaction: "100% True! Your smile can instantly illuminate the darkest days. 🌟❤️" },
        { label: "Being effortlessly adorable & chaotic 😌", reaction: "Facts! The sweetest, most lovable kind of energy in the universe. 😌✨" }
      ]
    },
    {
      id: "q2",
      question: "What is the quickest way to make Ilakkiya happy? 🌸",
      options: [
        { label: "Delicious food & sweet treats 🍰", reaction: "Spot on! Good food and snacks are an instant happiness booster! 🍰😋" },
        { label: "Cozy vibes & endless pampering 🫂", reaction: "Aww yes! Soft comfort, peace, and feeling extra cherished. 🫂💖" }
      ]
    },
    {
      id: "q3",
      question: "What happens when Ilakkiya gets hungry? 👀",
      options: [
        { label: "Instant dramatic hangry mode! 😤", reaction: "Emergency! Feed her immediately for everyone's safety! 😂🍕" },
        { label: "Cute pouty complaints 🥺", reaction: "Even when hangry, it is impossible not to find you completely adorable! 🥺❤️" }
      ]
    },
    {
      id: "q4",
      question: "What is Ilakkiya's official birthday vibe today? 🎂",
      options: [
        { label: "Queen of the Universe 👑", reaction: "Crown on! Today and every day, you reign supreme with grace and beauty. 👑✨" },
        { label: "Living her happiest, best life 💃", reaction: "Dancing, glowing, and enjoying every magical second of your day! 💃🌟" }
      ]
    },
    {
      id: "q5",
      question: "How special is Ilakkiya on a scale of 1 to 10? 💖",
      options: [
        { label: "1000/10 — Off the charts 🚀", reaction: "Way beyond the scale! The universe broke the mold when you were born. 🚀❤️" },
        { label: "Infinite & irreplaceable ✨", reaction: "Absolute truth. One of a kind in the entire galaxy! ✨💖" }
      ]
    }
  ],
  quizPassedMessage: "Certified 100% Queen! The most special, beautiful, and wonderful birthday girl in the universe. 👑✨",

  // 9. Scene 10 — Birthday Letter
  letterEnvelopePrompt: "A special birthday letter written just for you…",
  letterTitle: "Birthday Wishes For Ilakkiya 💌",
  letter: {
    salutation: "To My Dearest Ilakkiya,",
    paragraphs: [
      "Happy Birthday to the most incredible, radiant soul I know. Today is all about celebrating you—the wonderful person you are, the dreams you chase, and the endless light you bring into the world.",
      "Watching you grow, laugh, and navigate life with so much grace, quiet strength, and genuine kindness inspires me every single day. You have this rare, beautiful gift of making everyone around you feel warm, valued, and happier just by being yourself.",
      "Being able to love you and stand by your side as you celebrate another year of your journey is the greatest blessing in my life. In a universe of billions, my heart is so deeply grateful that it found its home in you.",
      "I hope this new chapter showers you with boundless happiness, exciting new adventures, good health, and all the success that your hard work and pure heart deserve. May every wish you whispered over the candles come true in the most magical way.",
      "Never forget how truly extraordinary, capable, and loved you are—today on your birthday, and throughout every step of the year ahead."
    ],
    closing: "With all my love and heart,",
    signature: "Joe ❤️"
  },

  // 10. Scene 11 — Universe Finale
  universeFinaleQuote1: "Out of billions of people on this pale blue dot…",
  universeFinaleQuote2: "Somehow, through infinite coincidences, I found you.",
  universeFinaleClimax: "AND I'D CHOOSE YOU AGAIN. IN EVERY LIFETIME. ❤️",

  // 11. Scene 12 — Final Surprise
  surprisePrompt: "One last surprise… 🎁",
  bestPhoto: {
    src: "/assets/photos/best-photo.jpg",
    caption: "The one who holds my heart."
  },
  finalMessage: {
    heading: "HAPPY BIRTHDAY, MY LOVE ❤️",
    body1: "You are not just another year older…",
    body2: "You are another year more beautiful, more amazing, and more loved.",
    quote: "Thank you for existing, and thank you for being you."
  },

  // 12. Secret Easter Egg
  secretVideo: "/assets/videos/final-surprise.mp4",
  secretMessage: "You found the hidden secret star! 🌟 Behind all the code and design is a boy who is endlessly grateful to have you in his life. I love you more every single day. Happy Birthday! ❤️",

  // 13. Music
  favoriteSong: {
    title: "Golden Hour Melody",
    artist: "Ambient Piano & Stars",
    src: "/assets/music/birthday-song.mp3"
  }
};
