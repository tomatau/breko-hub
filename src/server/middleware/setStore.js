import { makeCreateStore } from 'app/services/makeCreateStore'
import rootReducer from 'app/reducers'
import { middleware } from 'app/services/middleware'

export default function *setStore(next) {
  this.store = makeCreateStore(middleware)(rootReducer, {})
  yield next
}
