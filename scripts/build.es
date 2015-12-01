import 'config/environment'
import '~/scripts/helpers/cleanAssetJson'
import debug from 'debug'
import webpack from 'webpack'
import webpackProductionConfig from 'config/webpack.production.config'

const log = {
  webpack: debug('webpack-compile'),
  build: debug('build'),
}
log.build('Forcing into [production] environment')
process.env.NODE_ENV = 'production'
const compiler = webpack(webpackProductionConfig)

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
