/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      container: {
        center: true,
      },
      backgroundImage: {
        "test-linear":
          "url('https://i.pinimg.com/736x/cc/16/a8/cc16a8abaa587004453323fc624a1264.jpg')",
      },
    },
  },
  plugins: [],
};
