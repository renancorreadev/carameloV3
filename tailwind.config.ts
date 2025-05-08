import type { Config } from "tailwindcss";

export default {
  darkMode: 'class', 
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Comic Neue"', 'cursive', 'sans-serif'], 
        'comic-neue': ['"Comic Neue"', 'cursive'],
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      screens: {
        'max-sm': {'max': '640px'},
        'max-md': {'max': '768px'},
        'max-lg': {'max': '1024px'},
        'max-xl': {'max': '1280px'},
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
      },
    },
  },
  plugins: [],
} satisfies Config;
