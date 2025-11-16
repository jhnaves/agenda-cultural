import type { Config } from 'tailwindcss'

export default {
  darkMode: 'class',
  content: [
    './src/**/*.{astro,html,js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
    './pages/**/*.{js,jsx,ts,tsx}',
    './index.html'
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif']
      },
      colors: {
        'brand-primary': '#8A2BE2',
        'brand-secondary': '#4B0082',
        'brand-accent': '#FFD700',
        'neutral-light': '#F3F4F6',
        'neutral-medium': '#9CA3AF',
        'neutral-dark': '#1F2937',
        'neutral-darkest': '#111827'
      }
    }
  }
} satisfies Config