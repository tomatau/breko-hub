import IsomorphicTools from 'webpack-isomorphic-tools'
import IsomorphicToolsPlugin from 'webpack-isomorphic-tools/plugin'
import isomorphicConfig from 'config/isomorphic.config'

export const isomorphicTools = new IsomorphicTools(isomorphicConfig)
export const isomorphicPlugin = new IsomorphicToolsPlugin(isomorphicConfig)
