import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './hooks/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Dutch Luxury Minimalist — existing token names preserve all components.
        emerald: { DEFAULT: '#173D35', 50: '#F0F4F1', 100: '#DFE9E2', 200: '#BDD0C5', 300: '#9DB6A8', 400: '#729582', 500: '#497762', 600: '#305E4D', 700: '#173D35', 800: '#123129', 900: '#102922', 950: '#0B211B' },
        champagne: { DEFAULT: '#C5A77D', 50: '#FBF8F2', 100: '#F2EBDD', 200: '#E6D7BD', 300: '#D7BF9B', 400: '#C5A77D', 500: '#C5A77D', 600: '#85653D', 700: '#785C36', 800: '#5B452B' },
        sage: { DEFAULT: '#9DB6A8', 50: '#F1F4F0', 100: '#E7EDE5', 200: '#CDDACC', 300: '#9DB6A8', 400: '#7F9B87', 500: '#607E68', 600: '#496550', 700: '#374F3E' },
        ink: { DEFAULT: '#202623', 50: '#F2F3EF', 100: '#E5E7E1', 200: '#D0D6CE', 300: '#A2ADA3', 400: '#637168', 500: '#56645B', 600: '#3D4B42', 700: '#173D35', 800: '#123129', 900: '#202623', 950: '#0B211B' },
        canal: { DEFAULT: '#173D35', 50: '#F0F4F1', 100: '#DFE9E2', 200: '#BDD0C5', 300: '#9DB6A8', 400: '#729582', 500: '#497762', 600: '#305E4D', 700: '#173D35', 800: '#123129', 900: '#102922', 950: '#0B211B' },
        brick: { DEFAULT: '#C5A77D', 50: '#FBF8F2', 100: '#F2EBDD', 200: '#E6D7BD', 300: '#D7BF9B', 400: '#C5A77D', 500: '#C5A77D', 600: '#85653D', 700: '#785C36', 800: '#5B452B' },
        sand: { DEFAULT: '#F7F5F0', 50: '#FFFFFF', 100: '#F7F5F0', 200: '#ECE8DF', 300: '#D7D3C8', 400: '#B5B5A6' },
        status: { available: '#173D35', reserved: '#785C36', rented: '#56645B', draft: '#637168' },
      },
      fontFamily: {
        sans: ['var(--font-manrope)', 'Arial', 'sans-serif'],
        display: ['var(--font-cormorant)', 'Georgia', 'serif'],
      },
      fontSize: {
        'display-lg': ['3.5rem', { lineHeight: '1.05', letterSpacing: '-0.02em', fontWeight: '700' }],
        'display-md': ['2.5rem', { lineHeight: '1.1', letterSpacing: '-0.015em', fontWeight: '700' }],
        'display-sm': ['1.875rem', { lineHeight: '1.2', letterSpacing: '-0.01em', fontWeight: '700' }],
        eyebrow: ['0.75rem', { lineHeight: '1', letterSpacing: '0.14em', fontWeight: '600' }],
      },
      spacing: { '4.5': '1.125rem', '5.5': '1.375rem', '13': '3.25rem' },
      borderRadius: {
        xl: '0.75rem',
        '2xl': '1.125rem',
        '3xl': '1.5rem',
      },
      boxShadow: {
        soft: '0 2px 8px -2px rgba(23,61,53,0.05), 0 1px 2px -1px rgba(23,61,53,0.03)',
        card: '0 4px 16px -4px rgba(23,61,53,0.10), 0 2px 6px -2px rgba(23,61,53,0.03)',
        lifted: '0 20px 40px -12px rgba(23,61,53,0.16)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-700px 0' },
          '100%': { backgroundPosition: '700px 0' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'marquee-reverse': {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.6s cubic-bezier(0.16,1,0.3,1) both',
        'fade-in': 'fade-in 0.4s ease-out both',
        shimmer: 'shimmer 1.6s linear infinite',
        marquee: 'marquee 34s linear infinite',
        'marquee-reverse': 'marquee-reverse 34s linear infinite',
      },
      backgroundImage: {
        'canal-line':
          'linear-gradient(90deg, transparent, rgba(197,167,125,0.45) 20%, rgba(197,167,125,0.45) 80%, transparent)',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};

export default config;
