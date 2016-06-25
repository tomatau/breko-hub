
export default function(key='flash') {
  return function *sessionFlashArray(next) {
    this.flash = this.session[key] || []
    this.nextFlash = []
    this.addFlash = (message, type) => {
      this.nextFlash.push({ message, type })
    }
    yield* next
    if (this.status == 302 && this.session) {
      this.session[key] = this.nextFlash
    } else {
      delete this.session[key]
    }
  }
}
