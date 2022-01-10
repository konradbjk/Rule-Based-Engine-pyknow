module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "kompas-orange": "#ea9f3c",
        "kompas-blue": "#2e4e7e",
        "kompas-light-blue": "#f0f4f7",
        "kompas-gray": "#d7c097"
      }

    },
  },
  plugins: [
    require("@tailwindcss/aspect-ratio"),
    require("@tailwindcss/forms"),
  ],
};
