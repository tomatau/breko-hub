import loadEnv from 'node-env-file'
import { ROOT } from 'config/paths'

loadEnv(`${ROOT}/.env`, {
  raise: false,
})

process.env.NODE_ENV = process.env.NODE_ENV || 'development'
process.env.PORT = process.env.PORT || 9001

debug.enable(process.env.DEBUG)
const log = {
  config: debug('config'),
  err: debug('app-error'),
}

process.on('unhandledRejection', function(err) {
  log.err('Promise rejection unhandled', err.stack)
})

if (!process.env.ENVIRONMENT)
  log.config('Environment was set from `.env` file')
log.config(`Running in ENV`, process.env.NODE_ENV)
log.config(`Supplied with PORT`, process.env.PORT)

