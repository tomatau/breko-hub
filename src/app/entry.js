debug.enable(process.env.DEBUG)

const log = debug('entry')

log('Environment', process.env)

require('app/start')
