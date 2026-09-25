/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Paleta pieca opalanego drewnem: węgiel, popiół, żar.
        wegiel: "#0B0908",
        sadza: "#14100E",
        ziemia: "#241B16",
        zar: "#C8531B",
        zloto: "#D9A441",
        krem: "#F4EAD9",
        popiol: "#9A8B7A",
      },
      fontFamily: {
        display: ["Fraunces", "Georgia", "serif"],
        title: ["Cinzel", "Fraunces", "Georgia", "serif"],
        body: ["Jost", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        wide2: "0.16em",
        wide3: "0.3em",
      },
      maxWidth: { reading: "62ch" },
      transitionTimingFunction: {
        silk: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [],
};
