import router from 'koa-router'
import koaBody from 'koa-body'

const parseBody = koaBody()
const apiRouter = router({ prefix: '/api' })

apiRouter
  .all('ping', '/ping', parseBody, function *() {
    this.response.body = { pong: this.request.body }
  })
  .get('bar', '/bar', function *() {
    this.response.body = { bar: [ 'bruce', 'willis', 'wet', 'himself' ] }
  })

export default apiRouter
