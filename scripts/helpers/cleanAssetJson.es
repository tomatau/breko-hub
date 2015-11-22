import { ASSET_FILE } from '~/src/config/paths'
import debug from 'debug'
import rimraf from 'rimraf'
const log = {
  clean: debug('clean-assets'),
}

rimraf(ASSET_FILE, err => {
  if (err) {
    log.clean(err)
    process.exit(1)
  }
})
