import { store as clientStore } from 'app/composition/store'
import * as flashSelectors from 'app/selectors/flash.selectors'
import { addMessage } from 'app/actions/flash.actions'

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
  const nextFlashMessage = flashSelectors.getNextMessage(
    clientStore.getState()
  )
  if (nextFlashMessage) {
    ctx.addFlash(nextFlashMessage.message, nextFlashMessage.type)
  }
}
