import 'config/environment'
import koa from 'koa'
import webpack from 'webpack'
import webpackUnitTestConfig from 'config/webpack.unit-test.browser.config'

const compiler = webpack(webpackUnitTestConfig)
const app = koa()

app.use(require('koa-webpack-dev-middleware')(compiler, {
  // quiet: true,
  // noInfo: true,
  stats: {
    colors: true,
    reasons: true,
  },
  publicPath: webpackUnitTestConfig.output.publicPath,
}))

app.use(require('koa-webpack-hot-middleware')(compiler))

app.listen(process.env.PORT, () => {
  debug(`serving`)(`http://localhost:${process.env.PORT}`)
})
