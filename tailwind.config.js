/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        day: "url('/public/assets/images/day.jpg')",
        night: "url('/public/assets/images/night.jpg')",
      },
    },
  },
  plugins: [],
};
