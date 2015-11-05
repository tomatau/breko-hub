import log from 'npmlog'

export default function *handleError(next) {
  try {
    yield next
    this.session.state = null
  } catch (err) {
    log.error('handle-error', err)
    this.app.emit('error', err, this)
    this.redirect('/oops')
  }
}
