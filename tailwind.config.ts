import type { Config } from 'tailwindcss'
import { fontFamily } from 'tailwindcss/defaultTheme'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    fontFamily: {
      goldman: ['Goldman'],
      lato: ['Lato'],
      saira: ['var(--font-saira)', ...fontFamily.sans],
    },
    borderWidth: {
      1: '1px',
      2: '2px',
      3: '3px',
    },
    extend: {
      colors: {
        primary: {
          100: 'rgba(222, 143, 116, 1)',
          75: 'rgba(222, 143, 116, .75)',
          50: 'rgba(222, 143, 116, .5)',
          25: 'rgba(222, 143, 116, .25)',
          5: 'rgba(222, 143, 116, .05)',
        },
        secondary: {
          100: 'rgba(31, 92, 209, 1)',
          75: 'rgba(31, 92, 209, .75)',
          50: 'rgba(31, 92, 209, .5)',
          25: 'rgba(31, 92, 209, .25)',
        },
        // tertiary: {
        //   100: 'rgba(31 , 177, 209, 1)',
        //   75: 'rgba(31 , 177, 209, .75)',
        //   50: 'rgba(31 , 177, 209, .5)',
        //   25: 'rgba(31 , 177, 209, .25)',
        // },
        dark: '#0D1525',
        gray: '#3A507A',
      },
    },
  },
  plugins: [],
}
export default config
