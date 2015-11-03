import { ROOT } from '~/src/config/paths'
import log from 'npmlog'
import rimraf from 'rimraf'

rimraf(`${ROOT}/webpack-assets.json`, err => {
  if (err) {
    log.error('clean-assets', err)
    process.exit(1)
  }
})
