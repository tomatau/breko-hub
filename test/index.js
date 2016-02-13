import chai, { expect } from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
import lodash from 'lodash/index'
import ramda from 'ramda/dist/ramda'
chai.use(require('chai-shallow-deep-equal'))
chai.use(require('chai-as-promised'))
chai.use(sinonChai)

setGlobals(typeof GLOBAL == 'undefined' ? window : GLOBAL)

function setGlobals(global) {
  global.global = global
  global.expect = expect
  global.sinon = sinon
  global._ = lodash
  global.R = ramda
}
