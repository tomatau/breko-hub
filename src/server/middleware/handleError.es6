import debug from 'debug'
import { set } from 'lodash'

export default function *handleError(next) {
  try {
    yield next
    set(this, 'session.state', null)
  } catch (err) {
    debug('handle-error')(err)
    this.app.emit('error', err, this)
    this.redirect('/oops')
  }
}
