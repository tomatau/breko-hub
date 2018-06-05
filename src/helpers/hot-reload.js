import chokidar from 'chokidar'
import webpack from 'webpack'
import R from 'ramda'
import _ from 'lodash'
import koaWebpack from 'koa-webpack'
import webpackDevelopmentConfig from 'config/webpack.development.config'
import { SERVER } from 'config/paths'
import { isomorphicTools } from 'server/isomorphic-tools'
import { noop } from 'app/utils'

const log = {
  hot: debug('hot-reload'),
  koaWebpack: debug('koa-webpack'),
}
const serverDirs = [ /\/server\//, /\/config\//, /\/styles\//, /\/assets\// ]
const allDirs = [ /\/app\//, ...serverDirs ]

export default async function hotReload(app) {
  const compiler = webpack(webpackDevelopmentConfig)
  const watcher = chokidar.watch(SERVER)

  compiler.plugin('compile', () => log.hot('Webpack - compile started...'))
  compiler.plugin('compilation', () => log.hot('Webpack - compiling...'))

  const hotMiddleware = await koaWebpack({
    compiler,
    config: {
      devMiddleware: {
        stats: 'minimal',
      },
      hotClient: {
        log: log.koaWebpack,
      },
    },
  })

  app.use(hotMiddleware)

  watcher.on('ready', () => {
    watcher.on('all', _.after(2, (event, file) => {
      log.hot('Watcher - live update in server', event, file)
      clearServerCache(serverDirs)
    }))
  })

  compiler.plugin('done', _.after(2, () => {
    log.hot('Webpack - recompiled!')
    clearServerCache(allDirs)
    isomorphicTools.refresh()
  }))
}

const idMatchesRegex = id => regex => regex.test(id)

const hasMatch = (regexs, id) => R.any(idMatchesRegex(id), regexs)

function clearServerCache(directories, callback=noop) {
  Object.keys(require.cache).forEach(id => {
    if (hasMatch(directories, id)) {
      callback(id)
      delete require.cache[id]
    }
  })
}
