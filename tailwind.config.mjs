/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eef4ff', 100: '#d9e5ff', 200: '#bcd2ff', 300: '#8eb4ff',
          400: '#5990ff', 500: '#3366ff', 600: '#1a46f5', 700: '#1335e1',
          800: '#162db6', 900: '#182b8f', 950: '#111c57',
        },
        accent: {
          50: '#ecfdf3', 100: '#d1fae1', 200: '#a7f3c9', 300: '#6ee7a8',
          400: '#34d884', 500: '#10b968', 600: '#059652', 700: '#047844',
          800: '#065f38', 900: '#064e30', 950: '#022c1a',
        },
        surface: {
          50: '#f8fafc', 100: '#f1f5f9', 200: '#e2e8f0',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        '4xl': '2rem',
      },
      boxShadow: {
        'glow': '0 0 20px rgba(26, 70, 245, 0.15)',
        'glow-accent': '0 0 20px rgba(16, 185, 104, 0.15)',
        'card': '0 1px 3px rgba(0,0,0,0.04), 0 6px 16px rgba(0,0,0,0.04)',
        'card-hover': '0 4px 12px rgba(0,0,0,0.06), 0 12px 28px rgba(0,0,0,0.08)',
        'elevated': '0 8px 30px rgba(0,0,0,0.08), 0 0 1px rgba(0,0,0,0.1)',
      },
      animation: {
        'fade-up': 'fadeUp 0.6s ease-out forwards',
        'fade-in': 'fadeIn 0.5s ease-out forwards',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};
