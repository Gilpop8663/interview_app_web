/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Noto Sans KR", "Inter", "Cafe24Ohsquareair", "sans-serif"], // 기본 sans-serif를 변경
      },
    },
  },

  plugins: [],
};
