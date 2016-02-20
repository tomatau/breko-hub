import { makeCreateStore } from 'app/services/makeCreateStore'
import rootReducer from 'app/reducers'
import { middleware } from 'app/services/middleware'
import { addMessage } from 'app/actions/flash'

// make a new store for each request
export default function *setStore(next) {
  this.store = makeCreateStore(middleware)(rootReducer, {})
  // get flash messages from redirect
  this.flash.map(({ message, type }) =>
    this.store.dispatch(addMessage(message, type))
  )
  yield next
}
