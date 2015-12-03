import debug from 'debug'
import nodeEnvFile from 'node-env-file'
import { ROOT } from 'config/paths'

if (!process.env.ENVIRONMENT) {
  nodeEnvFile(`${ROOT}/.env`)
}

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

