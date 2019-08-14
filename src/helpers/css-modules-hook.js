import { STYLES, NODE_MODULES } from 'config/paths'
import cssModulesHook from 'css-modules-require-hook'
import sass from 'node-sass'
import loaderUtils from 'loader-utils'
import autoprefixer from 'autoprefixer'

const log = debug('css-hook')

log('Building CSS-modules for all .scss and .css files')

cssModulesHook({
  extensions: [ '.scss', '.css' ],
  prepend: [ autoprefixer() ],
  generateScopedName: `[path][name]-[local]`,
  preprocessCss(cssString, filename) {
    const { css } = sass.renderSync({
      includePaths: [ NODE_MODULES, STYLES ],
      data: cssString,
      file: filename,
      importer(url) {
        return { file: loaderUtils.urlToRequest(url) }
      },
    })
    return css
  },
})
