import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      keyframes: {
        dropdown: {
          "0%": { scale: "0", opacity: "0" },
          "100%": { scale: "1", opacity: "1" },
        },
      },
      animation: {
        dropdown: "dropdown 500ms ease-out forwards",
      },
    },
  },
  plugins: [],
} satisfies Config;
