import chai, { expect } from 'chai'
import sinon from 'sinon'
import lodash from 'lodash/index'
import ramda from 'ramda/dist/ramda'
import { isBrowser } from 'app/utils/predicates'

chai.use(require('chai-shallow-deep-equal'))
chai.use(require('chai-as-promised'))
chai.use(require('sinon-chai'))

setGlobals(isBrowser() ? window : GLOBAL)

function setGlobals(global) {
  global.global = global
  global.expect = expect
  global.sinon = sinon
  global._ = lodash
  global.R = ramda
}
