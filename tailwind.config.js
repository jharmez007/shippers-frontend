/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      width: {
        half: 'calc(50% - 60px)', // Use the calc function directly as a string
      },
      colors: {
        primary: '#58A986',
        secondary: {
        DEFAULT: '#004B87', // Deep Sea Blue
        light: '#D1E6F7',
        dark: '#002E53',
      },
      },
      fontFamily: {
       sans: ['Inter', 'ui-sans-serif', 'system-ui'],
      },
      animation: {
        'fade-in': 'fadeIn 0.4s ease-in-out'
      },
      keyframes: {
      fadeIn: {
        '0%': { opacity: 0, transform: 'translateY(10px)' },
        '100%': { opacity: 1, transform: 'translateY(0)' },
      },
    },
      customScrollbar: {
        '::-webkit-scrollbar': {
          width: '8px',
          height: '8px',
        },
        '::-webkit-scrollbar-thumb': {
          backgroundColor: '#A0AEC0',
          borderRadius: '4px',
        },
        '::-webkit-scrollbar-track': {
          backgroundColor: '#EDF2F7',
        },
      },
    },
  },
  plugins: [],
};
