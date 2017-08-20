import chai, { expect } from 'chai'
import sinon from 'sinon'
import { shallow, mount, render } from 'enzyme'
import lodash from 'lodash/index'
import ramda from 'ramda/dist/ramda'
import snap from 'enzyme-to-json'
import { isBrowser } from 'app/utils'
import helpers from './test-helpers'

chai.use(require('chai-shallow-deep-equal'))
chai.use(require('chai-as-promised'))
chai.use(require('chai-enzyme')())
chai.use(require('sinon-chai'))
chai.use(require('chai-generator'))
chai.use(require('chai-jest-snapshot'))

setGlobals(isBrowser ? window : global)

function setGlobals(global) {
  global.global = global

  global.expect = expect
  global.sinon = sinon

  global.snap = snap

  global.shallow = shallow
  global.mount = mount
  global.render = render

  global.defer = setImmediate
  global.sandbox = sinon.sandbox.create()

  global._ = lodash
  global.R = ramda
  global.helpers = helpers

  global.HELLIP = '\u2026'
  global.NBSP = '\u00A0'

  if (!global.sessionStorage) {
    global.sessionStorage = helpers.createStorage()
  }

  if (!global.localStorage) {
    global.localStorage = helpers.createStorage()
  }
}
