import {expect} from 'chai'
import co from 'co'
// try importing some middlewares
// import compose from '~/src/server/middleware/compose'
// import createStore from '~/src/server/middleware/createStore'
// import handleError from '~/src/server/middleware/handleError'
// import renderRouteContext from '~/src/server/middleware/renderRouteContext'
// import sessionFlashArray from '~/src/server/middleware/sessionFlashArray'
// import setRouteContext from '~/src/server/middleware/setRouteContext'

// test stubs for node-only dependencies
import koa from 'koa-body';
import Router from 'koa-router';

// don't need to test server specific setup e.g. routeConfig
// can be tested indirectly from functional tests

describe('Thing',()=>{
  it('should run',()=>{
    // console.log(compose)
    // console.log(createStore)
    // console.log(handleError)
    // console.log(renderRouteContext)
    // console.log(renderRouteContext)
    // console.log(sessionFlashArray)
    // console.log(setRouteContext)
    // console.log(Router.prototype)

    expect(true).to.be.true
  })
})
