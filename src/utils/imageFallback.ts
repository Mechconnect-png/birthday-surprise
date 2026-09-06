/**
 * Image and Media Safe Fallback Helper
 * Ensures no broken image icons or media crashes ever happen.
 */

export const FALLBACK_IMAGES: Record<string, string> = {
  "childhood-1": "https://images.unsplash.com/photo-1543332164-6e82f355badc?auto=format&fit=crop&w=800&q=80",
  "childhood-2": "https://images.unsplash.com/photo-1485546246426-74dc88dec4d9?auto=format&fit=crop&w=800&q=80",
  "growing-up": "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80",
  "her-now": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80",
  "first-conversation": "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=800&q=80",
  "first-meeting": "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=800&q=80",
  "first-photo": "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=800&q=80",
  "funniest-moment": "https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=800&q=80",
  "sweetest-moment": "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=800&q=80",
  "unforgettable": "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=800&q=80",
  "gallery-1": "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1000&q=80",
  "gallery-2": "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1000&q=80",
  "gallery-3": "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=1000&q=80",
  "gallery-4": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1000&q=80",
  "gallery-5": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1000&q=80",
  "gallery-6": "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=1000&q=80",
  "best-photo": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=85",
  "default": "https://images.unsplash.com/photo-1518895949257-7621c3c786d7?auto=format&fit=crop&w=1000&q=80"
};

export const getSafeImageUrl = (src?: string, fallbackKey = "default"): string => {
  if (!src) return FALLBACK_IMAGES[fallbackKey] || FALLBACK_IMAGES["default"];
  return src;
};

export const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>, fallbackKey = "default") => {
  const target = e.currentTarget;
  const fallback = FALLBACK_IMAGES[fallbackKey] || FALLBACK_IMAGES["default"];
  if (target.src !== fallback) {
    target.src = fallback;
  }
};
