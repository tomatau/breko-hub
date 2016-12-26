import loadEnv from 'node-env-file'
import { ROOT } from 'config/paths'

loadEnv(`${ROOT}/.env`, { raise: false })

debug.enable(process.env.DEBUG)
debug.log = console.info.bind(console) // eslint-disable-line no-console

const log = debug('environment')

log({
  PORT: process.env.PORT,
  NODE_ENV: process.env.NODE_ENV,
})

log('Applying defaults')

if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = 'development'
}

if (!process.env.PORT) {
  process.env.PORT = 9001
}

log({
  PORT: process.env.PORT,
  NODE_ENV: process.env.NODE_ENV,
})
