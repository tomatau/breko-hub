import { ROOT, STYLES } from '~/src/config/paths'
import cssModulesHook from 'css-modules-require-hook'
import sass from 'node-sass'
import loaderUtils from 'loader-utils'

cssModulesHook({
  extensions: [ '.scss', '.css' ],
  generateScopedName(exportedName, exportedPath) {
    const path = exportedPath.substr(1)
      .replace(/\.s?css$/, '')
      .replace(/\/|\./g, '-')
    return path + '-' + exportedName
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
