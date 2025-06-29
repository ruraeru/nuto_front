import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html",
    "./components/**/*.jsx",
  ],
  theme: {
    extend: {
      colors: {
        "custom-color": "#1f1f1f",
      },
    },
  },
  plugins: [],
};

export default config;
