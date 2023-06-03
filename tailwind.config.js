/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      gridTemplateRows: {
        // main layout grid rows (header, main, footer)
        // see app/layout.tsx
        layout: "6rem minmax(calc(100vh - 16rem), 1fr) 10rem",
      },
      gridTemplateColumns: {
        // main layout grid columns (left column, main, right column)
        // see app/layout.tsx
        layout: "1fr minmax(640px, 800px) 1fr",
      },
      animation: {
        // border animation used in components/post-card.tsx
        border: "show-border 0.5s ease-in-out forwards",
        "border-fast": "show-border 0.25s ease-in-out forwards",
        // wave animation used in components/hero-section.tsx
        wave: "wave 2.5s ease-in-out forwards",
      },
      keyframes: {
        "show-border": {
          "0%": {
            zIndex: 0,
            width: "1rem",
            height: "calc(100% - 0.25rem)",
            borderRadius: "0.4rem 0 0 0.4rem",
          },
          "20%": {
            zIndex: 0,
            width: 0,
            height: "105%",

            borderRadius: "0.4rem 0 0 0.4rem",
          },
          "100%": {
            zIndex: 0,
            width: "101%",
            height: "105%",
            borderRadius: "0.4rem 0.4rem 0.4rem 0.4rem",
          },
        },
        wave: {
          "0%": { transform: "rotate(0.0deg)" },
          "10%": { transform: "rotate(-10.0deg)" },
          "20%": { transform: "rotate( 12.0deg)" },
          "30%": { transform: "rotate(-10.0deg)" },
          "40%": { transform: "rotate(9.0deg)" },
          "50%": { transform: "rotate(0.0deg)" },
          "100%": { transform: "rotate(0.0deg)" },
        },
      },
    },
  },
  plugins: [],
};
