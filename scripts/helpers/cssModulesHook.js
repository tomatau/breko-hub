import { ROOT, STYLES } from 'config/paths'
import cssModulesHook from 'css-modules-require-hook'
import sass from 'node-sass'
import loaderUtils from 'loader-utils'
import autoprefixer from 'autoprefixer'

const log = {
  css: debug('css-hook'),
}

log.css('Building CSS-modules for all .scss and .css files')
cssModulesHook({
  extensions: [ '.scss', '.css' ],
  prepend: [ autoprefixer({ browsers: [ 'last 2 versions' ] }) ],
  generateScopedName(exportedName, exportedPath) {
    const path = exportedPath
      .replace(`${ROOT}/`, '')
      .replace(/^\//, '')
      .replace(/\.s?css$/, '')
      .replace(/\/|\./g, '-')
    return `${path}-${exportedName}`
  },
  preprocessCss(css, filename) {
    return sass.renderSync({
      includePaths: [ `${ROOT}/node_modules`, STYLES ],
      data: css,
      file: filename,
      importer(url) {
        return { file: loaderUtils.urlToRequest(url) }
      },
    }).css
  },
})
