import '~/src/config/environment'
import './helpers/cleanAssetJson.es6'
import debug from 'debug'
import webpack from 'webpack'
import webpackConfig from '~/src/config/webpack.production.config'

const compiler = webpack(webpackConfig)

compiler.run((err, stats) => {
  if (err) {
    debug('webpack-compile', err)
    process.exit(1)
  }
  debug('webpack-compile', stats.toString({
    colors: true,
    // reasons: true,
  }))
  process.exit(0)
})
