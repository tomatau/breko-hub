import log from 'npmlog';
import {ROOT} from './paths';
import nodeEnvFile from 'node-env-file';
nodeEnvFile(`${ROOT}/.env`)
log.level = process.env.NPM_CONFIG_LOGLEVEL;
log.enableColor();
log.info('config', 'Setting Environment From File')
log.verbose(`Running in ENV`, process.env.NODE_ENV)
log.verbose(`Supplied PORT`, process.env.PORT)

