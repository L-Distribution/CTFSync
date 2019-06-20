const withSass = require('@zeit/next-sass')
const withCSS = require('@zeit/next-css')

const cssLoaderConfig = require('@zeit/next-css/css-loader-config')

module.exports = module.exports = withSass({
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    if (!defaultLoaders) {
      throw new Error(
        'This plugin is not compatible with Next.js versions below 5.0.0 https://err.sh/next-plugins/upgrade'
      )
    }

    defaultLoaders.css = cssLoaderConfig(config, {
      extensions: ['css'],
      cssModules: false,
      cssLoaderOptions: {},
      postcssLoaderOptions: {},
      dev,
      isServer
    })

    config.module.rules.push({
      test: /\.css$/,
      issuer(issuer) {
        if (issuer.match(/pages[\\/]_document\.js$/)) {
          throw new Error(
            'You can not import CSS files in pages/_document.js, use pages/_app.js instead.'
          )
        }
        return true
      },
      use: defaultLoaders.css
    })

    return config
  },
  cssModules: true,
  cssLoaderOptions: {
    importLoaders: 1,
    localIdentName: "[local]___[hash:base64:5]",
  }
})