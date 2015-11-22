import debug from 'debug'
import nodeEnvFile from 'node-env-file'
import { ROOT } from './paths'

if (!process.env.ENVIRONMENT) {
  nodeEnvFile(`${ROOT}/.env`)
}

debug.enable(process.env.DEBUG)
const configDebug = debug('config')

if (!process.env.ENVIRONMENT)
  configDebug('Environment was set from `.env` file')
configDebug(`Running in ENV`, process.env.NODE_ENV)
configDebug(`Supplied with PORT`, process.env.PORT)

