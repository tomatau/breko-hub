const path = require('path')
require('babel-polyfill')
require('babel-register')({
  resolveModuleSource: require('babel-resolve-relative-module')(
    path.join(__dirname, '..', 'src')
  ),
})
const argv = require('yargs').argv

const file = (() => {
  switch(true) {
    case argv.test:
      return argv.run || argv.functional ? 'test-run.js' : 'test.js'
    case argv.dev:
      return 'dev.js'
    case argv.build:
      return 'build.js'
    default:
    case argv.production:
    case argv.serve:
      return 'serve.js'
  }
})()

require(`./${file}`)
