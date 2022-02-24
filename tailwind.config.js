module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        custom: {
          scrollbarlight: '#ffffff14',
        },
      },
    },
  },

  plugins: [require('./src/libs/scrollbar')],
}
