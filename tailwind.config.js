/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#000613',
        'primary-container': '#001f3f',
        'on-primary': '#ffffff',
        secondary: '#bb0024',
        'secondary-container': '#e22337',
        accent: '#e22337',
        tertiary: '#040607',
        dark: '#1c1b1b',
        'on-surface': '#1c1b1b',
        'on-surface-variant': '#43474e',
        light: '#f6f3f2',
        surface: '#fcf9f8',
        'surface-container-lowest': '#ffffff',
        'surface-container-low': '#f6f3f2',
        'surface-container': '#f0eded',
        'surface-container-high': '#eae7e7',
        'surface-container-highest': '#e5e2e1',
        outline: '#74777f',
        'outline-variant': '#c4c6cf',
      },
      fontFamily: {
        sans: ['Montserrat', 'system-ui', 'sans-serif'],
        heading: ['Montserrat', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
