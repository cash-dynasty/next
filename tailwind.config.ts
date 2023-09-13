import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    fontFamily: {
      'goldman': ['Goldman']
    },

    extend: {
      colors: {
        primary: {
          100: 'rgba(255, 110, 32, 1)',
          75: 'rgba(255, 110, 32, .75)',
          50: 'rgba(255, 110, 32, .5)',
          25: 'rgba(255, 110, 32, .25)',
        },
        secondary: {
          100: 'rgba(24 , 53, 58, 1)',
          75: 'rgba(24 , 53, 58, .75)',
          50: 'rgba(24 , 53, 58, .5)',
          25: 'rgba(24 , 53, 58, .25)',
        },
        tertiary: {
          100: 'rgba(204 , 204, 204, 1)',
          75: 'rgba(204 , 204, 204, .75)',
          50: 'rgba(204 , 204, 204, .5)',
          25: 'rgba(204 , 204, 204, .25)',
        }
      },
    },
  },
  plugins: [],
}
export default config
