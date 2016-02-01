import { makeCreateStore } from 'app/state/makeCreateStore'
import rootReducer from 'app/reducers'
import { middleware } from 'app/state/middleware'

// make a new store for each request
export default function *setStore(next) {
  // get flash messages from redirect
  this.store = makeCreateStore(middleware)(rootReducer, {
    flash: { messages: this.flash },
  })
  yield next
}
