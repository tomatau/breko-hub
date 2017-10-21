import Koa from 'koa'
import lodash from 'lodash/index'
import fetchMock from 'fetch-mock'
import { createMemoryHistory } from 'history'
import { routerMiddleware } from 'react-router-redux'
import chaiJestSnapshot from 'chai-jest-snapshot'
import createStore from 'app/composition/create-store'
import { middleware } from 'app/composition/middleware'

const helpers = {
  setupSnapshots(filename) {
    beforeEach(function () {
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
  createStore(history, initialState={}, mware=middleware) {
    return createStore(
      initialState,
      [
        ...mware,
        routerMiddleware(history),
      ],
    )
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
  cleanup(ctx) {
    if (ctx.wrapper) {
      ctx.wrapper.unmount()
    }
    sandbox.restore()
    sessionStorage.clear()
    localStorage.clear()
    fetchMock.restore()
  },
}

export default helpers
