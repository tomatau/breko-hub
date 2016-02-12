import Router from 'koa-router'
import koaBody from 'koa-body'

const parseBody = koaBody()
const apiRouter = Router({ prefix: '/api' })

apiRouter
  .all('ping', '/ping', parseBody, function *() {
    this.response.body = { pong: this.request.body }
  })
  .get('bar', '/bar', function *() {
    this.response.body = { bar: [ 'bruce', 'willis', 'wet', 'himself', 'lol' ] }
  })

export default apiRouter
