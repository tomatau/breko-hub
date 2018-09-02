// This file ensures JSDOM is loaded before React is included
const nhf = require('node-hook-filename')

delete process.env.DEBUG
process.env.NODE_ENV = 'test'
process.env.CONFIG_ENV = 'test'

require('@babel/register')({
  ignore: [
    /node_modules/,
  ],
  only: [
    /\/src\/app/,
    /\/src\/config/,
    /\/src\/helpers/,
    /\/src\/server/,
    /\/test\//,
  ],
})

require('../src/helpers/css-modules-hook')
require('./stubs/global-jsdom')

const loadableRegex = /loadable-modules\.json/

nhf(
  [ /\.svg/, /\.jpg/, /\.jpeg/, loadableRegex ],
  (request, parent) =>
    loadableRegex.test(request)
      ? {}
      : nhf.normalize(request, parent)
)
