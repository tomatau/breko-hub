import chokidar from 'chokidar'
import webpack from 'webpack'
import R from 'ramda'
import webpackDevelopmentConfig from 'config/webpack.development.config'
import { isomorphicTools } from 'server/isomorphicTools'
import { SERVER } from 'config/paths'

const log = debug('hot-reload')
const SERVER_HOT = [ /\/server\//, /\/helpers\//, /\/config\//, /\/styles\//, /\/assets\// ]
const ALL_HOT = [ /\/app\//, ...SERVER_HOT ]
const hasMatch = (regexs, id) => R.any((regex) => regex.test(id))(regexs)

export default function hotReload(app) {
  const compiler = webpack(webpackDevelopmentConfig)
  const watcher = chokidar.watch(SERVER)

  compiler.plugin('compile', () => log('Webpack compile started...'))
  compiler.plugin('compilation', () => log('Webpack compiling...'))

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

  log('Watching server source')
  watcher.on('ready', () => {
    watcher.on('all', (event, file) => {
      log('hot reloading server', event, file)
      Object.keys(require.cache).forEach((id) => {
        if (hasMatch(SERVER_HOT, id)) {
          delete require.cache[id]
        }
      })
    })
  })

  log('Watching client app source')
  compiler.plugin('done', () => {
    log('Clearing /app/ module cache from server')
    Object.keys(require.cache).forEach((id) => {
      if (hasMatch(ALL_HOT, id)) {
        delete require.cache[id]
      }
    })
    isomorphicTools.refresh()
  })
}
