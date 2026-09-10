/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      'xs': '360px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
    extend: {
      colors: {
        ivory: {
          DEFAULT: '#FDFBF7',
          100: '#F5F2EA',
          200: '#EAE5D9',
          warm: '#F7F2E8',
        },
        champagne: {
          DEFAULT: '#C9A84C',
          light: '#E8D49A',
          dark: '#9A7A30',
          pale: '#F5EDD3',
        },
        navy: {
          DEFAULT: '#1B263B',
          dark: '#0D1B2A',
        },
        charcoal: {
          DEFAULT: '#2C2C2C',
          light: '#5A5A5A',
        },
        'warm-beige': '#C9B99A',
      },
      fontFamily: {
        'serif-display': ['"Cormorant Garamond"', 'serif'],
        sans: ['"Inter"', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      animation: {
        'spin-slow': 'spin 8s linear infinite',
        'pulse-slow': 'pulse 4s ease-in-out infinite',
      },
      keyframes: {
        spin: {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' },
        },
      },
    },
  },
  plugins: [],
}
