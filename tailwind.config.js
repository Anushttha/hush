/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#A5ACE1', // Example primary color
        secondary: '#ffed4a',
        midnight: '#191A22',
        subtle:'#22232E',
        light: "#fbfbfb",
        
        // Example secondary color
        // You can add more custom colors here
      },
      fontFamily: {
        'neue': ['"Helvetica Neue LT Pro"', 'sans-serif']
      },
    },
  },
  plugins: [],
  darkMode: "class",
};
