/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'media', // Activa el modo oscuro usando clases,
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        "bg-primary": 'var(--color-bg-primary)',
        "bg-secondary": 'var(--color-bg-secondary)',
        primary: 'var(--color-primary)',
        secondary: 'var(--color-secondary)',
        "btn-primary": 'var(--color-btn-primary)',
        "btn-secondary": 'var(--color-btn-secondary)',
      }
    },
  },
  plugins: [
        require('flowbite/plugin'),
        
    ],
}

