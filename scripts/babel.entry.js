const argv = require('yargs').argv
require(`./${(argv.development) ? 'development.es6' : 'serve.es6'}`)
