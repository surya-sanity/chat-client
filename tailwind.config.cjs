/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: "#140F26",
        secondary: "#F5F7FB",
        sentBgColor: "#1C98F7"
      }
    },
  },
  plugins: [
    require('tailwind-scrollbar'),

  ],
  variants: {
    scrollbar: ['rounded']
  }
}
