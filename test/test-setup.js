import chai, { expect } from 'chai'
import sinon from 'sinon'
import ReactSixteenAdapter from 'enzyme-adapter-react-16'
import { configure, shallow, mount, render } from 'enzyme'
import lodash from 'lodash/index'
import ramda from 'ramda/src/index'
import snap from 'enzyme-to-json'
import Helmet from 'react-helmet'
import { isBrowser } from 'app/utils'
import helpers from './test-helpers'

configure({ adapter: new ReactSixteenAdapter() })

chai.use(require('chai-shallow-deep-equal'))
chai.use(require('chai-as-promised'))
chai.use(require('chai-enzyme')())
chai.use(require('sinon-chai'))
chai.use(require('chai-generator'))
chai.use(require('chai-jest-snapshot'))

Helmet.defaultProps.defer = false

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
  global.sandbox = sinon.createSandbox()

  global._ = lodash
  global.R = ramda
  global.helpers = helpers

  global.HELLIP = '\u2026'
  global.NBSP = '\u00A0'

  if (!global.sessionStorage) {
    global.sessionStorage = helpers.createStorage('sessionStorage')
  }

  if (!global.localStorage) {
    global.localStorage = helpers.createStorage('localStorage')
  }
}
