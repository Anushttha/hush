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
        'neue': ['"Neue Plak Wide"', 'sans-serif'],
        'neue-bold': ['"Neue Plak Wide Bold"', 'sans-serif'],
        'neue-extra': ['"Neue Plak Wide Extra"', 'sans-serif'],
        'neue-semi': ['"Neue Plak Wide Semi"', 'sans-serif'],
        'neue-light': ['"Neue Plak Wide Light"', 'sans-serif'],
        'neue-ultra': ['"Neue Plak Wide Ultra"', 'sans-serif'],
        'neue-thin': ['"Neue Plak Wide Thin"', 'sans-serif'],
        'neue-black': ['"Neue Plak Wide Black"', 'sans-serif'],
      },
    },
  },
  plugins: [],
  darkMode: "class",
};
