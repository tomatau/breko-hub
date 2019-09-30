import React from 'react'
import Koa from 'koa'
import lodash from 'lodash/index'
import fetchMock from 'fetch-mock'
import { createMemoryHistory } from 'history'
import { routerMiddleware, ConnectedRouter } from 'connected-react-router'
import chaiJestSnapshot from 'chai-jest-snapshot'
import { HelmetProvider } from 'react-helmet-async'
import { CONTAINER_ELEMENT_ID } from 'config/constants'
import { Main, run } from 'app/main'
import createStore from 'app/composition/create-store'
import { middleware } from 'app/composition/middleware'

const helpers = {
  prepare(ctx, path, done) {
    ctx.history = helpers.createHistory(path)
    ctx.store = helpers.createStore(ctx.history)
    ctx.saga = run()

    ctx.wrapper = mount(
      <HelmetProvider>
        {Main(ctx.store, ctx.history, ConnectedRouter)}
      </HelmetProvider>,
      { attachTo: document.getElementById(CONTAINER_ELEMENT_ID) },
    )
    if (done) {
      defer(() => {
        ctx.wrapper.update()
        done()
      })
    }
  },
  cleanup(ctx) {
    if (ctx.saga) {
      ctx.saga.cancel()
    }
    if (ctx.wrapper) {
      ctx.wrapper.unmount()
    }
    if (ctx.clock) {
      ctx.clock.restore()
    }
    sandbox.restore()
    sessionStorage.clear()
    localStorage.clear()
    fetchMock.restore()
  },
  createHistory(path) {
    return createMemoryHistory({
      initialEntries: [ path ],
      initialIndex: 0,
    })
  },
  setupSnapshots(filename) {
    beforeEach(function () {
      chaiJestSnapshot.setFilename(filename + '.snap')
      chaiJestSnapshot.setTestName(this.currentTest.fullTitle())
    })
  },
  createStore(history, initialState={}, mware=middleware) {
    return createStore(
      history,
      initialState,
      [
        ...mware,
        routerMiddleware(history),
      ],
    )
  },
  createStorage(_name) {
    return {
      length: 1,
      _name,
      _store: {},
      _updateLength() {
        this.length = Object.keys(this._store).length
      },
      getItem(key) {
        return this._store[key] || null
      },
      setItem(key, value) {
        this._store[key] = typeof value === 'string'
          ? value
          : JSON.stringify(value)
        this._updateLength()
      },
      removeItem(key) {
        delete this._store[key]
        this._updateLength()
      },
      clear() {
        for (const key in this._store) {
          this.removeItem(key)
        }
        this._updateLength()
      },
    }
  },
  cloneApp(app) {
    const clone = new Koa()
    clone.keys = lodash.clone(app.keys)
    clone.middleware = lodash.clone(app.middleware)
    return clone
  },
  createEvent(options={}) {
    return {
      preventDefault() { },
      stopPropagation() { },
      alt: false,
      bubbles: true,
      button: 0,
      cancelable: true,
      clientX: 0,
      clientY: 0,
      ctrl: false,
      detail: 1,
      key: 0,
      meta: false,
      relatedTarget: null,
      screenX: 0,
      screenY: 0,
      shift: false,
      view: window,
      ...options,
    }
  },
}

export default helpers
