const BASE = 16; // base size
const rem = (px, key = px) => ({ [`\[${key}\px]`]: `${px / BASE}rem` });
const BASE_SCREEN_WIDTH = 360;
const getResponsiveFontSize = (px) => {
  return `${(Number(px) / BASE_SCREEN_WIDTH) * 100}vw`;
}

// const BASE_WIDTH = window.innerWidth;
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: ['./pages/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './app/**/*.{ts,tsx}', './src/**/*.{ts,tsx}'],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      // fontSize: {
      //   ...new Array(100) // will parse for the scope text-[1px] - text[100px]
      //     .fill('')
      //     .map((_item, index) => rem(index + 1))
      //     .reduce((acc, obj) => ({ ...acc, ...obj })),
      // },
      fontSize: {
        '8-8': [
          getResponsiveFontSize(8),
            {
              lineHeight: 0,
            },
        ],
        '8-9': [
          getResponsiveFontSize(8),
            {
              lineHeight: getResponsiveFontSize(9),
            },
        ],
        '8-10': [
          getResponsiveFontSize(8),
            {
              lineHeight: getResponsiveFontSize(10),
            },
        ],
        '8-12': [
          getResponsiveFontSize(8),
            {
              lineHeight: getResponsiveFontSize(12),
            },
        ],
        '9-9': [
          getResponsiveFontSize(9),
            {
              lineHeight: 1,
            },
        ],
        '9-10': [
          getResponsiveFontSize(9),
            {
              lineHeight: getResponsiveFontSize(10),
            },
        ],
        '9-11': [
          getResponsiveFontSize(9),
            {
              lineHeight: getResponsiveFontSize(11),
            },
        ],
        '9-12': [
          getResponsiveFontSize(9),
            {
              lineHeight: getResponsiveFontSize(12),
            },
          ],
        '9-13': [
          getResponsiveFontSize(9),
            {
              lineHeight: getResponsiveFontSize(13),
            },
          ],
        '9-14': [
          getResponsiveFontSize(9),
            {
              lineHeight: getResponsiveFontSize(14),
            },
          ],
        '9-18': [
          getResponsiveFontSize(9),
            {
              lineHeight: 2,
            },
          ],
        '10-8': [
          getResponsiveFontSize(10),
            {
              lineHeight: getResponsiveFontSize(8),
            },
          ],
        '10-10': [
          getResponsiveFontSize(10),
            {
              lineHeight: 1,
            },
          ],
        '10-12': [
          getResponsiveFontSize(10),
            {
              lineHeight: 1.2,
            },
          ],
        '10-14': [
          getResponsiveFontSize(10),
            {
              lineHeight: 1.4,
            },
          ],
        '10-15': [
          getResponsiveFontSize(10),
            {
              lineHeight: 1.5,
            },
          ],
        '10-20': [
          getResponsiveFontSize(10),
            {
              lineHeight: 2,
            },
          ],
        '10-25': [
          getResponsiveFontSize(10),
            {
              lineHeight: 2.5,
            },
          ],
        '11-13': [
          getResponsiveFontSize(11),
            {
              lineHeight: getResponsiveFontSize(13),
            },
        ],

        '12-12': [
          getResponsiveFontSize(12),
            {
              lineHeight: 1,
            },
        ],
        '12-14': [
          getResponsiveFontSize(12),
            {
              lineHeight: getResponsiveFontSize(14),
            },
        ],
        '12-16': [
          getResponsiveFontSize(12),
            {
              lineHeight: getResponsiveFontSize(16),
            },
        ],
        '14-12': [
          getResponsiveFontSize(14),
            {
              lineHeight: getResponsiveFontSize(12),
            },
        ],
        '14-14': [
          getResponsiveFontSize(14),
            {
              lineHeight: 1,
            },
        ],
        '14-20': [
          getResponsiveFontSize(14),
            {
              lineHeight: getResponsiveFontSize(20),
            },
        ],
        '16-12': [
          getResponsiveFontSize(16),
            {
              lineHeight: getResponsiveFontSize(12),
            },
        ],
        '16-16': [
          getResponsiveFontSize(16),
            {
              lineHeight: 1,
            },
        ],
        '16-20': [
          getResponsiveFontSize(16),
            {
              lineHeight: 1,
            },
        ],
        '18-18': [
          getResponsiveFontSize(18),
            {
              lineHeight: 1,
            },
        ],
        '20-24': [
          getResponsiveFontSize(20),
            {
              lineHeight: 1.2,
            },
          ],
        '36-36': [
          getResponsiveFontSize(36),
            {
              lineHeight: 1,
            },
          ],
      },
      fontFamily: {
        Montserrat: ['Montserrat Bold'],
        OpenSans: ['OpenSans Semibold'],
        '404px': ['"404px"'],
        OCR: ['OCR A Extended'],
        Kitty: ['Kitty Kat'],
        REV: ['REV'],
      },
      colors: {
        ['bluish-purple']: '#5D64A2',
        ['bluish-purple-light']: '#7D83B5',
        green: '#07E993',
        ['deep-green']: '#2A6F55',
        red: '#FF0000',
        purple: '#B53BFF',
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
      padding: {
        safe: 'env(safe-area-inset-bottom)',
      },
      gridTemplateColumns: {
        '10': 'repeat(10, 1fr)',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
