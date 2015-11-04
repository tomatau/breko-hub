import '~/src/config/environment'
import './helpers/cssModulesHook.es6'
import './helpers/cleanAssetJson.es6'
import { ROOT } from '~/src/config/paths'
import path from 'path'
import koa from 'koa'
import mount from 'koa-mount'
import webpack from 'webpack'
import log from 'npmlog'
import chokidar from 'chokidar'
import webpackConfig from '~/src/config/webpack.unit-test.browser.config'

const compiler = webpack(webpackConfig)
const app = koa()

app.use(require('koa-webpack-dev-middleware')(compiler, {
  quiet: true,
  noInfo: true,
  stats: {
    colors: true,
    reasons: true,
  },
  publicPath: webpackConfig.output.publicPath,
}))

app.use(require('koa-webpack-hot-middleware')(compiler))

const watcher = chokidar.watch(path.join(ROOT, '/test'))
watcher.on('ready', () => {
  watcher.on('all', () => {
    log.verbose('reload', 'Clearing /server/ module cache from server')
    Object.keys(require.cache).forEach((id) => {
      if (/\/server\//.test(id)) delete require.cache[id]
    })
  })
})

compiler.plugin('done', () => {
  log.verbose('reload', 'Clearing /app/ module cache from server')
  Object.keys(require.cache).forEach((id) => {
    if (/\/app\//.test(id)) delete require.cache[id]
    if (/\/server\//.test(id)) delete require.cache[id]
  })
})

app.listen(process.env.PORT, () => {
  log.info(`Serving`, `http://localhost:${process.env.PORT}`)
})
