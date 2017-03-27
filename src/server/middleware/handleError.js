import { set } from 'lodash'
import { ERROR_PATH } from 'config/paths'

const log = debug('handle-error')

export default async function handleError(ctx, next) {
  try {
    await next()
    set(ctx, 'session.state', null)
  } catch (err) {
    log(err)
    ctx.redirect(ERROR_PATH)
  }
}
