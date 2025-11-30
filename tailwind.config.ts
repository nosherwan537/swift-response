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
        primary: "#008C5A", // Deep Green
        accent: "#FFD700",  // Gold/Yellow
        secondary: "#F8F9FA", // Light Gray (Background)
        dark: "#333333",    // Dark Gray (Text)
        medium: "#555555",  // Medium Gray (Secondary Text)
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        sans: ['var(--font-inter)'],
      },
    },
  },
  plugins: [],
};
export default config;
