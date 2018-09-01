require('@babel/polyfill')
require('@babel/register')({
  ignore: [
    /node_modules/,
  ],
})
require('./server-start')
