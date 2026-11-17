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
        // Vastgoed Beheer B.V. : bleu clair, blanc et gris.
        emerald: { DEFAULT: '#245B88', 50: '#F0F5F9', 100: '#DFE9F1', 200: '#BDD0DF', 300: '#AFC9DC', 400: '#789BB3', 500: '#48738F', 600: '#326FA5', 700: '#245B88', 800: '#1D4B72', 900: '#263746', 950: '#202D38' },
        champagne: { DEFAULT: '#B9DFFC', 50: '#F4FAFF', 100: '#E7F4FF', 200: '#D5ECFD', 300: '#C9E6FC', 400: '#B9DFFC', 500: '#B9DFFC', 600: '#3778AB', 700: '#355F80', 800: '#294A64' },
        sage: { DEFAULT: '#AFC9DC', 50: '#F5F8FA', 100: '#EAF0F5', 200: '#CDDBE5', 300: '#AFC9DC', 400: '#87A6BB', 500: '#5A7E97', 600: '#44647C', 700: '#344F64' },
        ink: { DEFAULT: '#303A43', 50: '#F3F6F8', 100: '#E5EBEF', 200: '#CDD8E0', 300: '#9DAFBD', 400: '#6A8092', 500: '#596773', 600: '#45535F', 700: '#245B88', 800: '#1D4B72', 900: '#303A43', 950: '#202D38' },
        canal: { DEFAULT: '#245B88', 50: '#F0F5F9', 100: '#E5F3FE', 200: '#CADAE6', 300: '#AFC9DC', 400: '#7C9CB2', 500: '#527B96', 600: '#326FA5', 700: '#245B88', 800: '#1D4B72', 900: '#263746', 950: '#202D38' },
        brick: { DEFAULT: '#B9DFFC', 50: '#F4FAFF', 100: '#E7F4FF', 200: '#D5ECFD', 300: '#C9E6FC', 400: '#B9DFFC', 500: '#B9DFFC', 600: '#3B739D', 700: '#315D7D', 800: '#294A64' },
        sand: { DEFAULT: '#FFFFFF', 50: '#FFFFFF', 100: '#FFFFFF', 200: '#E8EEF3', 300: '#D4DFE8', 400: '#B2C5D3' },
        status: { available: '#245B88', reserved: '#355F80', rented: '#596773', draft: '#6A8092' },
      },
      fontFamily: {
        sans: ['"Avenir Next"', '"Segoe UI"', 'Arial', 'sans-serif'],
        display: ['"Avenir Next"', '"Segoe UI"', 'Arial', 'sans-serif'],
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
        soft: '0 2px 8px -2px rgba(36,91,136,0.05), 0 1px 2px -1px rgba(36,91,136,0.03)',
        card: '0 4px 16px -4px rgba(36,91,136,0.10), 0 2px 6px -2px rgba(36,91,136,0.03)',
        lifted: '0 20px 40px -12px rgba(36,91,136,0.16)',
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
          'linear-gradient(90deg, transparent, rgba(185,223,252,0.45) 20%, rgba(185,223,252,0.45) 80%, transparent)',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};

export default config;
