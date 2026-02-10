import type { Config } from "tailwindcss";
import colors from "tailwindcss/colors";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          normal: "#FF6000",
          "normal-hover": "#E05600",
          secondary: "#FFF3EB",
          "secondary-hover": "#FFD0B2",
        },
        normal: "#262626",
        strong: "#1E1E1E",
        alternative: "#A3A3A3",
        assistive: "#D4D4D4",
        disabled: "#DDDDDD",
        status: {
          positive: "#22C55E",
          negative: "#EF4444",
          accent: "#FF6000",
        },
      },
      backgroundColor: {
        ...colors,
        gray: {
          ...colors.neutral,
          450: "#222222",
          650: "#3F3F46",
        },
        white: colors.white,
        normal: "#FFFFFF",
        alternative: "#FAFAFA",
        strong: "#f1f1f1",
        disabled: "#F4F4F5",
        inverse: "#1E1E1E",
        primary: {
          normal: "#FF6000",
          "normal-hover": "#E05600",
          secondary: "#FFF3EB",
          "secondary-hover": "#FFD0B2",
        },
        status: {
          positive: "#22C55E",
          negative: "#EF4444",
          accent: "#FF6000",
        },
        accent: {
          red: "#FF6352",
          blue: "#4B8BFA",
          skyblue: "#46AFFA",
          green: "#357535",
          mint: "#26998A",
          violet: "#6954EB",
          purple: "#C44FEB",
          yellow: "#FFE066",
        },
      },
    },
  },
  plugins: [],
};

export default config;
