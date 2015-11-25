import IsomorphicTools from 'webpack-isomorphic-tools'
import IsomorphicToolsPlugin from 'webpack-isomorphic-tools/plugin'
import isomorphicConfig from '~/src/config/isomorphic.config'

export const isomorphicTools = new IsomorphicTools(isomorphicConfig)
export const isomorphicPlugin = new IsomorphicToolsPlugin(isomorphicConfig)

if (process.env.NODE_ENV === 'development') {
  isomorphicTools.development()
  isomorphicPlugin.development()
}
