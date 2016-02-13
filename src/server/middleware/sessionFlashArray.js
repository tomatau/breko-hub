
export default function sessionFlashArray(key='flash') {
  return function *(next) {
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
