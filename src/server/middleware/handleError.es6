import debug from 'debug'
import { set } from 'lodash'
const log = {
  err: debug('handle-error'),
}

process.on('unhandledRejection', function(err) {
  log.err('Promise rejection unhandled', err.stack)
})

export default function *handleError(next) {
  try {
    yield next
    set(this, 'session.state', null)
  } catch (err) {
    log.err(err)
    this.app.emit('error', err, this)
    this.redirect('/oops')
  }
}
