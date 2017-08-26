import Koa from 'koa'
import lodash from 'lodash/index'
import { makeCreateStore } from 'app/composition/makeCreateStore'
import { createMemoryHistory } from 'history'
import rootReducer from 'app/reducers'
import promiseMiddleware from 'redux-promise-middleware'
import thunkMiddleware from 'redux-thunk'
import chaiJestSnapshot from 'chai-jest-snapshot'

const helpers = {
  setupSnapshots(filename) {
    beforeEach(function() {
      chaiJestSnapshot.setFilename(filename + '.snap')
      chaiJestSnapshot.setTestName(this.currentTest.fullTitle())
    })
  },
  cloneApp(app) {
    const clone = new Koa()
    clone.keys = lodash.clone(app.keys)
    clone.middleware = lodash.clone(app.middleware)
    return clone
  },
  createStore(initialState={}, middleware=[]) {
    return makeCreateStore([
      thunkMiddleware,
      promiseMiddleware(),
      ...middleware,
    ])(rootReducer, initialState)
  },
  createHistory(path) {
    return createMemoryHistory({
      initialEntries: [ path ],
    })
  },
  createStorage() {
    return {
      length: 1,
      state: {},
      getItem(key) {
        return this.state[key] || null
      },
      setItem(key, value) {
        this.state[key] = typeof value === 'string'
          ? value
          : JSON.stringify(value)
      },
      removeItem(key) {
        delete this.state[key]
      },
      clear() {
        for (const key in this.state) {
          this.removeItem(key)
        }
      },
    }
  },
  cleanup(wrapper) {
    if (wrapper) {
      wrapper.unmount()
    }
    sandbox.restore()
    sessionStorage.clear()
    localStorage.clear()
  },
}

export default helpers
