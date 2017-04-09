import { set } from 'lodash'

const log = debug('handle-error')

export default async function handleError(ctx, next) {
  try {
    await next()
    set(ctx, 'session.state', null)
  } catch (err) {
    log(err)
    ctx.redirect('/oops')
  }
}
