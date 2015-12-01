const path = require('path')
require('babel/register')({
  resolveModuleSource: require('babel-resolve-relative-module')(
    path.join(__dirname, '..', 'src')
  ),
})
const argv = require('yargs').argv

const file = (() => {
  switch(true) {
    case argv.test:
      return argv.run ? 'test-run.es' : 'test.es'
    case argv.dev:
      return 'dev.es'
    case argv.build:
      return 'build.es'
    default:
    case argv.production:
    case argv.serve:
      return 'serve.es'
  }
})()

require(`./${file}`)
