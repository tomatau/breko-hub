import { ASSET_FILE } from 'config/paths'
import { isEnv } from 'app/utils/predicates'

const log = debug('clean-assets')

if (isEnv('development')) {
  require('rimraf')(ASSET_FILE, err => {
    if (err) {
      log(err)
      process.exit(1)
    }
  })
}
