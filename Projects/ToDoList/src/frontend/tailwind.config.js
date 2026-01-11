import animate from "tailwindcss-animate";

export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  plugins: [animate],
  theme: {
    extend: {
       colors: {
        border: "hsl(var(--border))",
       },
      backgroundImage: {
        activeBg: "linear-gradient(180deg, #DFEFEA 0%, #A0DCC9 100%)",
      },
    },
  },
};
