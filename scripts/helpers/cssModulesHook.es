import { ROOT, STYLES } from '~/src/config/paths'
import cssModulesHook from 'css-modules-require-hook'
import sass from 'node-sass'
import debug from 'debug'
import loaderUtils from 'loader-utils'
const log = {
  css: debug('css-hook'),
}

log.css('Building CSS-modules for all .scss and .css files')
cssModulesHook({
  extensions: [ '.scss', '.css' ],
  generateScopedName(exportedName, exportedPath) {
    const path = exportedPath
      .replace(`${ROOT}/`, '')
      .replace(/^\//, '')
      .replace(/\.s?css$/, '')
      .replace(/\/|\./g, '-')
    return `${path}-${exportedName}`
  },
  preprocessCss(css/*, filename*/) {
    return sass.renderSync({
      includePaths: [ `${ROOT}/node_modules`, STYLES ],
      data: css,
      importer(url/*, fileContent*/) {
        return { file: loaderUtils.urlToRequest(url) }
      },
    }).css
  },
})
