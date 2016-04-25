import 'config/environment'
import koa from 'koa'
import webpack from 'webpack'
import webpackUnitTestConfig from 'config/webpack.unit-test.browser.config'

const log = {
  webpack: debug('webpack'),
}
const app = koa()
const compiler = webpack(webpackUnitTestConfig)

compiler.plugin('compile', () => log.webpack('Webpack compile started...'))
compiler.plugin('compilation', () => log.webpack('Webpack compiling...'))

app.use(require('koa-webpack-dev-middleware')(compiler, {
  // quiet: true,
  noInfo: true,
  stats: {
    colors: true,
    reasons: true,
  },
  publicPath: webpackUnitTestConfig.output.publicPath,
}))

app.use(require('koa-webpack-hot-middleware')(compiler, {
  log: log.webpack,
}))

app.listen(process.env.PORT, () => {
  debug('serving')(`http://localhost:${process.env.PORT}`)
})
