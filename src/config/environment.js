import loadEnv from 'node-env-file'
import { ENV_FILE } from 'config/paths'

loadEnv(ENV_FILE, { raise: false })

debug.enable(process.env.DEBUG)

const log = debug('environment')

log({
  PORT: process.env.PORT,
  NODE_ENV: process.env.NODE_ENV,
  CONFIG_ENV: process.env.CONFIG_ENV,
  APP_CONFIG: process.env.APP_CONFIG,
})

log('Applying defaults')

if (!process.env.CONFIG_ENV) {
  process.env.CONFIG_ENV = 'production'
}

/* require app config after loadEnv call and default CONFIG_ENV */
const appConfig = require('./app.config').default

if (!process.env.APP_CONFIG) {
  process.env.APP_CONFIG = JSON.stringify(appConfig)
}

if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = 'development'
}

if (!process.env.PORT) {
  process.env.PORT = appConfig.PORT
}

log({
  PORT: process.env.PORT,
  NODE_ENV: process.env.NODE_ENV,
  CONFIG_ENV: process.env.CONFIG_ENV,
  APP_CONFIG: process.env.APP_CONFIG,
})
