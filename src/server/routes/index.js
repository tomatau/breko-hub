import Router from 'koa-router'
import koaBody from 'koa-body'

const parseBody = koaBody()
const apiRouter = Router()

apiRouter
  .all('ping', '/ping', parseBody, function *() {
    this.response.body = { pong: this.request.body }
  })

export default apiRouter
