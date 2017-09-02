import 'config/environment'
import Koa from 'koa'
import webpack from 'webpack'
import koaWebpack from 'koa-webpack'
import webpackUnitTestConfig from 'config/webpack.unit-test.browser.config'

const log = debug('webpack')
const app = new Koa()
const compiler = webpack(webpackUnitTestConfig)

compiler.plugin('compile', () => log('Webpack compile started...'))
compiler.plugin('compilation', () => log('Webpack compiling...'))

app.use(koaWebpack({
  compiler,
  dev: {
    quiet: false,
    noInfo: false,
    stats: {
      colors: true,
      reasons: true,
    },
  },
  hot: { log },
}))

app.listen(process.env.PORT, () => {
  debug('serving')(`http://localhost:${process.env.PORT}`)
})
