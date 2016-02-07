import 'config/environment'
import '~/scripts/helpers/cleanAssetJson'
import webpack from 'webpack'
import webpackProductionConfig from 'config/webpack.production.config'

const log = {
  webpack: debug('webpack-compile'),
  build: debug('build'),
}

log.build(`Building in ENV`, process.env.NODE_ENV)
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
