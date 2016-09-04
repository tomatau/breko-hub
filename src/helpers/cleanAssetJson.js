import { ASSET_FILE } from 'config/paths'
import rimraf from 'rimraf'

const log = {
  clean: debug('clean-assets'),
}
if (process.env.NODE_ENV === 'development') {
  rimraf(ASSET_FILE, err => {
    if (err) {
      log.clean(err)
      process.exit(1)
    }
  })
}
