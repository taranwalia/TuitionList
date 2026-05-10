import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          50: "#eef5ff",
          100: "#d9eaff",
          600: "#175cd3",
          700: "#124cb0",
          800: "#123a73",
          900: "#0b2545"
        },
        leaf: {
          50: "#ecfdf3",
          100: "#d1fadf",
          600: "#039855",
          700: "#027a48"
        },
        gold: {
          50: "#fff7e6",
          100: "#ffedbf",
          500: "#f59e0b",
          700: "#b45309"
        },
        sky: {
          50: "#eef9ff",
          100: "#d9f1ff",
          600: "#0284c7"
        }
      },
      boxShadow: {
        soft: "0 12px 30px rgba(11, 37, 69, 0.08)",
        lift: "0 22px 60px rgba(11, 37, 69, 0.13)"
      }
    }
  },
  plugins: []
};

export default config;
