import 'config/environment'
import koa from 'koa'
import webpack from 'webpack'
import webpackUnitTestConfig from 'config/webpack.unit-test.browser.config'

const log = debug('webpack')
const app = koa()
const compiler = webpack(webpackUnitTestConfig)

compiler.plugin('compile', () => log('Webpack compile started...'))
compiler.plugin('compilation', () => log('Webpack compiling...'))

app.use(require('koa-webpack-dev-middleware')(compiler, {
  // quiet: true,
  noInfo: true,
  stats: {
    colors: true,
    reasons: true,
  },
  publicPath: webpackUnitTestConfig.output.publicPath,
}))

app.use(require('koa-webpack-hot-middleware')(compiler, { log }))

app.listen(process.env.PORT, () => {
  debug('serving')(`http://localhost:${process.env.PORT}`)
})
