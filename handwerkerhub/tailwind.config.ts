import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#DC143C",
          50: "#FFF0F3",
          100: "#FFD6DD",
          500: "#DC143C",
          600: "#B8102F",
          700: "#8F0C24",
        },
      },
    },
  },
  plugins: [],
};

export default config;
