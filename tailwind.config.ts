import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        obsidian: {
          green: '#1a3a2e',
        },
      },
      fontFamily: {
        geist: ['var(--font-geist-sans)', '-apple-system', 'BlinkMacSystemFont', 'system-ui', 'sans-serif'],
        montreal: ['-apple-system', 'BlinkMacSystemFont', 'system-ui', 'sans-serif'],
        'google-sans': ['var(--font-google-sans)', 'Inter', '-apple-system', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        tighter: '-0.05em',
        wide: '0.05em',
      },
    },
  },
  plugins: [],
} satisfies Config;
