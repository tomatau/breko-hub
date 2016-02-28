import { set } from 'lodash'

const log = {
  err: debug('handle-error'),
}

export default function *handleError(next) {
  try {
    yield next
    set(this, 'session.state', null)
  } catch (err) {
    log.err(err)
    this.redirect('/oops')
  }
}
