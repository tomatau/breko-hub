import log from 'npmlog'
import { set } from 'lodash'

export default function *handleError(next) {
  try {
    yield next
    set(this, 'session.state', null)
  } catch (err) {
    log.error('handle-error', err)
    this.app.emit('error', err, this)
    this.redirect('/oops')
  }
}
