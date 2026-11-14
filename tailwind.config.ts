import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens: {
      xs: '360px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1200px',
      '2xl': '1440px',
    },
    extend: {
      colors: {
        // Sapphire Blue & Navy Design System
        navy: {
          DEFAULT: '#102A56',
          dark: '#0A1C38',
          light: '#1B3D73',
          muted: '#2A4365',
        },
        sapphire: {
          DEFAULT: '#1455B8',
          hover: '#0E4496',
          active: '#0B3678',
          light: '#EAF2FF',
        },
        blue: {
          bright: '#2563EB',
          light: '#EAF2FF',
          surface: '#F0F6FF',
        },
        ivory: {
          DEFAULT: '#FAFBFD',
          dark: '#F1F4F9',
        },
        canvas: {
          DEFAULT: '#FAFBFD',
          surface: '#FFFFFF',
          card: '#FFFFFF',
          raised: '#FFFFFF',
          overlay: '#F8FAFC',
          highlight: '#EAF2FF',
        },
        ink: {
          primary: '#172033',
          navy: '#102A56',
          secondary: '#64748B',
          muted: '#64748B',
          faint: '#94A3B8',
          white: '#FFFFFF',
        },
        border: {
          DEFAULT: '#E2E8F0',
          subtle: '#EDF2F7',
          strong: '#CBD5E1',
          blue: '#BFDBFE',
        },
        teal: {
          DEFAULT: '#0F8B70',
          light: '#E6F6F2',
          border: '#A7E3D4',
        },
        amber: {
          DEFAULT: '#F4B740',
          light: '#FEF8EB',
          border: '#FDE4B0',
        },
        purple: {
          DEFAULT: '#7864C8',
          light: '#F3F0FB',
          border: '#D9D1F2',
        },
        tier: {
          safe: '#0F8B70',
          realistic: '#2563EB',
          ambitious: '#F4B740',
        },
      },
      fontFamily: {
        heading: ['var(--font-jakarta)', 'Plus Jakarta Sans', 'system-ui', 'sans-serif'],
        sans: ['var(--font-inter)', 'Inter', 'system-ui', 'sans-serif'],
        serif: ['var(--font-jakarta)', 'Plus Jakarta Sans', 'serif'],
        mono: ['var(--font-mono)', 'JetBrains Mono', 'monospace'],
      },
      borderRadius: {
        sm: '6px',
        md: '8px',
        lg: '10px',
        xl: '14px',
        '2xl': '16px',
        '3xl': '24px',
      },
      boxShadow: {
        card: '0 1px 3px 0 rgba(0, 0, 0, 0.05), 0 1px 2px -1px rgba(0, 0, 0, 0.05)',
        'card-hover': '0 8px 24px -4px rgba(16, 42, 86, 0.08), 0 2px 6px -2px rgba(16, 42, 86, 0.04)',
        predictor: '0 16px 36px -8px rgba(20, 85, 184, 0.12), 0 4px 12px -2px rgba(16, 42, 86, 0.06)',
        dropdown: '0 10px 25px -5px rgba(16, 42, 86, 0.1), 0 8px 10px -6px rgba(16, 42, 86, 0.05)',
      },
    },
  },
  plugins: [],
};

export default config;
