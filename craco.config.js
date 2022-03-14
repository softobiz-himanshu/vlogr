const path = require('path')

const resolveSrc = (...paths) => path.join(__dirname, 'src', ...paths)

module.exports = {
  webpack: {
    alias: {
      '@': resolveSrc(),
      '@assets': resolveSrc('assets'),
      '@components': resolveSrc('components'),
      '@common': resolveSrc('common'),
      '@constants': resolveSrc('constants'),
      '@contexts': resolveSrc('contexts'),
      '@hooks': resolveSrc('hooks'),
      '@pages': resolveSrc('pages'),
      '@store': resolveSrc('store'),
      '@services': resolveSrc('services'),
      '@utils': resolveSrc('utils'),
      '@handlers': resolveSrc('handlers'),
      '@sdk': resolveSrc('sdk'),
      '@playback': resolveSrc('playback'),
    },
  },
  devServer: {
    headers: {
      'Cross-Origin-Embedder-Policy': 'require-corp',
      'Cross-Origin-Opener-Policy': 'same-origin',
    },
  },
}
