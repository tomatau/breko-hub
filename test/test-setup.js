import chai, { expect } from 'chai'
import Koa from 'koa'
import sinon from 'sinon'
import { shallow, mount, render } from 'enzyme'
import lodash from 'lodash/index'
import ramda from 'ramda/dist/ramda'
import { isBrowser } from 'app/utils'
import { makeCreateStore } from 'app/composition/makeCreateStore'
import rootReducer from 'app/reducers'
import promiseMiddleware from 'redux-promise-middleware'
import thunkMiddleware from 'redux-thunk'

chai.use(require('chai-shallow-deep-equal'))
chai.use(require('chai-as-promised'))
chai.use(require('chai-enzyme')())
chai.use(require('sinon-chai'))
chai.use(require('chai-generator'))

const helpers = {
  cloneApp(app) {
    const clone = new Koa()
    clone.keys = lodash.clone(app.keys)
    clone.middleware = lodash.clone(app.middleware)
    return clone
  },
  createStore(initialState={}) {
    return makeCreateStore([
      thunkMiddleware,
      promiseMiddleware(),
    ])(rootReducer, initialState)
  },
  cleanup(wrapper) {
    if (wrapper) {
      wrapper.unmount()
    }
    sandbox.restore()
  },
}

setGlobals(isBrowser ? window : global)

function setGlobals(global) {
  global.global = global
  global.expect = expect
  global.sinon = sinon
  global.shallow = shallow
  global.mount = mount
  global.render = render
  global.defer = setImmediate
  global.sandbox = sinon.sandbox.create()
  global._ = lodash
  global.R = ramda
  global.helpers = helpers
  if (!global.location.port) {
    global.location = {
      protocol: 'http:',
      host: 'localhost:3210',
      hostname: 'localhost',
      port: '3210',
    }
  }
}
