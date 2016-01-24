import uuid from 'uuid'

const makeFlash = (message, type='info') => ({
  type,
  message,
  id: uuid.v1(),
})

export default function sessionFlashArray(key='flash') {
  return function *(next) {
    this.flash = this.session[key] || []
    this.nextFlash = []
    this.addFlash = (message, type) => {
      this.nextFlash.push(makeFlash(message, type))
    }
    yield* next
    if (this.session && this.session[key].length == 0) {
      delete this.session[key]
    }
    if (this.status == 302 && this.session && !this.session[key] ) {
      this.session[key] = this.nextFlash
    }
  }
}
