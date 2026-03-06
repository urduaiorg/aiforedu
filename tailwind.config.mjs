/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          50: '#f6f7fb',
          100: '#ebeef5',
          200: '#d9dfeb',
          300: '#b7c0d2',
          400: '#8895ad',
          500: '#617089',
          600: '#44516a',
          700: '#313b4e',
          800: '#202838',
          900: '#151b29',
          950: '#0d1320',
        },
        paper: {
          50: '#fbf8f2',
          100: '#f5efe4',
          200: '#e8ddca',
          300: '#d5c2a4',
        },
        brand: {
          DEFAULT: '#3155d6',
          50: '#eef2ff',
          100: '#dfe6ff',
          200: '#c7d1ff',
          300: '#a3b3ff',
          400: '#7b90ff',
          500: '#5670f6',
          600: '#3155d6',
          700: '#2643aa',
          800: '#213885',
          900: '#1e3269',
        },
        sage: {
          50: '#eef6f1',
          100: '#dbeee1',
          200: '#badcc7',
          600: '#46745c',
          700: '#375a49',
        },
        gold: {
          50: '#fbf6e9',
          100: '#f4ebc8',
          200: '#ebd996',
          600: '#9b7417',
          700: '#7a5b14',
        },
        surface: {
          50: '#f8f5ef',
          100: '#f1ece3',
          200: '#e2dbcf',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Fraunces', 'Georgia', 'serif'],
      },
      fontSize: {
        hero: ['5.25rem', { lineHeight: '0.93', letterSpacing: '-0.055em', fontWeight: '600' }],
        display: ['4rem', { lineHeight: '0.98', letterSpacing: '-0.045em', fontWeight: '600' }],
        'display-sm': ['2.75rem', { lineHeight: '1.03', letterSpacing: '-0.04em', fontWeight: '600' }],
        'display-xs': ['2rem', { lineHeight: '1.08', letterSpacing: '-0.03em', fontWeight: '600' }],
      },
      boxShadow: {
        panel: '0 1px 2px rgba(13,19,32,0.05), 0 12px 40px rgba(13,19,32,0.08)',
        'panel-lg': '0 20px 70px rgba(13,19,32,0.14)',
        'panel-hover': '0 20px 50px rgba(13,19,32,0.12)',
        rule: 'inset 0 1px 0 rgba(255,255,255,0.3)',
      },
      animation: {
        'fade-up': 'fadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};
