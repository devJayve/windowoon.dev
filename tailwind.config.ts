import type { Config } from 'tailwindcss';

const config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        border: 'var(--border)', // HEX 형식으로 정의된 CSS 변수를 사용
        input: 'var(--input)',
        ring: 'var(--ring)',
        primary: {
          light: 'var(--primary-light)', // 기본 텍스트 색상 (라이트 모드)
          dark: 'var(--primary-dark)', // 기본 텍스트 색상 (다크 모드)
        },
        background: {
          light: 'var(--background-light)', // 라이트 모드 배경 색상
          dark: 'var(--background-dark)', // 다크 모드 배경 색상
        },
      },
    },
    animation: {
      'accordion-down': 'accordion-down 0.2s ease-out',
      'accordion-up': 'accordion-up 0.2s ease-out',
    },
    fontFamily: {
      nanum: ['var(--font-nanum-gothic)'],
    },
  },
  variants: {
    extend: {
      backgroundColor: ['dark'],
      textColor: ['dark'],
      borderColor: ['dark'],
    },
  },
  plugins: [
    require('tailwindcss-animate'),
    require('@tailwindcss/typography'),
    require('./lib/tailwind/radialGradient'),
  ],
} satisfies Config;

export default config;
