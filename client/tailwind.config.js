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
          100: '#FFFDF5',
          200: '#FDF6D8',
          300: '#F5E396',
          400: '#D4AF37', // Luxury Metallic Gold
          500: '#C59B27', // Rich Gold Base
          600: '#B8860B', // Deep Gold Accent
          700: '#8C6605',
          800: '#664A04',
        },
        light: {
          50: '#FFFFFF',
          100: '#F8FAFC',
          200: '#F1F5F9',
          300: '#E2E8F0',
          400: '#CBD5E1',
        },
        slate: {
          900: '#0F172A',
          800: '#1E293B',
          700: '#334155',
          600: '#475569',
          500: '#64748B',
        }
      },
      fontFamily: {
        heading: ['Outfit', 'Poppins', 'Sora', 'sans-serif'],
        body: ['Inter', 'Work Sans', 'sans-serif'],
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #FDF6D8 0%, #D4AF37 50%, #B8860B 100%)',
        'gold-gradient-hover': 'linear-gradient(135deg, #FFFFFF 0%, #FDF6D8 50%, #D4AF37 100%)',
        'white-glass': 'linear-gradient(180deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 250, 252, 0.98) 100%)',
        'card-light': 'linear-gradient(180deg, #FFFFFF 0%, #F8FAFC 100%)',
      },
      boxShadow: {
        'card': '0 4px 20px -2px rgba(15, 23, 42, 0.05)',
        'luxury': '0 10px 30px -4px rgba(15, 23, 42, 0.08)',
        'modal': '0 20px 50px -10px rgba(15, 23, 42, 0.15)',
        'gold-border': '0 0 0 1px rgba(212, 175, 55, 0.3)',
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
