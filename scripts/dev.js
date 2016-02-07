import 'config/environment'
import '~/scripts/helpers/cssModulesHook'
import '~/scripts/helpers/cleanAssetJson'
import { ROOT, SERVER, SOCKETS } from 'config/paths'
import path from 'path'
import { argv } from 'yargs'
import http from 'http'
import webpack from 'webpack'
import chokidar from 'chokidar'
import open from 'open'
import webpackDevelopmentConfig from 'config/webpack.development.config'
import { isomorphicTools, isomorphicPlugin } from 'server/isomorphicTools'
import app from 'server/index'

isomorphicTools.development()
isomorphicPlugin.development()

const log = {
  app: debug('app'),
  hot: debug('hot-reload'),
}

const compiler = webpack(webpackDevelopmentConfig)

compiler.plugin('compile', () => log.app('Webpack compile started...'))
compiler.plugin('compilation', () => log.app('Webpack compiling...'))

app.use(require('koa-webpack-dev-middleware')(compiler, {
  quiet: true,
  noInfo: true,
  stats: {
    colors: true,
    reasons: true,
  },
  publicPath: webpackDevelopmentConfig.output.publicPath,
}))

app.use(require('koa-webpack-hot-middleware')(compiler))

isomorphicTools.server(ROOT, () => {
  app.use(function *() {
    log.app('Mounting koa app')
    const { rootRouter, setRoutes } = require(`${SERVER}/router`)
    setRoutes(isomorphicTools.assets())
    yield rootRouter.routes()
  })
})

const server = http.createServer(app.callback())
global.socketServer = require(SOCKETS)(server)

const watcher = chokidar.watch(path.join(SERVER))
log.hot('Watching server source')
watcher.on('ready', () => {
  watcher.on('all', () => {
    log.hot('Clearing /server/ module cache from server')
    Object.keys(require.cache).forEach((id) => {
      if (/\/server\//.test(id)) delete require.cache[id]
    })
  })
})

log.hot('Watching client app source')
compiler.plugin('done', () => {
  log.hot('Clearing /app/ module cache from server')
  Object.keys(require.cache).forEach((id) => {
    if (/\/app\//.test(id)) delete require.cache[id]
    if (/\/server\//.test(id)) delete require.cache[id]
  })
  isomorphicTools.refresh()
})

server.listen(process.env.PORT, () => {
  const URI = `http://localhost:${process.env.PORT}`
  log.app(`Serving`, URI)
  if (argv.open || argv.o) open(URI)
})
