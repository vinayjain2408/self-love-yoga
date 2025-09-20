module.exports = {
  content: [
    './app/**/*.html',
    './app/components/**/*.js',
    './app/containers/**/*.js',
  ],
  darkMode: 'class',
  safelist: ['top-[558px]', 'right-[-160px]', 'left-[-123px]', 'top-[-144px]'],
  theme: {
    extend: {
      backgroundImage: {
        'custom-gradient':
          'linear-gradient(90deg, rgba(223,177,30,1) 0%, rgba(254,248,136,1) 35%, rgba(240,207,78,1) 100%)',
        'custom-text':
          'linear-gradient(90deg, rgba(223,177,30,1) 0%, rgba(254,248,136,1) 35%, rgba(240,207,78,1) 100%)',
        'custom-card':
          ' linear-gradient(90deg, rgba(0,26,73,1) 0%, rgba(0,19,61,1) 35%, rgba(0,12,50,1) 100%);',
        'green-gradient': 'linear-gradient(180deg, #005E3A 0%, #054130 100%)',
        'purple-gradient': 'linear-gradient(180deg, #8602EB 0%, #50028B 100%)',
        'red-gradient': 'linear-gradient(180deg, #A40100 0%, #680E07 100%)',
        'gold-gradient': 'linear-gradient(180deg, #FFCC2C 0%, #8A6800 100%)',
        'cyan-gradient': 'linear-gradient(180deg, #25D7FF 0%, #01748E 100%)',
      },
      boxShadow: {
        'inner-white': 'inset 0px 0px 6.2px 0px #FFFFFF75',
        custom: '0px 4px 4px rgba(223, 177, 30, 0.19)',
      },
      fontFamily: {
        josefin: ['Josefin', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
        abeezee: ['ABeeZee', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
        roboto: ['Roboto', 'sans-serif'],
        montserrat: ['Montserrat', 'sans-serif'],
        general: ['General Sans', 'sans-serif'],
        azeret: ['Azeret Mono', 'monospace'],
      },
      fontSize: {
        10: '10px',
        12: '12px',
        14: '14px',
        15: '15px',
        16: '16px',
        18: '18px',
        19: '19px',
        20: '20px',
        22: '22px',
        24: '24px',
        25: '25px',
        26: '26px',
        36: '36px',
        46: '46px',
        76: '76px',
      },
      colors: {
        primary: {
          100: '#272727',
          200: '#1F2937',
          300: '#0B032D', //used
          400: '#1C1E23',
          500: '#323232', //used
          600: '#383335',
          700: '#05012B', //used
          800: '#ECECEC',
          900: '#B1B1B5',
          1000: '#70798B',
          1100: '#2B3541',
          1200: '#081420',
        },
      },
      borderRadius: {
        20: '20px',
      },
    },
    screens: {
      sm: '	640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '2rem',
        lg: '4rem',
        xl: '5rem',
        '2xl': '6rem',
      },
    },
  },
};
