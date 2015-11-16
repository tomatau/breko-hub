import debug from 'debug'
import { ROOT } from './paths'
import nodeEnvFile from 'node-env-file'
if (!process.env.ENVIRONMENT) {
  nodeEnvFile(`${ROOT}/.env`)
}
debug.enable(process.env.DEBUG)
const configDebug = debug('config')
configDebug('Setting Environment From File')
configDebug(`Running in ENV`, process.env.NODE_ENV)
configDebug(`Supplied PORT`, process.env.PORT)

