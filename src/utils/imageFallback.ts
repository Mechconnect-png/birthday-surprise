/**
 * Image and Media Safe Fallback Helper
 * Ensures no broken image icons or media crashes ever happen.
 * Resolves base paths dynamically for production deployment.
 */

export const resolveAssetUrl = (path?: string): string => {
  if (!path) return '';
  if (path.startsWith('http://') || path.startsWith('https://') || path.startsWith('data:')) {
    return path;
  }
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  const baseUrl = import.meta.env.BASE_URL || '/';
  return baseUrl.endsWith('/') ? `${baseUrl}${cleanPath}` : `${baseUrl}/${cleanPath}`;
};

export const FALLBACK_IMAGES: Record<string, string> = {
  "childhood-1": "/assets/photos/childhood-1.jpg",
  "childhood-2": "/assets/photos/childhood-2.jpg",
  "growing-up": "/assets/photos/growing-up.jpg",
  "her-now": "/assets/photos/her-now.jpg",
  "and-then-me": "/assets/photos/her-now.jpg",
  "best-photo": "/assets/photos/best-photo.jpg",
  "little-her": "/assets/photos/childhood-1.jpg",
  "becoming-her": "/assets/photos/growing-up.jpg",
  "first-conversation": "/assets/photos/her-now.jpg",
  "first-meeting": "/assets/photos/her-now.jpg",
  "first-photo": "/assets/photos/her-now.jpg",
  "funniest-moment": "/assets/photos/her-now.jpg",
  "sweetest-moment": "/assets/photos/her-now.jpg",
  "unforgettable": "/assets/photos/her-now.jpg",
  "gallery-1": "/assets/photos/growing-up.jpg",
  "gallery-2": "/assets/photos/her-now.jpg",
  "gallery-3": "/assets/photos/childhood-2.jpg",
  "gallery-4": "/assets/photos/growing-up.jpg",
  "gallery-5": "/assets/photos/her-now.jpg",
  "gallery-6": "/assets/photos/best-photo.jpg",
  "default": "/assets/photos/her-now.jpg"
};

export const getSafeImageUrl = (src?: string, fallbackKey = "default"): string => {
  const rawPath = src || FALLBACK_IMAGES[fallbackKey] || FALLBACK_IMAGES["default"];
  return resolveAssetUrl(rawPath);
};

export const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>, fallbackKey = "default") => {
  const target = e.currentTarget;
  const fallbackRaw = FALLBACK_IMAGES[fallbackKey] || FALLBACK_IMAGES["default"];
  const fallbackResolved = resolveAssetUrl(fallbackRaw);
  if (target.src !== fallbackResolved) {
    target.src = fallbackResolved;
  }
};

