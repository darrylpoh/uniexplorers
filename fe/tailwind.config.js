/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html', 
    './src/**/*.{vue,js,ts,jsx,tsx}',
    'node_modules/flowbite-vue/**/*.{js,jsx,ts,tsx}',
    'node_modules/flowbite/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    colors: {
      darkgreen: '#1E363E',
      lightgreen: '#DAE3DD',
      grey: '#3f3f46',
      lightgrey: '#666666',
      white: '#FFFFFF',
      redtw: '#D21312',
      darkredtw: '#AA1312',
      bluepastel: '#9ADCFF',
      greenpastel: '#C9F4AA',
      yellowpastel: '#FDFDBD',
      orange: '#FC513F',
    },
    extend: {},
    fontFamily: {
      poppins: ['Poppins', 'sans-serif'],
      caudex: ['Caudex', 'serif']
    },
  },
  plugins: [
    require('flowbite/plugin')
  ]
}
