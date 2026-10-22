import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        term: {
          bg: "#0a0b0d",
          panel: "#111317",
          raised: "#171a1f",
          line: "#262a31",
          text: "#d7dae0",
          dim: "#8a909b",
          faint: "#5b616b",
          red: "#ff3b4e",
          redDim: "#b3283a",
          green: "#4ade80",
          amber: "#fbbf24",
          cyan: "#67e8f9",
        },
      },
      fontFamily: {
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
        display: ["var(--font-display)", "var(--font-mono)", "sans-serif"],
      },
      keyframes: {
        blink: { "0%,49%": { opacity: "1" }, "50%,100%": { opacity: "0" } },
        scan: { "0%": { transform: "translateY(-100%)" }, "100%": { transform: "translateY(100%)" } },
      },
      animation: {
        blink: "blink 1s step-end infinite",
        scan: "scan 6s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
