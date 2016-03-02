import ReactDOM from 'react-dom'
import { Main, Dev } from 'app/main'
import { inClientViaSocketIO } from 'redux-via-socket.io'
import { store } from 'app/services/store'
import { socket } from 'app/services/socket'

debug.enable(process.env.DEBUG)

const log = {
  env: debug('environment'),
  sock: debug('socket'),
}

log.env(`Running in [${process.env.NODE_ENV}] environment`)

inClientViaSocketIO(socket, store.dispatch)

socket.on('connect', () => {
  log.sock('Client connected to socket')
  // example socket broadcast
  store.dispatch({
    type: 'NEW_SOCKET_SESSION',
    payload: { data: Math.random() },
    meta: { broadcast: true, next: false },
  })
})

ReactDOM.render(
  Main, document.getElementById('application-root')
)

if (process.env.NODE_ENV === 'development') {
  ReactDOM.render(
    Dev, document.getElementById('debug-panel-root')
  )
}
