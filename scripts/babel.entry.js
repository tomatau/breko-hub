require('babel/register')
const argv = require('yargs').argv

const file = (() => {
  switch(true) {
    case argv.test:
      return argv.run ? 'test-run.es6' : 'test.es6'
    case argv.dev:
      return 'dev.es6'
    case argv.build:
      return 'build.es6'
    default:
    case argv.production:
    case argv.serve:
      return 'serve.es6'
  }
})()

require(`./${file}`)
