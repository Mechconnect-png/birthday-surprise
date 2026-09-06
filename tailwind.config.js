/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        theme: {
          bg: '#08080D',
          surface: '#10101A',
          card: 'rgba(16, 16, 26, 0.65)',
          purple: '#A78BFA',
          rose: '#F9A8D4',
          gold: '#FBBF24',
          text: '#FFFFFF',
          muted: '#A1A1AA',
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', '"DM Serif Display"', 'Georgia', 'serif'],
        display: ['"Italiana"', '"Cormorant Garamond"', 'serif'],
        cormorant: ['"Cormorant Garamond"', 'serif'],
        sans: ['"Plus Jakarta Sans"', '"Manrope"', 'sans-serif'],
        handwriting: ['"Dancing Script"', 'cursive', 'serif']
      },
      boxShadow: {
        'glow-purple': '0 0 40px rgba(167, 139, 250, 0.35)',
        'glow-rose': '0 0 40px rgba(249, 168, 212, 0.35)',
        'glow-gold': '0 0 40px rgba(251, 191, 36, 0.35)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.5)'
      },
      animation: {
        'float-slow': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
        'pulse-subtle': 'pulseSubtle 2s ease-in-out infinite',
        'aurora': 'aurora 15s ease infinite alternate',
        'orbit': 'orbit 20s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-15px) rotate(2deg)' }
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.3', transform: 'scale(1)' },
          '50%': { opacity: '0.7', transform: 'scale(1.08)' }
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '0.6' },
          '50%': { opacity: '1' }
        },
        aurora: {
          '0%': { transform: 'translate(0%, 0%) rotate(0deg) scale(1)' },
          '50%': { transform: 'translate(10%, -5%) rotate(180deg) scale(1.1)' },
          '100%': { transform: 'translate(-5%, 5%) rotate(360deg) scale(1)' }
        },
        orbit: {
          '0%': { transform: 'rotate(0deg) translateX(120px) rotate(0deg)' },
          '100%': { transform: 'rotate(360deg) translateX(120px) rotate(-360deg)' }
        }
      }
    },
  },
  plugins: [],
}
