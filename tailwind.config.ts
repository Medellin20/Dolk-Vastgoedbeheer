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
        // Dolk : émeraude, sauge, ivoire, charbon et champagne.
        emerald: { DEFAULT: '#064E3B', 50: '#F0F6F2', 100: '#DFEBE3', 200: '#BDCFBF', 300: '#A3B18A', 400: '#72947C', 500: '#3F775E', 600: '#176148', 700: '#064E3B', 800: '#053D2F', 900: '#043226', 950: '#02281F' },
        champagne: { DEFAULT: '#D4AF75', 50: '#FCF8F0', 100: '#F6ECD9', 200: '#EAD5B0', 300: '#DFC291', 400: '#D4AF75', 500: '#D4AF75', 600: '#B38A4B', 700: '#80602E', 800: '#5B4526' },
        sage: { DEFAULT: '#A3B18A', 50: '#F3F5EF', 100: '#E9EDE0', 200: '#CDD6BD', 300: '#A3B18A', 400: '#889B70', 500: '#64794F', 600: '#4E603E', 700: '#3D4C32' },
        ink: { DEFAULT: '#18181B', 50: '#F4F4F1', 100: '#E8E8E2', 200: '#D3D5CC', 300: '#A6ADA2', 400: '#707B71', 500: '#58645B', 600: '#3C4941', 700: '#064E3B', 800: '#053D2F', 900: '#18181B', 950: '#02281F' },
        canal: { DEFAULT: '#064E3B', 50: '#F0F5EC', 100: '#E3EBDD', 200: '#CBD7BC', 300: '#A3B18A', 400: '#7B956E', 500: '#507859', 600: '#176148', 700: '#064E3B', 800: '#053D2F', 900: '#043226', 950: '#02281F' },
        brick: { DEFAULT: '#D4AF75', 50: '#FCF8F0', 100: '#F6ECD9', 200: '#EAD5B0', 300: '#DFC291', 400: '#D4AF75', 500: '#D4AF75', 600: '#9A743D', 700: '#70532A', 800: '#5B4526' },
        sand: { DEFAULT: '#FAF9F6', 50: '#FFFFFF', 100: '#FAF9F6', 200: '#EFEDE5', 300: '#DADBCB', 400: '#BBC6AC' },
        status: { available: '#064E3B', reserved: '#80602E', rented: '#58645B', draft: '#707B71' },
      },
      fontFamily: {
        sans: ['"Avenir Next"', '"Segoe UI"', 'Arial', 'sans-serif'],
        display: ['"Iowan Old Style"', '"Palatino Linotype"', 'Georgia', 'serif'],
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
        soft: '0 2px 8px -2px rgba(6,78,59,0.05), 0 1px 2px -1px rgba(6,78,59,0.03)',
        card: '0 4px 16px -4px rgba(6,78,59,0.10), 0 2px 6px -2px rgba(6,78,59,0.03)',
        lifted: '0 20px 40px -12px rgba(6,78,59,0.16)',
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
          'linear-gradient(90deg, transparent, rgba(212,175,117,0.45) 20%, rgba(212,175,117,0.45) 80%, transparent)',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};

export default config;
