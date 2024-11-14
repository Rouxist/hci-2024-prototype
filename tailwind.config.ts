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
        background: "var(--background)",
        foreground: "var(--foreground)",
        "color-silgam": "#283593",
        "color-language": "#55B99E",
        "color-mathematics": "#E05FA9",
        "color-investigation": "#7B4DB9",
      },
      animation: {
        "pulse-fast": "pulse 1s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      boxShadow: {
        "color-silgam": "0 1px 4px rgba(40, 53, 147, 0.75)",
      },
    },
  },
  plugins: [],
};
export default config;