/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          100: '#FFF9E6',
          200: '#FFE899',
          300: '#FFD700', // Electric Metallic Gold
          400: '#F5C518', // Bright Amber Gold
          500: '#E5A900', // Rich Gold Base
          600: '#C48A00', // Deep Gold Accent
          700: '#996B00',
        },
        cyan: {
          400: '#00F2FE',
          500: '#4FACFE',
        },
        dark: {
          950: '#05070A',
          900: '#0A0E17',
          850: '#111827',
          800: '#1F2937',
          700: '#374151',
        }
      },
      fontFamily: {
        heading: ['Outfit', 'Poppins', 'Sora', 'sans-serif'],
        body: ['Inter', 'Work Sans', 'sans-serif'],
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #FFE899 0%, #FFD700 40%, #E5A900 100%)',
        'gold-gradient-hover': 'linear-gradient(135deg, #FFFFFF 0%, #FFE899 50%, #FFD700 100%)',
        'dark-glass': 'linear-gradient(180deg, rgba(17, 24, 39, 0.85) 0%, rgba(10, 14, 23, 0.95) 100%)',
        'card-glow': 'radial-gradient(circle at top right, rgba(255, 215, 0, 0.25) 0%, transparent 70%)',
      },
      boxShadow: {
        'gold-glow': '0 0 25px rgba(255, 215, 0, 0.35)',
        'gold-glow-lg': '0 0 45px rgba(255, 215, 0, 0.55)',
        'gold-border': '0 0 12px rgba(255, 215, 0, 0.25)',
      },
      animation: {
        'shimmer': 'shimmer 3s infinite linear',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        }
      }
    },
  },
  plugins: [],
}
