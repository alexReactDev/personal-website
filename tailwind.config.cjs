/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        react: "#22c3e6",
        darkreact: "#15b1d4",
        faintviolet: "#8285a9",
        darkviolet: "#585b7a",
        darkgrey: "#16181d",
        grey: "#20232a",
        lightgrey: "#999999"
      },
      fontFamily: {
        default: ['var(--font-default'],
        accent: ['var(--font-accent)']
      },
      spacing: {
        sl: "1px"
      },
      screens: {
        "2xm": "375px",
        xm: "450px",
        "horizontal-sm": {'raw': '(min-height: 350px)'},
      }
    },
  },
  plugins: [],
}
