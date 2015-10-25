import '~/src/config/environment';
import './helpers/cleanAssetJson.es6';
import log from 'npmlog';
import webpack from 'webpack';
import webpackConfig from '~/src/config/webpack.production.config';

const compiler = webpack(webpackConfig)

compiler.run((err, stats) => {
  if (err) {
    log.error('webpack-compile', err)
    process.exit(1)
  }
  log.info('webpack-compile', stats.toString({
    colors: true,
    // reasons: true,
  }))
  process.exit(0)
})
