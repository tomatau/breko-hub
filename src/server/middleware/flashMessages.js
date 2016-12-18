import { store as clientStore } from 'app/composition/store'
import * as selectors from 'app/selectors'
import { addMessage } from 'app/actions/flash'

export default function *flashMessages(next) {
  this.flash.map(({ message, type }) =>
    this.store.dispatch(addMessage(message, type))
  )
  yield next
  if (this.response.status === 302) {
    transferFlashMessages(this)
  }
}


function transferFlashMessages(ctx) {
  const nextFlashMessage = selectors.nextFlashMessage(
    clientStore.getState()
  )
  if (nextFlashMessage) {
    ctx.addFlash(nextFlashMessage.message, nextFlashMessage.type)
  }
}
