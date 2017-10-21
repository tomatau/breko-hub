// This file ensures JSDOM is loaded before React is included
const nhf = require('node-hook-filename')

delete process.env.DEBUG
process.env.NODE_ENV = 'test'

require('babel-core/register')({
  only: [
    /\/src\/app/,
    /\/src\/config/,
    /\/src\/helpers/,
    /\/src\/server/,
    /\/test\//,
  ],
})

require('../src/helpers/css-modules-hook')
require('../src/helpers/global-jsdom')

nhf([ /\.svg/, /\.jpg/, /\.jpeg/ ], nhf.normalize)
