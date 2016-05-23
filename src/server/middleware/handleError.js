import { set } from 'lodash'
import { ERROR_PATH } from 'config/paths'

const log = debug('handle-error')

export default function *handleError(next) {
  try {
    yield next
    set(this, 'session.state', null)
  } catch (err) {
    log(err)
    this.redirect(ERROR_PATH)
  }
}
