export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
    'postcss-px-to-viewport': {
      unitToConvert: 'px',
      viewportWidth: 375,
      unitPrecision: 6,
      propList: ['*'],
      viewportUnit: 'vw',
      fontViewportUnit: 'vw',
      selectorBlackList: ['wrap'],
      minPixelValue: 1,
      mediaQuery: true,
      replace: true,
      exclude: [/node_modules/],
      landscape: false
    }

  },
}
