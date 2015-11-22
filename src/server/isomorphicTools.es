import IsomorphicTools from 'webpack-isomorphic-tools'
import isomorphicConfig from '~/src/config/isomorphic.config'

const isomorphicTools = new IsomorphicTools(isomorphicConfig)

if (process.env.NODE_ENV === 'development') {
  isomorphicTools.development()
}

export default isomorphicTools
