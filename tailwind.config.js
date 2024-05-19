/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,vue}",
  ],
  theme: {
    extend: {
      colors: {
        blue: {
          DEFAULT: '#2E5BFF',
          50: '#EBEEFC',
          100: '#5BABF2',
          500: '#3366FF',
          700: '#2E384D'
        },
        gray: {
          DEFAULT: '#B5B5C3',
          100: '#E8E8E8',
          200: '#EDF1FD',
          600: '#7A7A9D',
        },
        black: {
          DEFAULT: '#212121',
          400: '#1D1D1F'
        },
        red: {
          DEFAULT: '#FF4945',
          100: '#FFECEB'
        },
        sky: {
          DEFAULT: '#E0E7FF',
        }
      },
      container: {
        center: true,
        screens: {
          '2xl': '1200px'
        }
      },
      width: {
        30: '123px',
        31: '124px',
        38: '153px',
        50: '200px',
        61: '247px',
        71: '284px',
        198: '793px',
        205: '820px'
      },
      height: {
        '10.5': '42px',
        13: '52px',
        15: '60px',
      },
      maxHeight: {
        50: '200px'
      },
      maxWidth: {
        '146.5': '586px',
        '197.5': '790px'
      },
      margin: {
        '6.5': '26px'
      },
      top: {
        70: '280px'
      },
      boxShadow: {
        '2xl': '0 25px 40px 0 rgba(0, 0, 0, 0.03)',
      }
    },
  },
  plugins: [],
}

