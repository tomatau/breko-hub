// This file ensures JSDOM is loaded before React is included

const path = require('path')

delete process.env.DEBUG
process.env.NODE_ENV = 'test'

require('babel-core/register')({
  only: [
    /\/src\//,
    /\/test\//,
  ],
})

require('../src/helpers/cssModulesHook')
require('../src/helpers/globalJSDOM')
require('node-hook-filename')(
  [ '.svg', '.jpg', '.jpeg' ],
  (request, parent) =>
    // normalise paths
    path.resolve(parent.id, '..', request).replace(/.*(?=\/breko-hub)/, '')
)
