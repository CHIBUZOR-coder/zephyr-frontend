export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
        jetbrains: ['"JetBrains Mono"', 'monospace']
      },
      boxShadow: {
        'white-glow': '0 0 100px rgb(37, 99, 235, 0.2)'
      },
      colors: {
        primary: 'black',
        navfoot: 'black',
        btnprimary: 'rgb(0, 127, 109)',
        btnsecondary: 'rgb(255, 255, 255)',
        largetext: 'rgb(255, 255, 255)',
        smalltext: 'rgb(158, 158, 160)',
        shade: 'rgb(9, 23, 26)',
        textshade: 'rgb(19, 101, 101)',
        textshade2: 'rgb(35, 166, 154)',
        herodark: 'rgb(5, 4, 10)',
        herolight: 'rgb(22, 42, 48)',
        circle1: 'rgb(30, 41, 59)',
        circle2: 'rgb(51, 65, 85)',
        circle3: 'rgb(71, 85, 105)',
        boximage: 'rgb(13, 24, 44)'
      }
    }
  },
  plugins: []
}
