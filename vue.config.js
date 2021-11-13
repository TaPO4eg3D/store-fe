module.exports = {
  pluginOptions: {
    i18n: {
      locale: 'en',
      fallbackLocale: 'en',
      localeDir: 'locales',
      enableLegacy: false,
      runtimeOnly: false,
      compositionOnly: false,
      fullInstall: true
    }
  },
  devServer: {
    proxy: 'http://localhost:8000'
  },
  css: {
    loaderOptions: {
      sass: {
        prependData: '@import \'~@/assets/scss/main.scss\';'
      }
    }
  }
}
