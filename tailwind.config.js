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
        boximage: 'rgb(13, 24, 44)',
        lead: 'rgba(16, 34, 33, 0.7)',
        swipnav: 'rgba(15, 26, 24, 0.3)',
        trr: 'rgba(254, 154, 0, 0.1)',
        trb: 'rgba(194, 122, 255, 0.1)',
        modaltext: '#B0E4DD',
        verircom: 'rgba(34, 197, 94, 0.3)',
        veriris: 'rgba(59, 130, 246, 0.3)',
        modeboreder: 'rgba(0, 152, 131, 0.3)',
        modeborder: '#574516',
        socials: 'rgba(0, 136, 204, 0.2)',
        socialsb: 'rgba(0, 136, 204, 0.8)',
        master: 'rgba(254, 154, 0, 0.1)',
        masterb: 'rgba(254, 154, 0, 0.8)',
        mainetsm: 'rgba(16, 27, 34, 0.3)',
      }
    }
  },
  plugins: [require('tailwind-scrollbar-hide')]
}
