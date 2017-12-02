import { STATUS_CODES } from 'http'
import Router from 'koa-router'
import koaBody from 'koa-body'

const parseBody = koaBody()

const apiRouter = new Router({ prefix: '/api' })

apiRouter
  .all('ping', '/ping', parseBody, (ctx) => {
    ctx.response.body = { pong: ctx.request.body }
  })
  .get('bar', '/bar', (ctx) => {
    ctx.response.body = { bar: [ 'bruce', 'willis', 'wet', 'himself' ] }
  })
  .all('not-found', '*', (ctx) => {
    ctx.response.status = 404
    ctx.response.body = { error: STATUS_CODES[ctx.response.status] }
  })

export default apiRouter
