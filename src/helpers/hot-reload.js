import chokidar from 'chokidar'
import webpack from 'webpack'
import R from 'ramda'
import webpackDevelopmentConfig from 'config/webpack.development.config'
import { isomorphicTools } from 'server/isomorphic-tools'
import koaWebpack from 'koa-webpack'
import { SERVER } from 'config/paths'

const log = {
  hot: debug('hot-reload'),
  koaWebpack: debug('koa-webpack'),
}
const SERVER_HOT = [ /\/server\//, /\/config\//, /\/styles\//, /\/assets\// ]
const ALL_HOT = [ /\/app\//, ...SERVER_HOT ]
const hasMatch = (regexs, id) => R.any((regex) => regex.test(id))(regexs)

export default function hotReload(app) {
  const compiler = webpack(webpackDevelopmentConfig)
  const watcher = chokidar.watch(SERVER)

  compiler.plugin('compile', () => log.hot('Webpack compile started...'))
  compiler.plugin('compilation', () => log.hot('Webpack compiling...'))

  app.use(koaWebpack({
    compiler,
    dev: {
      quiet: true,
      noInfo: true,
      stats: {
        colors: true,
        reasons: true,
      },
    },
    hot: {
      log: log.koaWebpack,
    },
  }))

  log.hot('Watching server source')
  watcher.on('ready', () => {
    watcher.on('all', (event, file) => {
      log.hot('hot reloading server', event, file)
      Object.keys(require.cache).forEach((id) => {
        if (hasMatch(SERVER_HOT, id)) {
          delete require.cache[id]
        }
      })
    })
  })

  log.hot('Watching client app source')
  compiler.plugin('done', () => {
    log.hot('Clearing /app/ module cache from server')
    Object.keys(require.cache).forEach((id) => {
      if (hasMatch(ALL_HOT, id)) {
        delete require.cache[id]
      }
    })
    isomorphicTools.refresh()
  })
}
