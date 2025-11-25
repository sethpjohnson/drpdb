import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        pepper: {
          burgundy: '#722F37',
          'burgundy-dark': '#5C0F1F',
          cream: '#FFFDD0',
          offwhite: '#FAF9F6',
          fizz: '#E8D4B8',
          dark: '#2D1F1F',
          brown: '#2D1B1B',
        },
      },
      fontFamily: {
        display: ['var(--font-display)', 'serif'],
        body: ['var(--font-body)', 'sans-serif'],
      },
      animation: {
        'orbit-slow': 'orbit 60s linear infinite',
        'orbit-medium': 'orbit 30s linear infinite',
        'orbit-fast': 'orbit 15s linear infinite',
        'comet': 'comet 15s ease-in-out infinite',
        'fizz': 'fizz 2s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 3s ease-in-out infinite',
      },
      keyframes: {
        orbit: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        comet: {
          '0%, 100%': { transform: 'translateX(0) translateY(0)' },
          '50%': { transform: 'translateX(100px) translateY(-50px)' },
        },
        fizz: {
          '0%, 100%': { opacity: '0.3', transform: 'translateY(0)' },
          '50%': { opacity: '1', transform: 'translateY(-10px)' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.7', transform: 'scale(1.05)' },
        },
      },
    },
  },
  plugins: [],
}

export default config
