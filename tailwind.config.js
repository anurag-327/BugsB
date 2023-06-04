/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
    },
    screens: {
      'sm': {'min': '0px', 'max': '830px'},
      'md': {'min': '831px', 'max': '1023px'},
      'lg': {'min': '1024px', 'max': '1500px'},
      'xl': {'min': '1500px', 'max': '2000px'},
      '2xl': {'min': '1536px'},
    },
  },
  plugins: [],
}
