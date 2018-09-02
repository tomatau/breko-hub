import { ConfigService } from 'app/utils'

debug.enable(process.env.DEBUG)

const log = debug('entry')

ConfigService.setEnv(window.__CONFIG_ENV__)

log('Environment', {
  ...process.env,
  CONFIG_ENV: ConfigService.getEnv(),
})

require('app/start')
