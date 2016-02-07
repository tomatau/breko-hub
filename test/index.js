import chai, { expect } from 'chai'
import sinon from 'sinon'
import lodash from 'lodash/index'
chai.use(require('chai-shallow-deep-equal'))
chai.use(require('chai-as-promised'))

setGlobals(typeof GLOBAL == 'undefined' ? window : GLOBAL)

function setGlobals(global) {
  global.global = global
  global.expect = expect
  global.sinon = sinon
  global._ = lodash
  global.repeat = (times, assertion) =>
    () => _.times(times, assertion)
}
