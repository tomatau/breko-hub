const path = require('path')
require('babel-polyfill')
require('babel-register')({
  resolveModuleSource: require('babel-resolve-relative-module')(
    path.join(__dirname, '..', '..', 'src')
  ),
})
