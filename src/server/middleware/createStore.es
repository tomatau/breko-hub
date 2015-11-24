import { compact } from 'lodash'
import { defaultMiddleware, makeCreateStore } from '~/src/app/store/configureStore'
import rootReducer from '~/src/app/reducers'

export default function *createStore(next) {
  const { error } = this.session.state || {}
  const { flash, state:initialState } = this
  const middleware = [
    ...defaultMiddleware,
    // server only middleware
  ]
  this.store = makeCreateStore(middleware)(rootReducer, {
    error: { errors: compact([ error ]) },
    flash: { messages: flash || {} },
    routing: {
      changeId: 1,
      path: this.request.url,
    },
    ...initialState || {},
  })
  yield next
}
