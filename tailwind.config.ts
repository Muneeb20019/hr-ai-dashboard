import type { Config } from "tailwindcss";
import colors from "tailwindcss/colors";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@tremor/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // tremor variables
        tremor: {
          brand: {
            faint: colors.blue[50],
            muted: colors.blue[200],
            subtle: colors.blue[400],
            default: colors.blue[500],
            emphasis: colors.blue[700],
            inverted: colors.white,
          },
          background: {
            muted: "#111827",
            subtle: "#1f2937",
            default: "#020617",
            emphasis: "#d1d5db",
          },
          border: {
            default: "#1f2937",
          },
          ring: {
            default: "#1f2937",
          },
          content: {
            subtle: "#9ca3af",
            default: "#6b7280",
            emphasis: "#e5e7eb",
            strong: "#f9fafb",
            inverted: "#000000",
          },
        },
      },
    },
  },
  plugins: [],
};
export default config;