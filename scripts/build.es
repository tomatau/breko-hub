import '~/src/config/environment'
import './helpers/cleanAssetJson'
import debug from 'debug'
import webpack from 'webpack'
import webpackConfig from '~/src/config/webpack.production.config'

const log = {
  webpack: debug('webpack-compile'),
}
const compiler = webpack(webpackConfig)

compiler.run((err, stats) => {
  if (err) {
    log.webpack(err)
    process.exit(1)
  }
  log.webpack(stats.toString({
    colors: true,
    // reasons: true,
  }))
  process.exit(0)
})
