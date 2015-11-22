import ReactDOM from 'react-dom'
import makeRoutes from '~/src/app/makeRoutes'
import { history } from '~/src/app/store/history'
import { makeContent } from '~/src/app/utils/makeContent'
import { defaultMiddleware, makeCreateStore } from '~/src/app/store/configureStore'
import rootReducer from '~/src/app/reducers'
import io from 'socket.io-client'
import debug from 'debug'
debug.enable(process.env.DEBUG)
const log = {
  env: debug('environment'),
  sock: debug('socket-client'),
}
log.env(`Running in [${process.env.NODE_ENV}] environment`)

const socket = io()
socket.on('connect', () => {
  log.sock('Client connected to socket')
})

const middleware = [
  ...defaultMiddleware,
  // client only middleware
]
const store = makeCreateStore(middleware)(
  rootReducer, window.__INITIAL_STATE__
)

ReactDOM.render(
  makeContent(makeRoutes(history), store),
  document.getElementById('application-root')
)

if (module.hot) {
  module.hot.accept('./reducers', () =>
    store.replaceReducer(require('./reducers'))
  )
}
