import chai,{ expect } from 'chai'
import lodash from 'lodash/index'
chai.use(require('chai-shallow-deep-equal'))
chai.use(require('chai-as-promised'))

setGlobals(typeof GLOBAL == 'undefined' ? window : GLOBAL)

function setGlobals(global) {
  global.global = global
  global.expect = expect
  global._ = lodash
}
