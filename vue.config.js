module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/promo-qr-cup/' : '/',
  pages: {
    index: {
      entry: 'src/main.js',
      title: 'Спасибо, что выбираете «Mosaic Coffee and tea»'
    }
  },
  css: {
    loaderOptions: {
      sass: {
        sassOptions: {
          quietDeps: true
        },
        additionalData: '@import "@/assets/styles/_partials.scss";'
      }
    }
  }
}
