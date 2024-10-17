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
        "primary-1": "#E6F7FF",
        "primary-2": "#BAE7FF",
        "primary-3": "#91D5FF",
        "primary-4": "#69C0FF",
        "primary-5": "#40A9FF",
        "primary-6": "#1890FF",
        "primary-7": "#096DD9",
        "primary-8": "#0050B3",
        "primary-9": "#003A8C",
        "primary-10": "#002766",
        "neutral-1": "#FFFFFF",
        "neutral-2": "#FAFAFA",
        "neutral-3": "#F5F5F5",
        "neutral-4": "#F0F0F0",
        "neutral-5": "#D9D9D9",
        "neutral-6": "#BFBFBF",
        "neutral-7": "#8C8C8C",
        "neutral-8": "#595959",
        "neutral-9": "#434343",
        "neutral-10": "#262626",
        "neutral-11": "#1F1F1F",
        "neutral-12": "#141414",
        "neutral-13": "#000000",
      },
      fontFamily: {
        roboto: ["Roboto", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
