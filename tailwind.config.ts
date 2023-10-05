import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    fontFamily: {
      goldman: ['Goldman'],
    },
    borderWidth: {
      1: '1px',
      2: '2px',
      3: '3px',
    },
    extend: {
      colors: {
        primary: {
          100: 'rgba(255, 110, 32, 1)',
          75: 'rgba(255, 110, 32, .75)',
          50: 'rgba(255, 110, 32, .5)',
          25: 'rgba(255, 110, 32, .25)',
          5: 'rgba(255, 110, 32, .05)',
        },
        secondary: {
          100: 'rgba(24 , 53, 58, 1)',
          75: 'rgba(24 , 53, 58, .75)',
          50: 'rgba(24 , 53, 58, .5)',
          25: 'rgba(24 , 53, 58, .25)',
        },
        tertiary: {
          100: 'rgba(31 , 177, 209, 1)',
          75: 'rgba(31 , 177, 209, .75)',
          50: 'rgba(31 , 177, 209, .5)',
          25: 'rgba(31 , 177, 209, .25)',
        },
      },
    },
  },
  plugins: [],
}
export default config
