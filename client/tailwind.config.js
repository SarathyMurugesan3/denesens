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
          300: '#F5D67A', // Champagne highlight
          400: '#E5C158',
          500: '#D4AF37', // Metallic Gold Base
          600: '#B8860B', // Dark Gold Accent
          700: '#8C6605',
        },
        dark: {
          950: '#000000',
          900: '#0A0A0A',
          850: '#121212',
          800: '#1A1A1A',
          700: '#262626',
        }
      },
      fontFamily: {
        heading: ['Outfit', 'Poppins', 'Sora', 'sans-serif'],
        body: ['Inter', 'Work Sans', 'sans-serif'],
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #F5D67A 0%, #D4AF37 50%, #B8860B 100%)',
        'gold-gradient-hover': 'linear-gradient(135deg, #FFFFFF 0%, #F5D67A 50%, #D4AF37 100%)',
        'dark-glass': 'linear-gradient(180deg, rgba(18, 18, 18, 0.8) 0%, rgba(10, 10, 10, 0.95) 100%)',
        'card-glow': 'radial-gradient(circle at top right, rgba(212, 175, 55, 0.12) 0%, transparent 60%)',
      },
      boxShadow: {
        'gold-glow': '0 0 25px rgba(212, 175, 55, 0.25)',
        'gold-glow-lg': '0 0 40px rgba(212, 175, 55, 0.4)',
        'gold-border': '0 0 10px rgba(212, 175, 55, 0.15)',
      },
      animation: {
        'shimmer': 'shimmer 3s infinite linear',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
}
