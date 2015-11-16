import { ROOT } from '~/src/config/paths'
import debug from 'debug'
import rimraf from 'rimraf'

rimraf(`${ROOT}/webpack-assets.json`, err => {
  if (err) {
    debug('clean-assets')(err)
    process.exit(1)
  }
})
