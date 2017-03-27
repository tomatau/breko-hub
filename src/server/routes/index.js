import router from 'koa-router'
import koaBody from 'koa-body'

const parseBody = koaBody()
const apiRouter = router({ prefix: '/api' })

apiRouter
  .all('ping', '/ping', parseBody, (ctx) => {
    ctx.response.body = { pong: ctx.request.body }
  })
  .get('bar', '/bar', (ctx) => {
    ctx.response.body = { bar: [ 'bruce', 'willis', 'wet', 'himself' ] }
  })

export default apiRouter
