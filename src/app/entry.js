import 'unfetch/polyfill'
import 'raf/polyfill'
import 'react-hot-loader'
import { ConfigService } from 'app/utils'

debug.enable(process.env.DEBUG)

const log = debug('entry')

ConfigService.setEnv(window.__CONFIG_ENV__)
ConfigService.assignVars(window.__APP_CONFIG__)

log('Environment', {
  ...process.env,
  CONFIG_ENV: ConfigService.getEnv(),
  APP_CONFIG: ConfigService.getVars(),
})

require('app/start')
