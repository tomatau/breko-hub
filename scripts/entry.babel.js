require('babel-polyfill')
require('babel-register')
const argv = require('yargs').argv

const file = (() => {
  switch(true) {
    case argv.test:
      return 'test.js'
    case argv.build:
      return 'build.js'
    default:
    case argv.start:
      return 'start.js'
  }
})()

require(`./${file}`)
